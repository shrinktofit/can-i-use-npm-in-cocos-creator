import React from 'react';
import './App.css';
import './List.css';
import { CanIUseNpmDatabase, CommonJsUsage, EsmUsage, ImportSpecifier, PackageInfo, PackageUsage } from './Database';
import { Helmet } from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

class App extends React.Component<{}, {
    database: CanIUseNpmDatabase;
}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            database: null!,
        };
    }

    componentDidMount() {
        (async () => {
            const database = await fetchDatabase();
            this.setState({ database, });
        })();
    }

    render() {
        const { database } = this.state;
        return database && <div className="App">
            <Helmet>
                <title>Can I use ... npm module..</title>
            </Helmet>

            <Router>
                <div>
                    <Switch>
                        <Route path="/" component={() => Packages(database)}>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>;
    }
}

function Packages(database: CanIUseNpmDatabase) {
    let match = useRouteMatch();
    if (!database) {
        return <div></div>;
    }
    return <Router>
        <div>
            <h1> 我能否在 Cocos Creator 中使用 npm 包…… </h1>
            <Switch>
                <Route path={`${match.path}packages/:packageId`} component={() => ShowPackageInfo(database)}>
                </Route>
                <Route path={match.path}>
                    <nav>
                        <ul>{
                            Object.keys(database!.packages).map((packageName) => <li key={packageName}>
                                <Link to={`${match.path}packages/${packageName}`}>
                                    {packageName}
                                </Link>
                            </li>)
                        }</ul>
                    </nav>
                </Route>
            </Switch>
        </div>
    </Router>
}

function comparePackageUsage (a: PackageUsage, b: PackageUsage) {
    const weight = (usage: PackageUsage) => usage.module === 'module' ? 0 : 1;
    return weight(a) - weight(b);
}

function ShowPackageInfo(database: CanIUseNpmDatabase) {
    const { packageId } = useParams<{ packageId: string }>();
    const packageInfo = database.packages[packageId];
    if (!packageInfo) {
        return <div>我们暂未收录此包的用法。</div>
    }
    const usages = Array.isArray(packageInfo.usage) ? packageInfo.usage : [packageInfo.usage];
    usages.slice().sort(comparePackageUsage);
    return (<div>
        <a href={`https://www.npmjs.com/package/${packageId}`}>{`npmjs.com/package/${packageId}`}</a>
        <ul>
            <li> 可用：{usages.length > 0 ? '✔️' : '❌'}</li>
            <li> 安装：npm install --save {packageId}</li>
            <li> {ShowTypes(packageId, packageInfo)}</li>
            {
                usages.map((usage) => <li> {
                    usage.module === 'module'
                        ? ShowEsmPackageUsage(packageId, packageInfo, usage)
                        : ShowCommonJsPackageUsage(packageId, packageInfo, usage)
                } </li>)
            }
        </ul>
    </div>)
}

function getModuleId (packageId: string, subpath: string) {
    return subpath === '.' ? packageId : `${packageId}/${subpath}`;
}

function printImportSpecifier(importSpecifier: ImportSpecifier) {
    switch (importSpecifier.type) {
        case 'default': return `${importSpecifier.local}`;
        case 'namespace': return `* as ${importSpecifier.local}`
        case 'named': {
            const bindings = Array.isArray(importSpecifier.exports) ? importSpecifier.exports : [importSpecifier.exports];
            return `{ ${bindings.map((binding) => typeof binding === 'string'
                ? binding :
                `${binding.exported} as ${binding.local}`).join(', ')} }`;
        }
    }
}

function ShowEsmPackageUsage(packageId: string, packageInfo: PackageInfo, usage: EsmUsage) {
    return (<div>
        用法：ESM 模块
        <div>
        {<pre>
            {(Array.isArray(usage.export) ? usage.export : [usage.export]).map((exportInfo) => {
                return `import ${printImportSpecifier(exportInfo)} from "${getModuleId(packageId, usage.path)}";`;
            }).join(`\n或\n`)}
        </pre>}
        {showTypesOverride(packageId, packageInfo, usage)}
        </div>
    </div>)
}

function ShowCommonJsPackageUsage(packageId: string, packageInfo: PackageInfo, usage: CommonJsUsage) {
    return (<div>
        用法：CommonJS 模块
        <div>
        {<pre>
            {`import ${usage.local} from "${getModuleId(packageId, usage.path)}";`}
        </pre>}
        {showTypesOverride(packageId, packageInfo, usage)}
        </div>
    </div>)
}

function ShowTypes(packageId: string, packageInfo: PackageInfo) {
    const { types } = packageInfo;
    if (!types) {
        return;
    }
    const { definitelyTyped } = types;
    return (<div>
        {(() => {
            if (definitelyTyped) {
                return <div>
                    此包的类型定义存放在 <a href="https://github.com/DefinitelyTyped/DefinitelyTyped">DefinitelyTyped</a> 上。
                    <br/>
                    通过以下方式安装：
                    <pre>
                        npm install --save-dev @types/{packageId}
                    </pre>
                </div>;
            } else {
                return <div>
                    此包本身提供了类型定义。
                </div>;
            }
        })()}
        
    </div>);
}

function showTypesOverride(packageId: string, packageInfo: PackageInfo, usage: EsmUsage | CommonJsUsage) {
    const { types } = packageInfo;
    if (!types) {
        return;
    }
    const { subPathTypes } = types;
    return (<div>
        {(() => {
            if (usage.path === '.' || subPathTypes) {
                return;
            }
            const moduleId = getModuleId(packageId, usage.path);
            return (<div>
                模块“{moduleId}”可能没有相应的类型声明。
                <br/>
                为了获取类型提示，将以下内容拷贝至任何 `.d.ts` 文件中，并在 tsconfig.json 中引用该 `.d.ts` 文件。
                <pre>
                declare module "{moduleId}" {`{
                    export *${usage.module === 'module' ? '' : ' as default'} from '${packageId}';
                }`}
                </pre>
            </div>)
        })()}
    </div>);
}

export default App;

async function fetchDatabase() {
    const response = await fetch(`${process.env.PUBLIC_URL}/database/index.json`);
    const json = await response.json();
    return json as CanIUseNpmDatabase;
}

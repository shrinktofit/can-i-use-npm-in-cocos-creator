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
        </div>
    </div>)
}

export default App;

async function fetchDatabase() {
    const response = await fetch(`${process.env.PUBLIC_URL}/database/index.json`);
    const json = await response.json();
    return json as CanIUseNpmDatabase;
}

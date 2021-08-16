import React from 'react';
import './App.css';
import './List.css';
import { CanIUseNpmDatabase, CommonJsUsage, EsmUsage, PackageInfo, PackageUsage } from './Database';
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
            <div>
                我们收录的：
            </div>
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

function ShowEsmPackageUsage(packageId: string, packageInfo: PackageInfo, usage: EsmUsage) {
    return (<div>
        用法：ESM 模块
        <div>
        {<code>
            {`import ${
                usage.export.type === 'default'
                    ? usage.export.as
                    : usage.export.type === 'namespace'
                        ? `* as ${usage.export.as}`
                        : (Array.isArray(usage.export.exports)
                            ? usage.export.exports 
                            : [usage.export.exports]).map((exportInfo) =>
                                typeof exportInfo === 'string'
                                    ? exportInfo
                                    : `${exportInfo.exported} as ${exportInfo.local}`)
                } from "${getModuleId(packageId, usage.path)}"`}
        </code>}
        </div>
    </div>)
}

function ShowCommonJsPackageUsage(packageId: string, packageInfo: PackageInfo, usage: CommonJsUsage) {
    return (<div>
        用法：CommonJS 模块
        <div>
        {<code>
            {`import ${usage.as} from "${getModuleId(packageId, usage.path)}"`}
        </code>}
        </div>
    </div>)
}

export default App;

async function fetchDatabase() {
    const response = await fetch(`${process.env.PUBLIC_URL}/database/index.json`);
    const json = await response.json();
    return json as CanIUseNpmDatabase;
}

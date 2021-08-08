import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CanIUseNpmDatabase, Package } from './Database';
import Async from 'react-async';
import { Helmet } from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

let database: CanIUseNpmDatabase | null = null;

class App extends React.Component {
    render() {
        return <div className="App">
            <Helmet>
                <title>Can I use ... npm module..</title>
            </Helmet>

            <Async promiseFn={fetchDatabase}>
                {({ data, isLoading }) => {
                    if (!data) {
                        return;
                    }
                    console.log(data);
                    database = data;
                    return (<Router>
                        <div>
                            <Switch>
                                <Route path="/">
                                    <Packages></Packages>
                                </Route>
                            </Switch>
                        </div>
                    </Router>);
                }}
            </Async>
        </div>;
    }
}

function Packages() {
    let match = useRouteMatch();
    return <Router>
        <div>
            <Switch>
                <Route path={`${match.path}/packages/:packageId`}>
                    <PackageInfo />
                </Route>
                <Route path={match.path}>
                    <nav>
                        <ul>{
                            Object.keys(database!.packages).map((packageName) => <li>
                                <Link to={`/packages/${packageName}`}>
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

function PackageInfo() {
    const { packageId } = useParams<{ packageId: string }>();
    return <div>
        {packageId}
    </div>
}

export default App;

async function fetchDatabase() {
    const response = await fetch('database/index.json');
    const json = await response.json();
    return json as CanIUseNpmDatabase;
}

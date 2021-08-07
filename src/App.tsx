import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CanIUseNpmDatabase } from './Database';
import Async from 'react-async';

function App() {
    return (
        <div className="App">
            <Async promiseFn={fetchDatabase}>
                {({ data, isLoading }) => {
                    console.log(data);
                    const database = data!;
                    return (<div style={{ wordWrap: "break-word" }}>{
                        JSON.stringify(database, undefined, 2)
                    }</div>);
                }}
            </Async>
        </div>
    );
}

export default App;

async function fetchDatabase() {
    const response = await fetch('database/index.json');
    const json = await response.json();
    return json as CanIUseNpmDatabase;
}

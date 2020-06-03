import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import './stylesheets/index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <ErrorBoundary>
            <Route path='/' component={App}/>
        </ErrorBoundary>
    </BrowserRouter> 
    , 
    document.getElementById('root')
)
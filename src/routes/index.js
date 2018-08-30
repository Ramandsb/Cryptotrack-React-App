import React from 'react';
import {
    BrowserRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import createBrowserHistory   from  'history/createBrowserHistory';

import App from '../components/App';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import Main from '../components/main';

const customHistory = createBrowserHistory()
export default () => (
    <BrowserRouter history={customHistory}>
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/main" exact component={Main} />
        </Switch>
    </BrowserRouter>
);
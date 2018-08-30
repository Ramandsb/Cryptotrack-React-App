import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import { firebaseApp } from './firebaseapp';
import {
    BrowserRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()


firebaseApp.auth().onAuthStateChanged(user => {
    if(user){
        console.log('user has signed In ',user);
        firebaseApp.database().ref('users/').set({
            email: user.email,
        });
        history.push("/main")
        // window.location.reload();
    }else{
        console.log('user has signed out ');
        history.push("/")
        // window.location.reload();
       
    }
})

ReactDOM.render(
   
    <App />
   
    , document.getElementById('root'));
registerServiceWorker();
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBp4QpnIqyk891rhcKwiSavk23O2k1p3Hg",
    authDomain: "jobstoronto-2f939.firebaseapp.com",
    databaseURL: "https://jobstoronto-2f939.firebaseio.com",
    projectId: "jobstoronto-2f939",
    storageBucket: "jobstoronto-2f939.appspot.com",
    messagingSenderId: "1036897745877"
};


export const firebaseApp = firebase.initializeApp(config);
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { firebaseApp } from '../firebaseapp';
import { Link } from 'react-router-dom';
import Today from './Today/today'
import History from './History/history'




class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: ''
        }
        this.signOut = this.signOut.bind(this);
    }


    signOut(){
        firebaseApp.auth().signOut().then(()=>{
            window.location.reload();
            window.history.replaceState(null, null, "/");
        });
        console.log('working')
  
        // alert('working')
    }

    render() {
        return (
            <div className="main-container">
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                            Welcome
                         </Typography>
                       
                        
                        <Button  color="inherit" onClick={() => this.signOut()}>
                            Logout
                            </Button>
                        
                    </Toolbar>
                </AppBar>
                <div>
                    <section className="results--section">
                        <div className="container">
                            <h1>Crypto Tracker is a realtime price information about<br></br> BTC, ETH and LTC.</h1>
                        </div>
                        <div className="results--section__inner">
                            <Today />
                            <History />
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

export default Main;

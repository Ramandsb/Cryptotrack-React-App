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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()


class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }

        }
    }

    handleChangeEmail(text){
        this.setState({email: text.target.value});
    }
    handleChangePassword(passwordEvent) {
        this.setState({ password: passwordEvent.target.value });
    }
    handleLoginButtton(){
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            history.push("/main")
            window.location.reload();
        })
        .catch(error => {
            this.setState({ error })
        });
    }
   
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Sign In
                         </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{
                    marginTop:100}}
                    className="signin-container">

                    <Card className="signin-card">
                        <TextField
                            id="email"
                            label="Email"
                            value={this.state.email}
                            onChange={(text) => this.handleChangeEmail(text)}
                            style={{ width: '70%', marginTop: 20}}
                            color="secondary"
                            
                        />
                        <br/>
                        <TextField
                            id="password"
                            label="Password"
                            value={this.state.password}
                            onChange={(passwordEvent) => this.handleChangePassword(passwordEvent)}
                            style={{ width: '70%',marginTop:20 }}
                            type='password'
                            color="secondary"
                        />
                    <br/>
                        <Button style={{ marginTop: 30 }} variant="contained" color="secondary" onClick={() => this.handleLoginButtton()}>
                       Login
                    </Button>
                        <div style={{ marginTop: 20, alignItems:'center'}} className="signup-button">
                            <Link to="/signUp" className="signup-link">Sign up</Link>
                    </div>
                    <div><Typography>{this.state.error.message}</Typography></div>
                        </Card>
                </div>
            </div>
        );
    }
}



export default SignIn;

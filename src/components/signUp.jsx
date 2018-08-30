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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { firebaseApp } from '../firebaseapp';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error:{
                message:''
            }
        }
        this.handleSignupButtton = this.handleSignupButtton.bind(this);
    }

    handleChangeEmail(text) {
        this.setState({ email: text.target.value });
    }
    handleChangePassword(passwordEvent) {
        this.setState({ password: passwordEvent.target.value });
    }
    handleSignupButtton() {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            history.push("/main")
            window.location.reload();
        })
        .catch(error => {
            this.setState({error})
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Sign up
                         </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{
                    marginTop: 100
                }}
                    className="signin-container">
                    <Card className="signin-card">
                    <TextField
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={(text) => this.handleChangeEmail(text)}
                        margin="normal"
                        style={{ width: '70%', marginTop: 20 }}
                        color="secondary"
                    />
                    <br />
                    <TextField
                        id="password"
                        label="Password"
                        value={this.state.password}
                        onChange={(passwordEvent) => this.handleChangePassword(passwordEvent)}
                        margin="normal"
                        type='password'
                        style={{ width: '70%', marginTop: 20 }}
                        color="secondary"
                    />
                    <br />
                        <Button style={{ marginTop: 30 }} variant="contained" color="secondary" onClick={this.handleSignupButtton}>
                        Sign Up
                    </Button>
                    <div><Typography>{this.state.error.message}</Typography></div>
</Card>
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

export default SignUp;

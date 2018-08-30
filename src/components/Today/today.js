import React, {
    Component
} from 'react';
import '../../App.css';
import PropTypes from 'prop-types';
import {
    withStyles
} from '@material-ui/core/styles';
import Pusher from 'pusher-js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import './today.css';
import axios from 'axios';
import {
    firebaseApp
} from '../../firebaseapp';
import {
    Link
} from 'react-router-dom';


class Today extends Component {
    constructor() {
        super();
        this.state = {
            btcprice: '',
            ltcprice: '',
            ethprice: ''
        };
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        this.pusher = new Pusher('76853cef22a35632baed', {
            cluster: 'us2',
            encrypted: true
        });
        // Subscribe to the 'coin-prices' channel
        this.prices = this.pusher.subscribe('coin-prices');
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
            .then(response => {
                // We set the latest prices in the state to the prices gotten from Cryptocurrency.
                this.setState({
                    btcprice: response.data.BTC.USD
                });
                this.setState({
                    ethprice: response.data.ETH.USD
                });
                this.setState({
                    ltcprice: response.data.LTC.USD
                });
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            })
    }
    componentDidMount() {
        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
                .then(response => {
                    this.sendPricePusher(response.data)
                    console.log("componentDidMount" + response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }, 10000)
 // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes 
 this.prices.bind('prices', price => {
     this.setState({
         btcprice: price.prices.BTC.USD
     });
     this.setState({
         ethprice: price.prices.ETH.USD
     });
     this.setState({
         ltcprice: price.prices.LTC.USD
     });
 }, this);

    }
    sendPricePusher(data) {
        axios.post('/prices/new', {
                prices: data
            })
            .then(response => {
                 console.log("sendPricePusher" + response)
            })
            .catch(error => {
                console.log("sendPricePusher" + error)
            })
    }
    render() {
        return ( <div className="today--section container">
                    <h2>Current Price</h2>
                    <div className="columns today--section__box">
                        <div className="column btc--section">
                            <h5>${this.state.btcprice}</h5>
                            <p>1 BTC</p>
                        </div>
                        <div className="column eth--section">
                            <h5>${this.state.ethprice}</h5>
                            <p>1 ETH</p>
                        </div>
                        <div className="column ltc--section">
                            <h5>${this.state.ltcprice}</h5>
                            <p>1 LTC</p>
                        </div>
                    </div>
                </div>
        );
    }
}



export default Today;

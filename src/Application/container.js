import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducer/index';
import App from '../teams/App';
import Match from '../match/App'
import Player from '../player/App'

import Score from '../score/App'
import Login from '../login/App'
import '../utils/stylesheet/index.css'
const store = createStore(reducer, applyMiddleware(thunk))
export default class container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPages: false,
            showLogin:false,
            showTeams:false,
            showMatch:false,
            showScore:false,
            showPlayer:false,
            showPlayersPage:false
        }
    }
    onLogin(uname) {
        if (store.getState().Cricket.Logins[0].uname == uname) {
            this.setState({ showPages: true,showLogin:true })
        }
        else
        {
            this.setState({ showPlayersPage:true,showLogin:true})
        }
    }
    render() {
        console.log(store.getState().Cricket, "store")
        return (
            <Provider store={store}>
                {
                    this.state.showLogin == false && <Login onLogin={this.onLogin.bind(this)} />
                }
                {
                    this.state.showPages == true &&
                    <div className="container" style={{height:"700px"}}>
                        <h1>Cricket Score Card</h1>
                        <div className="spacing"></div>
                        <button className="button" onClick={()=>this.setState({showTeams:!this.state.showTeams})}>Teams</button>
                       {this.state.showTeams==true&& <App />}
                        <div style={{padding:20}}></div>
                        <button className="button" onClick={()=>this.setState({showMatch:!this.state.showMatch})}>Match</button>
                       {this.state.showMatch==true&& <Match />}
                        
                        <div style={{padding:20}}></div>
                        <button className="button" onClick={()=>this.setState({showPlayer:!this.state.showPlayer})}>Player</button>
                       {this.state.showPlayer==true&& <Player showTable={true} />}
                        <div style={{padding:20}}></div>
                        <button className="button" onClick={()=>this.setState({showScore:!this.state.showScore})}>Score</button>
                       {this.state.showScore==true&& <Score />}
                    </div>
                }
                {
                    this.state.showPlayersPage==true&&
                    <Player showTable={false} />
                }
            </Provider>
        )
    }
}

import React from 'react';
import '../utils/stylesheet/login.css'
import LoginImage from '../utils/assets/login.png';
import { connect } from 'react-redux';
import { login } from '../redux/action/action'
import { bindActionCreators } from 'redux';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            pwd: '',
            passwordVal: false,
            userVal: false
        }
    }

    alphanumeric(e) {
        var letters = /^[0-9a-zA-Z]+$/;
        if (e.target.value.match(letters)) {
            this.setState({ passwordVal: false })
        }
        else {
            this.setState({ passwordVal: true })

        }
    }

    alphabet(e) {
        var letters = /^[A-Za-z]+$/;
        if (e.target.value.match(letters)) {
            this.setState({ userVal: false })
        }
        else {
            this.setState({ userVal: true })

        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    login() {
        if (this.state.uname != "" && this.state.pwd != "" && this.state.userVal == false && this.state.passwordVal == false) {
            const login = { uname: this.state.uname, login: this.props.Logins[0].uname == this.state.uname ? true : false };
            this.props.login(login);
            this.props.onLogin(this.state.uname)

        }
        else {
            if (this.state.userVal == true || this.state.passwordVal == true) {
                alert("Please Fill the Username or Password in correct format")
            }
            else {
                alert("Please Fill the Username & Password")
            }
        }
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <div class="modal-content animate">
                    <div class="imgcontainer">
                        <img src={LoginImage} alt="Avatar" class="avatar" />
                    </div>

                    <div class="container">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" style={{width:'20%'}} value={this.state.uname} onChange={this.handleChange.bind(this)} onKeyPress={this.alphabet.bind(this)} placeholder="Enter Username" name="uname" required />
                        {this.state.userVal == true && <span style={{ color: 'red', fontSize: '10px' }}>* Enter alphabet only *</span>}
                        <div className="spacing"></div>
                        <label for="psw"><b>Password</b></label>
                        <input type="password" style={{width:'20%'}} onKeyPress={this.alphanumeric.bind(this)} value={this.state.pwd} name="pwd" placeholder="Enter Password" onChange={this.handleChange.bind(this)} required />
                        {this.state.passwordVal == true && <span style={{ color: 'red', fontSize: '10px' }}>* Enter alpha numeric only *</span>}
                        <div className="spacing"></div>
                        <button className="button" onClick={this.login.bind(this)}>Login</button>

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    Logins: state.Cricket.Logins
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ login }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
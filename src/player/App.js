import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPlayer, editPlayer, addPlayer, deletePlayer } from '../redux/action/action'
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from '../utils/assets/login.png'
import Dropdown from '../components/dropdown';
import DatePicker from '../components/datePicker';
import TimePicker from '../components/timePicker';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            team: '',
            role: '',
            file: '',
            fname: '',
            lname: '',
            teamList: this.props.Teams,
            loginList: this.props.loginList
        }
    }
    reset() {
        var file = document.getElementById('imageFile');
        file.value = ""
        this.setState({
            id: 0,
            team: '',
            role: '',
            file: '123',
            fname: '',
            lname: '',
            image: ''
        })
    }
    componentDidMount() {
        this.props.getPlayer();
        console.log("eam", this.props.Teams, this.props.Players)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Teams !== this.props.Teams || prevProps.Logins !== this.props.Logins) {
            this.setState({
                teamList: this.props.Teams,
                loginList: this.props.Logins
            })
        }
    }
    handleChange = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.id) {
            const editPlayer = {
                id: this.state.id,
                team: this.state.team,
                role: this.state.role,
                file: this.state.file,
                fname: this.state.fname,
                lname: this.state.lname
            }
            console.log("jii", editPlayer)
            toast("Player Data Edited Successfully")
            this.props.editPlayer(editPlayer);
            this.reset()
        }
        else {
            if (this.state.team != '' && this.state.role != '' && this.state.fname != '' && this.state.lname != '') {
                const addPlayer = {
                    id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                    team: this.state.team,
                    role: this.state.role,
                    file: this.state.file,
                    fname: this.state.fname,
                    lname: this.state.lname,
                    file: this.state.file
                }
                console.log("jii", addPlayer)
                toast("Player Data Added Successfully")
                this.props.addPlayer(addPlayer);
                this.reset()
            }
            else {
                alert("Please fill Player Details")
            }
        }
    }
    onEdit(data) {
        this.setState({
            id: data.id,
            team: data.team,
            role: data.role,
            file: data.file,
            fname: data.fname,
            lname: data.lname
        })
    }
    onDelete(id) {
        console.log(id)
        toast("Player Data Deleted Successfully")
        this.props.deletePlayer(id);
        this.reset()
    }
    imageUpload(e) {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            localStorage[file.name] = base64;
            console.debug("file stored", base64);
        });
        this.setState({
            file: e.target.files[0].name
        })
    };


    render() {

        return (
            <React.Fragment>
                <h2>Player Summary</h2>
                <ToastContainer />
                <div className="container">
                    <div style={{ display: this.state.id > 0 ? 'block' : 'none' }}>
                        <img src={localStorage.getItem(this.state.file)} alt="image" width="100px" height="100px" style={{ background: '#ccccc' }} />
                    </div>
                    <div className="row">
                        <div className="percent25">
                            <label>First Name</label>
                        </div>
                        <div className="percent75">
                            <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="percent25">
                            <label>Last Name</label>
                        </div>
                        <div className="percent75">
                            <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="percent25">
                            <label>Teams</label>
                        </div>
                        <div className="percent75">
                            <select id="team" value={this.state.team} name="team" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select--</option>
                                {this.props.Teams.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="spacing"></div>
                    <div className="row">
                        <div className="percent25">
                            <label>Role</label>
                        </div>
                        <div className="percent75">
                            <select id="role" name="role" value={this.state.role} onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select--</option>
                                {this.props.Roles.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="spacing"></div>
                    <div className="row" style={{ display: this.state.id > 0 ? "none" : "block" }}>
                        <div className="percent25">
                            <label>Profile</label>
                        </div>
                        <div className="percent75" >
                            <input
                                type="file"
                                id="imageFile"
                                name='imageFile'
                                onChange={this.imageUpload.bind(this)} /></div>
                    </div>

                    <div className="spacingWidth"></div>
                    {this.state.id
                        ? <button onClick={this.onSubmit.bind(this)} className="button button1">Update Player</button>
                        : <button onClick={this.onSubmit.bind(this)} className="button button1">Add Player</button>
                    }
                    <div className="spacing"></div>
                    <hr />

                </div>
                {this.props.showTable == true &&
                    <table>
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Player Name</th>
                                <th>Team Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.Players && this.props.Players.map((item, i) => {
                                var Team = this.props.Teams.filter((items) => items.id == item.team)
                                var Role = this.props.Roles.filter((items) => items.id == item.role)
                                var Profile = localStorage.getItem(item.file) == null ? Image : localStorage.getItem(item.file)
                                return <tr key={i}>
                                    <td><img src={Profile} alt="Player" width="40px" height="40px" style={{ borderRadius: "50%" }} /></td>
                                    <td>{item.fname}{" "}{item.lname}</td>
                                    <td>{Team[0].name}</td>
                                    <td>{Role[0].name}</td>
                                    <td>
                                        <EditIcon size={10} onClick={() => this.onEdit(item)} className="edit" />
                                        <span className="spacing"></span>
                                        <DeleteIcon onClick={() => this.onDelete(item.id)} className="delete" /></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Teams: state.Cricket.Teams,
    Players: state.Cricket.Players,
    Roles: state.Cricket.Roles,
    Logins: state.Cricket.Logins
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getPlayer, addPlayer, editPlayer, deletePlayer }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
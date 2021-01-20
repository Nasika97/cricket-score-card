import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTeam, editTeam, addTeam, deleteTeam } from '../redux/action/action'
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            desc: ''
        }
    }
    reset() {
        this.setState({
            id: 0,
            name: '',
            desc: ''
        })
    }
    componentDidMount() {
        this.props.getTeam();
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.id) {
            const editTeam = {
                id: this.state.id,
                name: this.state.name,
                desc: this.state.desc
            }
            toast("Teams Data Edited Successfully")
            this.props.editTeam(editTeam);
            this.reset()
        }
        else {
            if (this.state.name != "") {
                const addTeam = {
                    id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                    name: this.state.name,
                    desc: this.state.desc
                }
                toast("Teams Data Added Successfully")
                this.props.addTeam(addTeam);
                this.reset()
            }
            else {
                alert("Please fill the Team Name")
            }
        }
    }
    onEdit(data) {
        this.setState({
            id: data.id,
            name: data.name,
            desc: data.desc
        })
    }
    onDelete(id) {
        console.log(id)
        toast("Teams Data Deleted Successfully")
        this.props.deleteTeam(id);
        this.reset()
    }
    render() {
        return (
            <React.Fragment>
                <h2>Team Summary</h2>
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <div className="percent25">
                            <label>Name</label>
                        </div>
                        <div className="percent75">
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="percent25">
                            <label>Description</label>
                        </div>
                        <div className="percent75">
                            <textarea name="desc" value={this.state.desc} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="spacing"></div>
                    {this.state.id
                        ? <button onClick={this.onSubmit.bind(this)} className="button button1">Update Team</button>
                        : <button onClick={this.onSubmit.bind(this)} className="button button1">Add Team</button>
                    }
                    <div className="spacing"></div>
                    <hr />

                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.Teams && this.props.Teams.map((item, i) => {
                            return <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.desc}</td>
                                <td>
                                    <EditIcon size={10} onClick={() => this.onEdit(item)} className="edit" />
                                    <span className="spacing"></span>
                                    <DeleteIcon onClick={() => this.onDelete(item.id)} className="delete" /></td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Teams: state.Cricket.Teams
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getTeam, addTeam, editTeam, deleteTeam }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
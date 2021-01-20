import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMatch, editMatch, addMatch, deleteMatch } from '../redux/action/action'
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dropdown from '../components/dropdown';
import DatePicker from '../components/datePicker';
import TimePicker from '../components/timePicker';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TramOutlined } from '@material-ui/icons';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            teamA: '',
            teamB: '',
            date: '',
            time: '',
            period: '',
            teamAList: this.props.Teams,
            teamBList: this.props.Teams
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }
    reset() {
        this.setState({
            id: 0,
            teamA: 0,
            teamB: 0,
            date: '',
            time: '',
            period: '',
            timeVal: false
        })
    }
    componentDidMount() {
        this.props.getMatch();
        console.log("eam", this.props.Teams, this.props.Matches)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Teams !== this.props.Teams) {
            this.setState({
                teamAList: this.props.Teams,
                teamBList: this.props.Teams
            })
        }
    }
    handleChange = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
        if (name == 'teamA') {
            this.setState({
                teamBList: this.props.Teams.filter((item) => item.id != value)
            })
        }
        else if (name == 'teamB') {
            this.setState({
                teamAList: this.props.Teams.filter((item) => item.id != value)
            })
        }
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.id) {
            const editMatch = {
                id: this.state.id,
                teamA: this.state.teamA,
                teamB: this.state.teamB,
                date: this.state.date,
                time: this.state.time,
                period: this.state.period
            }
            console.log("jii edit ", editMatch)
            toast("Match Data Edited Successfully")
            this.props.editMatch(editMatch);
            this.reset()
        }
        else {
            if (this.state.date != "" && this.state.teamA != "" && this.state.teamB != "" && this.state.time != "" && this.state.period != "") {
                const addMatch = {
                    id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                    teamA: this.state.teamA,
                    teamB: this.state.teamB,
                    date: this.state.date,
                    time: this.state.time,
                    period: this.state.period
                }
                console.log("jii", addMatch)
                toast("Match Data Added Successfully")
                this.props.addMatch(addMatch);
                this.reset()
            }
            else {
                alert("Please Fill Match Details")
            }
        }
    }
    onEdit(data) {
        this.setState({
            id: data.id,
            teamA: data.teamA,
            teamB: data.teamB,
            date: data.date,
            time: data.time,
            period: data.period
        })
    }
    onDelete(id) {
        console.log(id)
        toast("Match Data Deleted Successfully")
        this.props.deleteMatch(id);
        this.reset()
    }
    onDropdownChange(label, selectedId) {
        if (label == 'TeamA') {
            this.setState({
                ...this.state,
                teamA: selectedId,
                teamBList: this.props.Teams.filter((item) => item.id != selectedId)
            })
        }
        else if (label == "Period") {
            this.setState({
                ...this.state,
                period: selectedId
            })
        }
        else {
            this.setState({
                ...this.state,
                teamB: selectedId,
                teamAList: this.props.Teams.filter((item) => item.id != selectedId)
            })
        }
    }
    onDateChange(date) {
        this.setState({ date })
    }
    // timeValidation(e){
    //     if (isNaN(parseInt(this.state.time)) || parseInt(this.state.time) < parseInt(1) || parseInt(this.state.time) > parseInt(12)) {
    //         this.setState({timeVal:false})
    //       } else {
    //         this.setState({timeVal:true})
    //       }
    // }

    render() {

        console.log("eam", this.props.Matches)
        return (
            <React.Fragment>
                <h2>Match Summary</h2>
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <div className="percent25">
                            <label>Team A</label>
                        </div>
                        <div className="percent75">
                            <select id="teamA" value={this.state.teamA} name="teamA" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select--</option>
                                {this.state.teamAList.map((item, index) => {
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
                            <label>Team B</label>
                        </div>
                        <div className="percent75">
                            <select id="teamB" name="teamB" value={this.state.teamB} onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select--</option>
                                {this.state.teamBList.map((item, index) => {
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
                            <label>Date</label>
                        </div>
                        <div className="percent75" >
                            <input type="date" style={{ width: '95%' }} name="date" value={this.state.date} onChange={this.handleChange.bind(this)} />
                        </div>
                    </div>

                    <div className="spacing"></div>
                    <div className="row">
                        <div className="percent25">
                            <label>Time</label>
                        </div>
                        <div className="percent75" style={{ display: 'flex' }}>
                            <input type="number" name="time" value={this.state.time} style={{ width: '70%' }} onChange={this.handleChange.bind(this)} />
                            <select id="period" value={this.state.period} disabled={this.state.id > 0 ? true : false} style={{ width: '36%', height: '44px' }} name="period" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select--</option>
                                {this.props.Period.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {this.state.timeVal == true && <span style={{ color: 'red', fontSize: '10px' }}>* Enter value in between 1 to 12 *</span>}
                    </div>
                    <div className="spacingWidth"></div>
                    {this.state.id
                        ? <button onClick={this.onSubmit.bind(this)} className="button button1">Update Match</button>
                        : <button onClick={this.onSubmit.bind(this)} className="button button1">Add Match</button>
                    }
                    <div className="spacing"></div>
                    <hr />

                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Teams A</th>
                            <th>Teams B</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.Matches && this.props.Matches.map((item, i) => {
                            var TeamA = this.props.Teams.filter((items) => items.id == item.teamA)
                            var TeamB = this.props.Teams.filter((items) => items.id == item.teamB)
                            var Time = this.props.Period.filter((items) => items.id == item.period)
                            console.log(Time, "jiiiiiiiiiiiiiiiii")
                            return <tr key={i}>
                                <td>{TeamA[0].name}</td>
                                <td>{TeamB[0].name}</td>
                                <td>{item.date}</td>
                                <td>{item.time} {Time[0].name}</td>
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
    Teams: state.Cricket.Teams,
    Matches: state.Cricket.Matches,
    Period: state.Cricket.Period
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getMatch, addMatch, editMatch, deleteMatch }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
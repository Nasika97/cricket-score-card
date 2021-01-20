import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPlayer, editScore, addScore, deletePlayer } from '../redux/action/action'
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ScoreBoard from './scoreBoard'
import ScoreBoardTable from './scoreBoardTable'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            match: '',
            teamA: 'Team A',
            teamB: 'Team B',
            teamAList: [],
            teamBList: [],
            teamList: this.props.Teams,
            scoreList: this.props.Scores,
            matchList: this.props.Matches,
            playerList: this.props.Players,
            teamAScore: 0,
            teamBScore: 0
        }
        this.onAddItem = this.onAddItem.bind(this)
    }
    reset() {
        this.setState({
            id: 0,
            team: '',
            players: []
        })
    }
    componentDidMount() {
        this.props.getPlayer();
        console.log("eam", this.props.Teams, this.props.Players)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Teams !== this.props.Teams || prevProps.Scores !== this.props.Scores || prevProps.Players !== this.props.Players || prevProps.Matches !== this.props.Matches) {
            this.setState({
                teamList: this.props.Teams,
                scoreList: this.props.Scores,
                playersList: this.props.Players,
                matchesList: this.state.Matches
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


    showAllPlayer() {
        let matches = this.props.Matches.filter((item) => item.id == this.state.match)
        let teamA = this.props.Teams.filter((item) => item.id == matches[0].teamA)
        let teamB = this.props.Teams.filter((item) => item.id == matches[0].teamB)
        let teamAList = this.props.Players.filter((item) => item.team == matches[0].teamA)
        let teamBList = this.props.Players.filter((item) => item.team == matches[0].teamB)

        this.setState({ teamA: teamA[0].name, teamB: teamB[0].name, teamAList: teamAList, teamBList: teamBList })
    }
    onAddItem(score, id, team) {
        var editData = this.props.Scores.filter((item) => item.player == id);
        if (editData.length > 0) {
            const editScore = {
                id: editData[0].id,
                team: editData[0].team,
                player: editData[0].player,
                match: editData[0].match,
                score: parseInt(editData[0].score) + parseInt(score),
            }
            this.props.editScore(editScore);
            console.log(this.props.Scores, "whoojoo")
        }
        else {
            const addScore = {
                id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                team: team,
                player: id,
                match: this.state.match,
                score: score,
            }

            this.props.addScore(addScore);
            this.reset()
        }
        let matches = this.props.Matches.filter((item) => item.id == this.state.match)
        if (matches[0].teamA == team) {
            this.setState({
                teamAScore: parseInt(score) + parseInt(this.state.teamAScore)
            })
        }
        else {
            this.setState({
                teamBScore: parseInt(score) + parseInt(this.state.teamBScore)
            })
        }
    }

    render() {

        return (
            <React.Fragment>
                <h2>Score Summary</h2>
                <div className="container">
                    <div className="row">
                        <div className="percent25">
                            <label>Match</label>
                        </div>
                        <div className="percent75">
                            <select id="match" value={this.state.match} name="match" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select--</option>
                                {this.props.Matches.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.date}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="spacing"></div>
                    {this.state.id
                        ? <button onClick={this.onSubmit.bind(this)} className="button button1">Update Player</button>
                        : <button onClick={this.showAllPlayer.bind(this)} className="button button1">Show</button>
                    }
                    <div className="spacing"></div>
                    <div style={{ display: 'flex' }}>
                        <div className="row" style={{ width: '45%' }}>
                            <div className="percent25">
                                <label>Team A</label>
                            </div>
                            <div className="percent75">
                                <input type="text" value={this.state.teamA} disabled="true" />
                                <div className="spacing"></div>
                                {
                                    this.state.teamAList && this.state.teamAList.map((item, index) => {
                                        return (
                                            <ScoreBoard file={item.file} onAddItem={this.onAddItem} id={item.id} team={item.team} playerName={item.fname + " " + item.lname} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div style={{ padding: 10, fontWeight: 'bold', fontSize: 25, }}>
                            <div>{this.state.teamA}:{"  "}{this.state.teamAScore}</div> VS <div>{this.state.teamB}:{"  "}{this.state.teamBScore}</div></div>
                        <div className="row" style={{ width: '45%' }}>
                            <div className="percent25">
                                <label>Teams B</label>
                            </div>
                            <div className="percent75">
                                <input type="text" value={this.state.teamB} disabled="true" />

                                <div className="spacing"></div> {
                                    this.state.teamBList && this.state.teamBList.map((item, index) => {
                                        return (
                                            <ScoreBoard file={item.file} onAddItem={this.onAddItem} id={item.id} team={item.team} playerName={item.fname + " " + item.lname} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="spacing"></div>

                    <hr />
                    <div className="spacing"></div>
                    <ScoreBoardTable teamList={this.state.teamList} matchList={this.state.matchList} playerList={this.state.playerList} scoreList={this.state.scoreList} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Teams: state.Cricket.Teams,
    Players: state.Cricket.Players,
    Roles: state.Cricket.Roles,
    Matches: state.Cricket.Matches,
    Scores: state.Cricket.Scores
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getPlayer, addScore, editScore, deletePlayer }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)




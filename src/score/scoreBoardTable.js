import React from 'react';
import Image from '../utils/assets/login.png'
export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            match: '',
            teamA: '',
            teamB: '',
            teamAList: [],
            teamBList: [],
            teamList: this.props.teamList,
            scoreList: this.props.scoreList,
            matchList: this.props.matchList,
            playerList: this.props.playerList
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.teamList !== this.props.teamList || prevProps.scoreList !== this.props.scoreList || prevProps.playerList !== this.props.playerList || prevProps.matchList !== this.props.matchList) {
            this.setState({
                teamList: this.props.matchList,
                scoreList: this.props.scoreList,
                playerList: this.props.playerList,
                matchList: this.state.matchList
            })
        }
    }
    render() {
        console.log(this.props.teamList, this.props.matchList, this.props.playerList, this.props.scoreList)

        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Team Name</th>
                            <th>Player Name</th>
                            <th>Match Date</th>
                            <th>Players Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.scoreList && this.props.scoreList.map((item, i) => {
                            var Team = this.props.teamList.filter((items) => items.id == item.team)
                            var Player = this.props.playerList.filter((items) => items.id == item.player)
                            var Match = this.props.matchList.filter((items) => items.id == item.match)
                            return <tr key={i}>
                                <td><img src={localStorage.getItem(Player[0].file) == null ? Image : localStorage.getItem(Player[0].file)} height="40px" width="40px" style={{ borderRadius: '50%' }} /></td>
                                <td>{Team[0].name}</td>
                                <td>{Player[0].fname}{" "}{Player[0].lname}</td>
                                <td>{Match[0].date} </td>
                                <td>{item.score}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}
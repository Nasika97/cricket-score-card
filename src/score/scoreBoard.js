import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Image from '../utils/assets/login.png'
export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.score
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="percent25">
                        <img src={localStorage.getItem(this.props.file) == null ? Image : localStorage.getItem(this.props.file)} alt="Player" width="40px" height="40px" style={{ borderRadius: '50%' }} />

                    </div>
                    <div className="percent75" style={{ display: 'flex' }}>
                        <label style={{ padding: 5, whiteSpace: "nowrap" }}>{this.props.playerName}</label>
                        <input type="number" name="score" placeholder="Enter player's score" value={this.state.score} onChange={(e) => this.setState({ score: e.target.value })} />
                        <DoneIcon className="edit" onClick={() => { this.props.onAddItem(this.state.score, this.props.id, this.props.team); this.setState({ score: '' }) }} />
                        <DeleteIcon className="delete" onClick={() => { this.setState({ score: '' }) }} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
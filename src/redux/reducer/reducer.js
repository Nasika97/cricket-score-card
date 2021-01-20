import {LOGIN,ADD_TEAM,GET_TEAM,EDIT_TEAM,DELETE_TEAM,GET_MATCH,EDIT_MATCH,ADD_MATCH,DELETE_MATCH,GET_PLAYER,EDIT_PLAYER,ADD_PLAYER,DELETE_PLAYER,GET_SCORE,ADD_SCORE,DELETE_SCORE,EDIT_SCORE} from '../constants/constant'
const initialState = {
    Teams: [{id:1,name:'Red',desc:'Red Ble'},{id:2,name:'Blue',desc:'Green blue'}],
    Matches:[{id:1,teamA:1,teamB:2,date:'01/20/2020',time:'10',period:'1'}],
    Players:[{id:1,fname:'Soni',lname:'Sathya',role:1,team:2},{id:2,fname:'Pugal',lname:'Pugal',role:5,team:2},{id:3,fname:'Muthu',lname:'Vel',role:2,team:2},{id:4,fname:'Dhoni',lname:'Agarwal',role:1,team:1},{id:5,fname:'Ashwin',lname:'Ram',role:5,team:1},{id:6,fname:'Soniya',lname:'Agarwal',role:2,team:1}],
    Roles:[{id:1,name:'All Rounder'},{id:2,name:'Bats Man'},{id:3,name:'Bowler'},{id:4,name:'Captain'},{id:5,name:'Widget Keeper'},{id:6,name:'Wise Captain'}]
    ,Period:[{id:1,name:'AM'},{id:2,name:'PM'}],
    Scores:[],
    Logins:[{uname:'Admin',login:true}]
}

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case GET_TEAM:
            return {
                ...state
            }
            case  LOGIN :
            return {
                ...state,
                Logins: state.Logins.concat(action.payload)
            }
        case  ADD_TEAM :
            return {
                ...state,
                Teams: state.Teams.concat(action.payload)
            }
        case  EDIT_TEAM :
            return {
                ...state,
                Teams: state.Teams.map(
                    (content, i) => content.id === action.payload.id ?
                        { ...content, name: action.payload.name, desc: action.payload.desc }
                    :content)
            }
        case  DELETE_TEAM :
            return {
                ...state,
                Teams:state.Teams.filter((content,i)=>content.id!==action.payload)
            }
            case GET_MATCH:
            return {
                ...state
            }
        case  ADD_MATCH :
            return {
                ...state,
                Matches: state.Matches.concat(action.payload)
            }
        case  EDIT_MATCH:
            return {
                ...state,
                Matches: state.Matches.map(
                    (content, i) => content.id === action.payload.id ?
                        { ...content, teamA: action.payload.teamA, teamB: action.payload.teamB, date: action.payload.date,  time: action.payload.time}
                    :content)
            }
        case  DELETE_MATCH :
            return {
                ...state,
                Matches:state.Matches.filter((content,i)=>content.id!==action.payload)
            }
            case GET_PLAYER:
            return {
                ...state
            }
        case  ADD_PLAYER:
            return {
                ...state,
                Players: state.Players.concat(action.payload)
            }
        case  EDIT_PLAYER:
            return {
                ...state,
                Players: state.Players.map(
                    (content, i) => content.id === action.payload.id ?
                        { ...content, fname: action.payload.fname, lname: action.payload.lname,role: action.payload.role,team: action.payload.team }
                    :content)
            }
        case  DELETE_PLAYER :
            return {
                ...state,
                Players:state.Players.filter((content,i)=>content.id!==action.payload)
            }
        
            case GET_SCORE:
                return {
                    ...state
                }
            case  ADD_SCORE:
                return {
                    ...state,
                    Scores: state.Scores.concat(action.payload)
                }
                case  EDIT_SCORE:
                    return {
                        ...state,
                        Scores: state.Scores.map(
                            (content, i) => content.id === action.payload.id ?
                                { ...content, team: action.payload.team, match: action.payload.match, player: action.payload.player,  score: action.payload.score}
                            :content)
                    }
               
            case  DELETE_SCORE :
                return {
                    ...state,
                    Scores:state.Scores.filter((content,i)=>content.id!==action.payload)
                }
            
        default:
           return state
    }
}

export default reducer
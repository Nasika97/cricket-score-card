import {GET_TEAM,EDIT_TEAM,ADD_TEAM,DELETE_TEAM,GET_MATCH,EDIT_MATCH,ADD_MATCH,DELETE_MATCH,GET_PLAYER,EDIT_PLAYER,ADD_PLAYER,DELETE_PLAYER,GET_SCORE,ADD_SCORE,DELETE_SCORE,EDIT_SCORE,LOGIN} from '../constants/constant'
export function login(data) {
    return dispatch=>{
        return dispatch({
            type:  LOGIN ,
            payload:data
        })
    }
}
export function getTeam() {
    return dispatch=>{
        return dispatch({
            type: GET_TEAM 
        })
    }
}

export function addTeam(data) {
    return dispatch => {
        return dispatch({
            type:  ADD_TEAM ,
            payload:data
        })
    }
}

export function editTeam(data) {
    return dispatch => {
        return dispatch({
            type:  EDIT_TEAM ,
            payload:data
        })
    }
}

export function deleteTeam(id) {
    return dispatch => {
        return dispatch({
            type:  DELETE_TEAM ,
            payload:id
        })
    }
}


export function getMatch() {
    return dispatch=>{
        return dispatch({
            type: GET_MATCH 
        })
    }
}

export function addMatch(data) {
    return dispatch => {
        return dispatch({
            type:  ADD_MATCH ,
            payload:data
        })
    }
}

export function editMatch(data) {
    return dispatch => {
        return dispatch({
            type:  EDIT_MATCH ,
            payload:data
        })
    }
}

export function deleteMatch(id) {
    return dispatch => {
        return dispatch({
            type:  DELETE_MATCH ,
            payload:id
        })
    }
}


export function getPlayer() {
    return dispatch=>{
        return dispatch({
            type: GET_PLAYER 
        })
    }
}

export function addPlayer(data) {
    return dispatch => {
        return dispatch({
            type:  ADD_PLAYER  ,
            payload:data
        })
    }
}

export function editPlayer(data) {
    return dispatch => {
        return dispatch({
            type:  EDIT_PLAYER,
            payload:data
        })
    }
}

export function deletePlayer(id) {
    return dispatch => {
        return dispatch({
            type:  DELETE_PLAYER,
            payload:id
        })
    }
}


export function getScore() {
    return dispatch=>{
        return dispatch({
            type: GET_SCORE 
        })
    }
}

export function addScore(data) {
    return dispatch => {
        return dispatch({
            type:  ADD_SCORE  ,
            payload:data
        })
    }
}

export function editScore(data) {
    return dispatch => {
        return dispatch({
            type:  EDIT_SCORE,
            payload:data
        })
    }
}

export function deleteScore(id) {
    return dispatch => {
        return dispatch({
            type:  DELETE_SCORE,
            payload:id
        })
    }
}

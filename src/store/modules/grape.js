import {createAction, handleActions} from 'redux-actions';
import { pender } from 'redux-pender';
import {Map} from 'immutable';
import {GREEN, PURPLE} from '../../common/Color';
import * as api from '../../lib/api';

const CHANGE_DEPTH = 'grape/DEPTH';
const CHANGE_COLOR = 'grape/COLOR';
const INITIALLIZE = 'grape/INITIALIZE';
const SET_JUICE = 'grape/SET_JUICE';
const MAKING_JUICE = 'grape/MAKING_JUICE';
const SAVE_JUICE = 'grape/SAVE_JUICE';
const SET_TITLE = 'grape/SET_TITLE';
const SET_RGBA = 'grape/SET_RGBA';
const SHOW_MODAL = 'grape/SHOW_MODAL';
const HIDE_MODAL = 'grape/HIDE_MODAL';
const CHANGE_GRAPE_CONTENT = 'grape/CHANGE_GRAPE_CONTET';
const GET_GRAPES = 'grape/GET_GRAPES';

export const changeDepth = createAction(CHANGE_DEPTH, api.createNew);
export const getGrapesStatus = createAction(GET_GRAPES,api.readGrapes);
export const changeColor = createAction(CHANGE_COLOR, api.updateOneGrapeColor);
export const changeGrapeContent = createAction(CHANGE_GRAPE_CONTENT, api.updateOneGrape);
export const initialize = createAction(INITIALLIZE);
export const setJuice = createAction(SET_JUICE);
export const makingJuice = createAction(MAKING_JUICE);
export const saveJuice = createAction(SAVE_JUICE);
export const setTitle = createAction(SET_TITLE, api.updateTitle);
export const setRgba = createAction(SET_RGBA, api.updateRgba);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

const initialState = Map({
    grape: [],
    rgba: GREEN,
    gno: null,
    depth: 0,
    juiceRatio: {green: 0, purple: 0},
    isJuiceMaking: false,
    isJuiceSaved: false,
    title: '',
    modal: false
});

const checkGrapeColor = (grapes) =>{
    let green = 0;
    let purple = 0;
    grapes.forEach(g => {
        if(!g.isChecked) green++;
        else purple++;
    });
    return {green, purple};
}

export default handleActions({
    [INITIALLIZE]: (state, action) => {
        return state.set(initialState);
    },
    ...pender({
        type: CHANGE_DEPTH,
        onPending: (state, action) => {
            return state; 
        },
        onSuccess: (state, action) => {
            const {gno, depth} = action.payload.data;
            return state.set('gno', gno)
                .set('depth', parseInt(depth));
        }
    }),
    ...pender({
        type: GET_GRAPES,
        onPending: (state, action) => {
            return state; 
        },
        onSuccess: (state, action) => {
            const grapes = action.payload.data;
            const grape = [];
            grapes.grape.map(g => grape[g.idx] = g);
            return state.set('grapeCnt', grapes.grapeCnt)
                .set('depth', grapes.depth)
                .set('title', grapes.title)
                .set('grape', grape)
                .set('gno', grapes._id);   
        }
    }),
    ...pender({
        type: CHANGE_COLOR,
        onPending: (state, action) => {
            return state;
        },
        onSuccess: (state, action) => {
            const grapes = action.payload.data;
            const grape = [];
            grapes.grape.map(g => grape[g.idx] = g);
            return state.set('grape', grape);
        }
    }),
    ...pender({
        type: CHANGE_GRAPE_CONTENT,
        onPending: (state, action) => {
            return state;
        },
        onSuccess: (state, action) => {
            const grapes = action.payload.data;
            const grape = [];
            grapes.grape.map(g => grape[g.idx] = g);
            return state.set('grape', grape);
        }
    }),
    [SET_JUICE]: (state, action) => {
        const {isJuice} = action.payload;
        return state.set('isJuiceMaking', isJuice);
    },  
    [MAKING_JUICE]: (state, action) => {
        const {green, purple} = checkGrapeColor(state.get('grape'));
        return state.set('juiceRatio',{green, purple})
            .set('isJuiceMaking', true);
    },
    [SAVE_JUICE]: (state, action) => {
        return state.set('isJuiceSaved', true);
    },
    ...pender({
        type: SET_TITLE,
        onPending: (state, action) => {
            return state;
        },
        onSuccess: (state, action) => {
            const {title} = action.payload.data;
            return state.set('title', title);
        }
    }),
    ...pender({
        type: SET_RGBA,
        onPending: (state, action) => {
            return state;
        },  
        onSuccess: (state, action) => {
            return state.set('rgba', action.payload.data.rgba);
        }
    }),
    [SHOW_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
    [HIDE_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
}, initialState);
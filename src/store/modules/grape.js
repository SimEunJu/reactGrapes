import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {GREEN, PURPLE} from '../../common/Color';

const CHANGE_DEPTH = 'grape/DEPTH';
const CHANGE_COLOR = 'grape/COLOR';
const INITIALLIZE = 'grape/INITIALIZE';
const HARVEST = 'grape/HARVEST';
const SET_JUICE = 'grape/SET_JUICE';
const MAKING_JUICE = 'grape/MAKING_JUICE';
const SAVE_JUICE = 'grape/SAVE_JUICE';
const SET_TITLE = 'grape/SET_TITLE';
const SET_RGBA = 'grape/SET_RGB';
const SHOW_MODAL = 'grape/SHOW_MODAL';
const HIDE_MODAL = 'grape/HIDE_MODAL';

export const changeDepth = createAction(CHANGE_DEPTH);
export const changeColor = createAction(CHANGE_COLOR);
export const initialize = createAction(INITIALLIZE);
export const harvest = createAction(HARVEST);
export const setJuice = createAction(SET_JUICE);
export const makingJuice = createAction(MAKING_JUICE);
export const saveJuice = createAction(SAVE_JUICE);
export const setTitle = createAction(SET_TITLE);
export const setRgba = createAction(SET_RGBA);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

const initialState = Map({
    color: [...Array(15).keys()].map((m)=> GREEN),
    rgba: GREEN,
    depth: 5,
    isHarvest: false,
    juiceRatio: {green: 0, purple: 0},
    isJuice: false,
    savedJuice: false,
    title: '',
    modal: false
});

const checkGrapeColor = (grapes) =>{
    let green = 0;
    let purple = 0;
    grapes.forEach(g => {
        if(g === GREEN) green++;
        else purple++;
    });
    return {green, purple};
}

export default handleActions({
    [INITIALLIZE]: (state, action) => {
        return state.set(initialState);
    },
    [CHANGE_DEPTH]: (state, action) => {
        let {payload: depth} = action;
        depth = parseInt(depth);
        let updatedList;
        const len = state.get('color').length;
        const nextSize = depth*(depth+1)/2;
        if(depth > state.get('depth')){
            updatedList = state.get('color').concat([...Array(nextSize - len).keys()].map((m) => 'green'));
        }
        else{
            updatedList = state.get('color').slice(0, nextSize);
        }
        return state.set('depth', depth)
            .set('color', updatedList);
    },
    [CHANGE_COLOR]: (state, action) => {
        const {color, offset} = action.payload;
        const updatedList = [...state.get('color')];
        updatedList[offset] = color;
        return state.set('color', updatedList);
    },
    [HARVEST]: (state, action) => {
        const {isHarvest} = action.payload;
        return state.set('isHarvest', isHarvest);
    },
    [SET_JUICE]: (state, action) => {
        const {isJuice} = action.payload;
        return state.set('isJuice', isJuice);
    },  
    [MAKING_JUICE]: (state, action) => {
        const {green, purple} = checkGrapeColor(state.get('color'));
        return state.set('juiceRatio',{green, purple})
            .set('isJuice', true);
    },
    [SAVE_JUICE]: (state, action) => {
        return state.set('savedJuice', true);
    },
    [SET_TITLE]: (state, action) => {
        const {title} = action.payload;
        return state.set('title',title);
    },
    [SET_RGBA]: (state, action) => {
        const {rgba} = action.payload;
        return state.set('rgba', rgba);
    },
    [SHOW_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
    [HIDE_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
}, initialState);
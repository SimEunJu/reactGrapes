import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {GREEN, PURPLE} from '../../common/Color';
import * as api from '../../lib/api';

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
const CHANGE_GRAPE_CONTET = 'grape/CHANGE_GRAPE_CONTET';
const GET_GRAPES = 'grape/GET_GRAPES';

export const changeDepth = createAction(CHANGE_DEPTH);
export const getGrapesStatus = createAction(GET_GRAPES);
export const changeColor = createAction(CHANGE_COLOR);
export const changeGrapeContent = createAction(CHANGE_GRAPE_CONTET);
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
    grape: {},
    rgba: GREEN,
    gno: null,
    depth: 5,
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
        let depth = action.payload;
        depth = parseInt(depth);

        const gno = api.createNew(depth).gno;

        return state.set('gno', gno)
            .set('depth', depth);
    },
    [GET_GRAPES]: (state, action) => {
        const gno = state.get('gno');
        if(gno == null){
            gno = action.payload.gno;
        }
        const grapes = api.readGrapes(gno);
        
        const grape = [];
        grapes.grape.map(g => grape[g.idx] = g);
        return state.set('grapeCnt', grapes.grapeCnt)
            .set('depth', grapes.depth)
            .set('title', grapes.title)
            .set('grape', grape);     
    },
    [CHANGE_COLOR]: (state, action) => {
        const {color, offset} = action.payload;
        const isChecked = color === PURPLE;

        api.updateOneGrapeColor({gno: state.get('gno'), idx: offset, isChecked});
        
        const updatedList = [...state.get('grape')];
        updatedList[offset].isChecked = isChecked;
        return state.set('color', updatedList);
    },
    [CHANGE_GRAPE_CONTET]: (state, action) => {
        const {title, content, offset} = action;

        const updatedList = [...state.get('grape')];
        updatedList[offset].title = title;
        updatedList[offset].content = content;
        
        api.updateOneGrape({gno: state.get('gno'), idx: offset, title, content});
    },
    [SET_JUICE]: (state, action) => {
        const {isJuice} = action.payload;
        return state.set('isJuiceMaking', isJuice);
    },  
    [MAKING_JUICE]: (state, action) => {
        const {green, purple} = checkGrapeColor(state.get('color'));
        return state.set('juiceRatio',{green, purple})
            .set('isJuiceMaking', true);
    },
    [SAVE_JUICE]: (state, action) => {
        return state.set('isJuiceSaved', true);
    },
    [SET_TITLE]: (state, action) => {
        const {title} = action.payload;
        api.updateTitle({gno: state.get('gno'), title});
        return state.set('title',title);
    },
    [SET_RGBA]: (state, action) => {
        const {rgba} = action.payload;
        api.updateRgba({gno: state.get('gno'), rgba});
        return state.set('rgba', rgba);
    },
    [SHOW_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
    [HIDE_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
}, initialState);
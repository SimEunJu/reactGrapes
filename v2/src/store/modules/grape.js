import {createSlice} from '@reduxjs/toolkit';
import {createAction, handleActions} from 'redux-actions';
import { pender } from 'redux-pender';
import {GREEN, PURPLE} from '../../common/Color';
import * as api from '../../lib/api';

/*
const CHANGE_DEPTH = 'grape/DEPTH';
const IS_DEPTH_SET = 'grape/IS_DEPTH_SET';
const GET_GRAPE_NO = 'grape/GET_GRAPE_NO';

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
const GET_SHOWCASE = 'grape/GET_SHOWCASE';

export const changeDepth = createAction(CHANGE_DEPTH);
export const setDepth = createAction(IS_DEPTH_SET);
export const getGrapeNo = createAction(GET_GRAPE_NO, api.createNew);

export const getGrapesStatus = createAction(GET_GRAPES,api.readGrapes);
export const changeColor = createAction(CHANGE_COLOR, api.updateOneGrapeColor);
export const changeGrapeContent = createAction(CHANGE_GRAPE_CONTENT, api.updateOneGrape);
export const initialize = createAction(INITIALLIZE);
export const setJuice = createAction(SET_JUICE);
export const makingJuice = createAction(MAKING_JUICE);
export const saveJuice = createAction(SAVE_JUICE);
export const setTitle = createAction(SET_TITLE, api.updateTitle);
export const setRgba = createAction(SET_RGBA, api.finishOneGrape);
export const showModal = createAction(SHOW_MODAL, api.readOneGrape);
export const hideModal = createAction(HIDE_MODAL);
export const getShowcase = createAction(GET_SHOWCASE); //, api.readShowcase
*/

const checkGrapeColor = (grapes) =>{
    let green = 0;
    let purple = 0;
    grapes.forEach(g => {
        if(!g.isChecked) green++;
        else purple++;
    });
    return {green, purple};
}

const grapeSlice = createSlice({
    name: 'grape',
    initialState: {
        grape: [],
        rgba: GREEN,
        gno: null,
        depth: null, //null
        isDepthSet: false, // false
        juiceRatio: {green: 0, purple: 0},
        isJuiceMaking: false,
        isJuiceSaving: false,
        isJuicesaved: false,
        title: '',
        modal: false,
        modalTitle: '',
        modalContent: '',
        showcase: [{id: 3, depth: 4, title: "test", rgba: "rgba(179, 32, 82, 0.52)", grapes: null}]
    },
    reducers: {
        initialize: () => {
            return grapeSlice.initialState;
        },
        getGrapeNo: (state, action) => {
            const gno = action.payload.data;
            state.gno = gno;
        },
        getGrapesStatus: (state, action) => {
            const {id, depth, title, grapes} = action.payload.data;
            state.gno = id;
            state.depth = depth;
            state.title = title;
            state.grape = grapes;
        },
        changeColor: (state, action) => {
            const grapeId = action.payload.data;
            state.grape.forEach(grape => {
                    if(grape.id === grapeId){
                        grape.isChecked = true;
                        return;
                    }
                });
        },
        changeGrapeContent: (state, action) => {
            const grapeRes = action.payload.data;
            state.grape.forEach(grape => {
                    if(grape.id === grapeRes.id){
                        grape = grapeRes;
                        return;
                    } 
                });
        },
        setJuice: (state, action) => {
            const {isJuice} = action.payload;
            state.isJuiceMaking = isJuice;
        },  
        makingJuice: (state, action) => {
            const {green, purple} = checkGrapeColor(state.grape);
            state.juiceRatio = {green, purple};
            state.isJuiceMaking = true;
        },
        saveJuice: (state, action) => {
            state.isJuiceSaving = true;
        },
        setTitle: (state, action) => {
            const title = action.payload.data;
            state.title = title;
        },
        setRgba: (state, action) => {
            state.rgba = action.payload.data.rgba;
            state.isJuiceSaved = true;
        },
        getShowcase: (state, action) => {
            const {dtoList} = action.payload.data;
            state.showcase = dtoList;
        },
        showModal: (state, action) => {
            const {title, content} = action.payload.data;
            state.modal = true;
            state.modalTitle = title;
            state.modalContent = content;
        },
        hideModal: (state, action) => {
            state.modal = false;
        },
        setDepth: (state, action) => {
            state.isDepthSet = action.payload;
        },
        changeDepth: (state, action) => {
            state.depth = action.payload;
        }
    }
});

export const {initialize, getGrapeNo, getGrapesStatus, 
    changeColor, changeGrapeContent, setJuice, 
    makingJuice, saveJuice, setTitle, 
    setRgba, getShowcase, showModal, 
    hideModal, setDepth, changeDepth} = grapeSlice.actions;

export default grapeSlice.reducer;

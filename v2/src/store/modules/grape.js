import {createAction, handleActions} from 'redux-actions';
import { pender } from 'redux-pender';
import {Map} from 'immutable';
import {GREEN, PURPLE} from '../../common/Color';
import * as api from '../../lib/api';

const CHANGE_DEPTH = 'grape/DEPTH';
const IS_DEPTH_SET = 'grape/IS_DEPTH_SET';
const GET_GRAPE_NO = 'grape/GET_GRAPE_NO'

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
export const setRgba = createAction(SET_RGBA, api.updateRgba);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const getShowcase = createAction(GET_SHOWCASE, api.readShowcase);

const initialState = Map({
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
    showcase: []
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
        type: GET_GRAPE_NO,
        onPending: (state, action) => {
            return state; 
        },
        onSuccess: (state, action) => {
            const gno = action.payload.data;
            return state.set('gno', gno);
        },
        onFailure: (state, action) => {
            return state.set('gno', null);
        }
    }),
    ...pender({
        type: GET_GRAPES,
        onPending: (state, action) => {
            return state; 
        },
        onSuccess: (state, action) => {
            const grapes = action.payload.data;

            return state.set('gno', grapes.id)
                .set('depth', grapes.depth)
                .set('title', grapes.title)
                .set('grape', grapes.grapes);
        }
    }),
    ...pender({
        type: CHANGE_COLOR,
        onPending: (state, action) => {
            return state;
        },
        onSuccess: (state, action) => {
            const grapeId = action.payload.data;
            const updatedGrapes = state.get('grape')
                .map(grape => {
                    if(grape.id === grapeId){
                        grape.isChecked = true
                        return grape;
                    }
                    return grape;
                });
            return state.set('grape', updatedGrapes);
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
        return state.set('isJuiceSaving', true);
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
            return state.set('rgba', action.payload.data.rgba)
                        .set('isJuiceSaved', true);
        }
    }),
    ...pender({
        type: GET_SHOWCASE,
        onPending: (state, action) => {
            return state;
        },  
        onSuccess: (state, action) => {
            const showcase = action.payload.data;
            return state.set('showcase', showcase);
        }
    }),
    [SHOW_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
    [HIDE_MODAL]: (state, action) => {
        return state.set('modal', action.payload.modal);
    },
    [IS_DEPTH_SET]: (state, action) => {
        return state.set('isDepthSet', action.payload);
    },
    [CHANGE_DEPTH]: (state, action) => {
        return state.set('depth', action.payload);
    },
}, initialState);

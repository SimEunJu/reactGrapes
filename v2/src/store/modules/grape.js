import {createSlice} from '@reduxjs/toolkit';
import {GREEN, PURPLE} from '../../common/Color';
import createRequestSaga from '../../lib/createRequestSaga';
import * as api from '../../lib/api';
import { takeLatest } from '@redux-saga/core/effects';

const CREATE_NEW_B_GRAPES = 'grape/getGrapeNo';
const GET_B_GRAPES = 'grape/getGrapesStatus';
const UPDATE_GRAPE_CHECK = 'grape/changeColor';
const UPDATE_GRAPE_CONTENT = 'grape/changeGrapeContent';
const UPDATE_B_GRAPES_TITLE = 'grape/setTitle';
const UPDATE_GRAPE_FINISH = 'grape/setRgba';
const GET_GRAPE = 'grape/showModal';
const GET_B_GRAPES_LIST = 'grape/getShowcase';

const [getGrapeNo, createNewBunchGrapesSaga] = createRequestSaga(CREATE_NEW_B_GRAPES, api.createNewBunchGrapes);
const [getGrapesStatus, getBunchGrapesSaga] = createRequestSaga(GET_B_GRAPES, api.getBunchGrapes);
const [changeColor, updateGrapeCheckSaga] = createRequestSaga(UPDATE_GRAPE_CHECK, api.updateGrapeCheck);
const [changeGrapeContent, updateGrapeContentSaga] = createRequestSaga(UPDATE_GRAPE_CONTENT, api.updateGrapeContent);
const [setTitle, updateBunchGrapesTitleSaga] = createRequestSaga(UPDATE_B_GRAPES_TITLE, api.updateBunchGrapesTitle);
const [setRgba, updateGrapeFinishSaga] = createRequestSaga(UPDATE_GRAPE_FINISH, api.updateGrapeFinish);
const [showModal, getGrapeSaga] = createRequestSaga(GET_GRAPE, api.getGrape);
const [getShowcase, getBunchGrapesListSaga] = createRequestSaga(GET_B_GRAPES_LIST, api.getBunchGrapesList);

export {getGrapeNo, getGrapesStatus, changeColor,
    changeGrapeContent, setTitle, setRgba, showModal, getShowcase};

// TODO: 이렇게 하는게 맞는겨?...
export function* grapeSaga() {
    yield takeLatest(CREATE_NEW_B_GRAPES, createNewBunchGrapesSaga);
    yield takeLatest(GET_B_GRAPES, getBunchGrapesSaga);
    yield takeLatest(UPDATE_GRAPE_CHECK, updateGrapeCheckSaga);
    yield takeLatest(UPDATE_GRAPE_CONTENT, updateGrapeContentSaga);
    yield takeLatest(UPDATE_B_GRAPES_TITLE, updateBunchGrapesTitleSaga);
    yield takeLatest(UPDATE_GRAPE_FINISH, updateGrapeFinishSaga);
    yield takeLatest(GET_GRAPE, getGrapeSaga);
    yield takeLatest(GET_B_GRAPES_LIST, getBunchGrapesListSaga);
}

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
        grapes: [],
        bunchGrapes: GREEN,
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
        showcase: [],//[{id: 3, depth: 4, title: "test", rgba: "rgba(179, 32, 82, 0.52)", createDate: '2020-12-25', finishDate: '2021-01-20', grapes: null}],
        showcasePaging: {
            hasNext: false,
            page: 0,
            size: 10,
        }
    },
    reducers: {
        initialize: (state) => {
            state = grapeSlice.initialState;
        },
        getGrapeNoSuccess: (state, action) => {
            const gno = action.payload;
            state.gno = gno;
            state.getGrapeNoSuccess = true;
        },
        getGrapesStatusSuccess: (state, action) => {
            const {id, depth, title, grapes} = action.payload;
            state.gno = id;
            state.depth = depth;
            state.title = title;
            state.grape = grapes;
            state.getGrapesStatusSuccess = true;
        },
        getGrapesStatusFailure: (state, action) => {
            
        },
        changeColorSuccess: (state, action) => {
            const grapeId = action.payload;
            state.grape.forEach(grape => {
                    if(grape.id === grapeId){
                        grape.isChecked = true;
                        return;
                    }
                });
            state.changeColorSuccess = true;
        },
        changeGrapeContentSuccess: (state, action) => {
            const grapeRes = action.payload;
            state.grape.forEach(grape => {
                    if(grape.id === grapeRes.id){
                        grape = grapeRes;
                        return;
                    } 
                });
            state.changeGrapeContentSuccess = true;
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
        setRgbaSuccess: (state, action) => {
            state.rgba = action.payload.data.rgba;
            state.isJuiceSaved = true;
        },
        getShowcaseSuccess: (state, action) => {
            const {dtoList, hasNext, page, size} = action.payload;
            state.showcasePaging.hasNext = hasNext;
            state.showcasePaging.page = page;
            state.showcasePaging.size = size;
            state.showcase = dtoList;
            state.getShowcaseSuccess = true;
        },
        showModalSuccess: (state, action) => {
            const {title, content} = action.payload;
            state.modal = true;
            state.modalTitle = title;
            state.modalContent = content;
            state.showModalSuccess = true;
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

export const {initialize, 
    setJuice, 
    makingJuice, saveJuice, 
    hideModal, setDepth, changeDepth} = grapeSlice.actions;

export default grapeSlice.reducer;

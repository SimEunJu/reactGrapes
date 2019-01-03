import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';

const CHANGE_DEPTH = 'grape/DEPTH';
const CHANGE_COLOR = 'grape/COLOR';
const INITIALLIZE = 'grape/INITIALIZE';

export const changeDepth = createAction(CHANGE_DEPTH);
export const changeColor = createAction(CHANGE_COLOR);
export const initialize = createAction(INITIALLIZE);

const initialState = Map({
    color: [...Array(15).keys()].map((m)=>'green'),
    depth: 5,
});

export default handleActions({
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
    }
}, initialState);
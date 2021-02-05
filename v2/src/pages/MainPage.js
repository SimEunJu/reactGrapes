import React, {Fragment, useEffect} from 'react';
import Loader from "react-loader-spinner";
import GrapesContainer from '../containers/GrapesContainer';
import JuiceContainer from '../containers/JuiceContainer';
import HeaderContainer from '../containers/HeaderContainer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getGrapesStatus} from '../store/modules/grape';
import JuiceBtnContainer from '../containers/JuiceBtnContainer';

// TODO: 나중에 saga로 변경하면서 refactoring
const GET_GRAPES = 'grape/GET_GRAPES';

const MainPage = (props) => {

    const {grapeStatusLoading, grapeStatusFail} = useSelector(({pender}) => ({
        grapeStatusLoading: pender.pending[GET_GRAPES],
        grapeStatusFail: pender.failure[GET_GRAPES]
    }), shallowEqual);
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        const {match, history} = props;
        const {gno} = match.params;
        if(isNaN(parseInt(gno, 10))) history.push('/');
        dispatch(getGrapesStatus(gno));
    }, []);
    
    if(grapeStatusLoading){
        return <Loader type="Circles" color="#00BFFF" height={80} width={80}/>;
    }
    // TODO: 실패 페이지 필요
    if(grapeStatusFail) return false;
    return (
        <Fragment>
            <HeaderContainer />
            <JuiceBtnContainer />
            <GrapesContainer />
            <JuiceContainer />
        </Fragment>
    );
};

export default MainPage;
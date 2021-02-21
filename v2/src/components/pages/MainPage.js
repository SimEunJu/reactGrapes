import React, {Fragment, useEffect} from 'react';
import GrapesContainer from '../molecules/GrapesContainer';
import JuiceContainer from '../molecules/JuiceContainer';
import HeaderContainer from '../molecules/HeaderContainer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getGrapesStatus } from '../../store/modules/grape';
import JuiceBtnContainer from '../molecules/JuiceBtnContainer';
import NetworkErr from "./error/NetworkErr";
import Loader from "../atoms/Loader";

const MainPage = (props) => {

    const {getBunchGrapesSuccess, getBunchGrapesFailure} 
        = useSelector(({grape}) => ({
        getBunchGrapesSuccess: grape.getGrapesStatusSuccess,
        getBunchGrapesFailure: grape.getGrapesStatusFailure,
    }), shallowEqual);
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        const {match, history} = props;
        let {gno} = match.params;
        if(isNaN(gno)) history.push('/');

        dispatch(getGrapesStatus(parseInt(gno, 10)));
    }, []);

    if(getBunchGrapesFailure) return <NetworkErr />;

    if(getBunchGrapesSuccess) return (
        <>
            <HeaderContainer />
            <JuiceBtnContainer /> 
            <GrapesContainer /> 
            <JuiceContainer />
        </>
    );
        
    return <Loader />;
};



export default MainPage;
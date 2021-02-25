import React, {Fragment, useEffect} from 'react';
import GrapesContainer from '../molecules/GrapesContainer';
import JuiceContainer from '../molecules/JuiceContainer';
import HeaderContainer from '../molecules/HeaderContainer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getGrapesStatus } from '../../store/modules/grape';
import JuiceFinishBlock from '../molecules/JuiceFinishBlock';
import NetworkErr from "./error/NetworkErr";
import Loader from "../atoms/Loader";

const MainPage = (props) => {

    const {getBunchGrapesSuccess, getBunchGrapesLoading} 
        = useSelector(({grape, loading}) => ({
        getBunchGrapesSuccess: grape.getGrapesStatusSuccess,
        getBunchGrapesLoading: loading['grape/getGrapesStatus']
    }), shallowEqual);
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        const {match, history} = props;
        let {gno} = match.params;
        if(isNaN(gno)) history.push('/');
        
        dispatch(getGrapesStatus(parseInt(gno, 10)));
    }, []);

    if(getBunchGrapesLoading) return <Loader />;

    if(getBunchGrapesSuccess) return (
        <>
            <HeaderContainer />
            <JuiceFinishBlock /> 
            <GrapesContainer /> 
            <JuiceContainer />
        </>
    );    
    
    return <NetworkErr />;
};

export default MainPage;
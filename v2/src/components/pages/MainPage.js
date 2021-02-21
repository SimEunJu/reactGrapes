import React, {Fragment, useEffect} from 'react';
import Loader from "react-loader-spinner";
import GrapesContainer from '../molecules/GrapesContainer';
import JuiceContainer from '../molecules/JuiceContainer';
import HeaderContainer from '../molecules/HeaderContainer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getGrapesStatus} from '../../store/modules/grape';
import JuiceBtnContainer from '../molecules/JuiceBtnContainer';
import styled from 'styled-components';

const LoaderBlock = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainPage = (props) => {

    // TODO: 성공, 실패 여부 어떻게 할지 고민쓰
    const {grapeStatusSuccess, grapeStatusFail} 
        = useSelector(({loading}) => ({
        grapeStatusSuccess: loading.getGrapesStatus,
        grapeStatusFail: loading.getGrapesStatus,
    }), shallowEqual);
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        const {match, history} = props;
        let {gno} = match.params;
        if(isNaN(gno)) history.push('/');
        dispatch(getGrapesStatus(parseInt(gno, 10)));
    }, []);

    // TODO: 실패 페이지 필요
    if(grapeStatusFail) return <div />;
    if(grapeStatusSuccess) return (
        <Fragment>
            <HeaderContainer />
            <JuiceBtnContainer /> 
            <GrapesContainer /> 
            <JuiceContainer />
        </Fragment>
    );
        
    // TODO: 로더 붙이는게 더 지저분쓰..
    return (
        <LoaderBlock>
            <Loader type="Circles" color="#00BFFF" height={200} width={200}/>
        </LoaderBlock>
    );
};

export default MainPage;
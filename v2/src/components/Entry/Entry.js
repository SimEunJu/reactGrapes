import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeDepth, isDepthSet } from '../../store/modules/grape';
import Depth from '../Depth';
import DepthInput from '../DepthInput';
import StartBtn from '../StartBtn';

const EntryBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100vh;
`;

const Entry = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        
        return () => {
            // 상태 초기화?
            //GrapeActions.setJuice({isJuice: false});
        }
    }, []);
    
    /*
     TODO: 
        1. depth가 세팅되면 3개의 section으로 나누어진 animation을 trigger 시켜야 함
        : state.isDepthSet === true ? 움직여야 하는 width 계산해서 return
    */
     return (
        <EntryBlock>
            <DepthInput />
            <Depth />
            <StartBtn />
        </EntryBlock>
    );
}

export default Entry;
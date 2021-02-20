import React, {useEffect, useMemo, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Juice from '../components/Juice';
import {setRgba} from '../store/modules/grape';

// TODO: animation web api를 사용하기 위한 boilerplate가 양이 많아서
// 애니메이션 전담 컴포넌트를 따로 빼서  
// container - animation component로 구성하거나, HOC를 고려해야 할 것 같음
const JuiceContainer = () => {

    const {gno, juiceColorCntSet} = useSelector(({grape}) => ({
        gno: grape.gno,
        juiceColorCntSet: grape.juiceRatio
    }), shallowEqual);

    const dispatch = useDispatch();
    
    const getJuiceColor = useMemo(() => {
        const {green: greenCnt, purple: purpleCnt} = juiceColorCntSet;
        const totalCnt = greenCnt + purpleCnt;
        const aRatio = purpleCnt/totalCnt * 0.6 + 0.4;
        const rgba = `rgba(179, 32, 82, ${1*aRatio})`;
        return rgba;
    }, [juiceColorCntSet]);
    
    const saveJuice = () =>{
        dispatch(setRgba({'rgba': getJuiceColor, gno}));
    }

    return(
        <Juice
            saveJuice={saveJuice}
            rgba={getJuiceColor}/>
    );
}

export default JuiceContainer;
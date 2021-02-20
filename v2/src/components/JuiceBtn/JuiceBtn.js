import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makingJuice} from '../../store/modules/grape';
import './JuiceBtn.scss';

const JuiceBtn = () => {
    
    const isJuiceSaving = useSelector(({grape}) => grape.isJuiceSaving);
    const dispatch = useDispatch();

    const handleClick = () =>{
        if(isJuiceSaving) return;
        dispatch(makingJuice());
    }
    
    return(
        <svg onClick={handleClick} className='juiceBtnWrap' width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
            <circle className='juiceBtn' cx='50' cy='50' fill='gold' r='40'></circle>
            <text x='35' y='45'>주스</text>
            <text x='25' y='65'>만들기</text>
        </svg>
    );
}

export default JuiceBtn;
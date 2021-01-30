import React, { useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getGraepNo } from '../../store/modules/grape';

const Btn = styled.button`
    margin-top: 0;
    border-radius: 50%;
    border: none;
    height: 100px;
    width: 100px;
    text-align: center;
    font-size: 20px;
    color: purple;
    font-weight: bold;
    outline: none;
    background-color: purple;
    color: white;  
`;

const BtnBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    transform: translateX(-10vw);
`;

const animations = {
    btnEl: {
        ref: null,
        self: null,
        keyframes: [
            {transform: 'scale(1)'},
            {transform: 'scale(1.15)'}
        ],
        options: {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-out'
        }
    },
    btnBlockEl: {
        ref: null,
        self: null,
        keyframes: [
            {transform: 'translateX(0)', visibility: 'inherit'}
        ],
        options: {
            duration: 1000,
            delay: 300,
            fill: 'forwards',
            easing: 'ease-out'
        }
    }
};

const StartBtn = ({ history }) => {

    const btnBlockRef = animations.btnBlockEl.ref = useRef();
    const btnRef = animations.btnEl.ref = useRef();

    const {isDepthSet, gno, depth} = useSelector(({grape}) => ({
        isDepthSet: grape.get('isDepthSet'),
        depth: grape.get('depth'),
        gno: grape.get('gno')
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        for (const el in animations){
            const {ref, self, keyframes, options} = animations[el];
           
            if(isDepthSet) animations[el].self = ref.current.animate(keyframes, options);
            else if (self) self.cancel();
        }
        
    }, [isDepthSet])

    const handleClick = () => {
        if(!isDepthSet) return false;
        
        dispatch(getGraepNo(depth));
        
        if(gno) history.push(`/grapes/${gno}`);
        else alert('잠시 후 다시 시도해주세요.');
    }
        
    return (
        <BtnBlock ref={btnBlockRef}>
            <Btn 
                ref={btnRef}
                onClick={handleClick} >
                시작하기
                </Btn>
        </BtnBlock>
    );
}

export default withRouter(StartBtn);
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import useAnimation from '../../hooks/animation/useAnimation';
import { useSelector } from 'react-redux';
import useEffectOnlyUpdate from '../../hooks/useEffectOnlyUpdate';

const DoorBtn = styled.div`
    
    position: fixed;
    left: calc(100vw - 108px);
    top: 120px;
    width: 60px;
    height: 65px;
    
    & > div{
        position: inherit;
        width: 60px;
        height: 65px;
        background-color: white;
        border-radius: 5%;
        border: 3px solid lightblue;
    }

    div:nth-child(1){
        border-left: none;
        z-index: 1;
        transform-origin: left;
        transform: skewY(8deg);
    }

    div:nth-child(2){
        text-align: center;
        line-height: 65px;
    }
`;

const animationOtps = {
    doorEl: {
        keyframes: [
            { transform: 'skewY(8deg)'},
            { transform: 'rotateY(150deg) skewY(8deg)'}
        ],
        options: {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease-in-out' 
        }
    }
}

const ShowcaseBtn = ({history}) => {

    const [doorRef, doorAni] = useAnimation(animationOtps.doorEl);
    const isJuiceSaved = useSelector(({grape}) => grape.get('isJuiceSaved'));
    const [isDoorOpen, setDoorOpen] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setDoorOpen(true);   
    }, []);

    const handleMouseLeave = useCallback(() => {
        setDoorOpen(false);    
    }, []);

    const handleClick = useCallback(() => {
        history.push('/setting');
    }, []);

    useEffectOnlyUpdate(() => {
        if(isDoorOpen || (isJuiceSaved && !isDoorOpen)){
            const {ref, keyframes, options} = doorAni;
            doorAni.animation = ref.current.animate(keyframes, options);
        } 
        else if(!isDoorOpen){
            const {animation} = doorAni;
            animation.reverse();
        }
    }, [isJuiceSaved, isDoorOpen]);
   
    return(
        <DoorBtn
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} >
            <div
                ref={doorRef} />
            <div 
                onClick={handleClick}>
                진열장
            </div>
        </DoorBtn>
    );
}
  
export default withRouter(ShowcaseBtn);
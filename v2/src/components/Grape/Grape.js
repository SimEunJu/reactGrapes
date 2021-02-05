import React, {useState, useEffect, useCallback} from 'react';
import styled  from "styled-components";
import './Grape.scss';
import checkedImg from '../../assets/img/checked.png';
import pencilImg from '../../assets/img/pencil.png';
import useAnimation from '../../hooks/animation/useAnimation';

const Drop = styled.div`
        width: ${({size}) => size}px;
        height: ${({size}) => size}px;
        background-color: ${({color}) => color};
        border-radius: 100%;
        cursor: pointer;
        margin: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;

const animationOpts = {
    dropEl: {
        keyframes: [
            {transform: 'translateY(0) translateX(0)'},
            {transform: null, backgroundColor: 'white'}
        ],
        options: {
            duration: null,
            fill: 'forwards',
            easing: 'ease',
            delay: 1000
        }
    }
}

const getRandRatio = () => {
    let num = (Math.random() + 1) * 0.5;
    return num;
} 

const Grape = (props) => {
    // TODO: 부모와 공유하는 상태가 많으면 props로 받고, 아니면 useSelector 사용
    const {idx, size, color, startJuiceAni, endJuiceAni, openModal, changeGrapeChecked} = props;

    const [dropRef, dropElAni] = useAnimation(animationOpts['dropEl']);
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [isVisible, setVisible] = useState(false);
    
    const getDropHeight = useCallback(() => {
        //offsetTop
        const top = dropRef.current.getBoundingClientRect().top;
        //document.body.clientHeight를 사용해도 상관없을 것 같다.
        const heigtFromViewBottom = document.documentElement.clientHeight - top;
        return heigtFromViewBottom;
    }, [dropRef]);

    const getDropWidth = useCallback(() => {
        // ?const size = window.innerHeight/depth;
        const left = dropRef.current.getBoundingClientRect().left;
        const centerOfView = document.documentElement.clientWidth/2;
        const widthFromViewCenter = centerOfView - left; //- size/2;
        return widthFromViewCenter;
    }, [dropRef]);

    useEffect(()=>{
        setHeight(getDropHeight());
        setWidth(getDropWidth());
    }, []);

    const showEditIcon = useCallback((isVisible) => {
        setVisible(isVisible);
    }, []);

    useEffect(() => {
        if(!startJuiceAni) return false;

        const {keyframes, options, ref} = dropElAni;
        
        const lastKeyframe = keyframes.size - 1;
        keyframes[lastKeyframe].transform = `translateY(${height}px) translateX(${width}px)`;
        options.duration = 3 * getRandRatio();
        
        ref.animate();

    }, [startJuiceAni]);
    
    if(endJuiceAni) return <div />;
    return (
        <Drop 
            color={color}
            size={size}
            onMouseEnter={() => showEditIcon(true)}
            onMouseLeave={() => showEditIcon(false)}
            ref={dropRef}>
            <div style={{visibility: isVisible? '' : 'hidden'}}>
                <img src={pencilImg} onClick={() => openModal(idx)}></img>
                <img src={checkedImg} onClick={() => changeGrapeChecked(idx)}></img>
            </div>
        </Drop>
    );
}
export default Grape;
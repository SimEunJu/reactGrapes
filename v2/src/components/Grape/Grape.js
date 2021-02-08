import React, {useState, useEffect, useCallback} from 'react';
import styled  from "styled-components";
import './Grape.scss';
import checkedImg from '../../assets/img/checked.png';
import pencilImg from '../../assets/img/pencil.png';
import useAnimation from '../../hooks/animation/useAnimation';
import { shallowEqual, useSelector } from 'react-redux';
import useEffectOnlyUpdate from '../../hooks/useEffectOnlyUpdate';

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
    // 700 <= num <= 1200
    let num = Math.random() * 1200;
    if(num < 700) num = 700;
    return num;
} 

const Grape = (props) => {
    // TODO: 부모와 공유하는 상태가 많으면 props로 받고, 아니면 useSelector 사용
    const {idx, size, color, openModal, changeGrapeChecked} = props;

    const {startJuiceAni, endJuiceAni} = useSelector( ({grape}) => ({
        startJuiceAni: grape.get('isJuiceMaking'),
        endJuiceAni: grape.get('isJuiceSaving')
    }), shallowEqual);

    const [dropRef, dropElAni] = useAnimation(animationOpts['dropEl']);
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [isVisible, setVisible] = useState(false);
    
    const getDropHeight = useCallback(() => {
        //offsetTop
        const top = dropRef.current.getBoundingClientRect().top;
        //document.body.clientHeight를 사용해도 상관없을 것 같다.
        const heigtFromViewBottom = document.documentElement.clientHeight - top - size;
        return heigtFromViewBottom;
    }, [dropRef]);

    const getDropWidth = useCallback(() => {
        // ?const size = window.innerHeight/depth;
        const left = dropRef.current.getBoundingClientRect().left;
        const centerOfView = document.documentElement.clientWidth/2;
        const widthFromViewCenter = centerOfView - left - size/2;
        return widthFromViewCenter;
    }, [dropRef]);

    /* TODO: 기존의 animation api 사용법으로는 해결이 안되어
    이유: parent에서 child animation이 완료되었는지 확인해야 하기 때문
    개괄적인 방법: 부모에서 Promise.all로 child animation.finished promise가 resolve되도록 대기
    방법1: child animation.finished를 부모에게 넘겨줘야 하는데 자식 -> 부모 데이터 흐름 X
    방법2: child에 handler 함수를 prop로 넘겨줌 -> 함수 내에서 자식 ref를 참조해야 하고,
    부모에서 child animation 정보를 가져야 함 -> 너무 복잡
    방법3: 결국 필요한 것은 animation.finshed! -> 부모에서 getAnimations() 호출해 자식에서 
        자식에서 실행되고 있는 모든 animation 객체를 가져올 수 있음 ->
        기존 형태를 유지하되 animation 초기화 위치만 변경
    */
    // TODO: 되돌아가기하면 오류쓰...!
    useEffect(()=>{

        const height = getDropHeight();
        setHeight(height);
        const width = getDropWidth();
        setWidth(width);

        const {keyframes, options} = dropElAni;
        
        const lastKeyframe = keyframes.length - 1;
        keyframes[lastKeyframe].transform = `translateY(${height}px) translateX(${width}px)`;
        options.duration = 3 * getRandRatio();

        const keyframeEffect = new KeyframeEffect(dropRef.current, keyframes, options);
        
        const dropAni = new Animation(keyframeEffect);
        dropElAni.animation = dropAni;
        dropAni.play();
        dropAni.pause();
        
    }, []);

    const showEditIcon = useCallback((isVisible) => {
        setVisible(isVisible);
    }, []);

    // TODO: 연속된 애니메이션이 다른 컴포넌트에 나뉘어져 있을 때 전역 상태를 통해서
    // 애니메이션을 트리거시켜야 하는데, 이게 최선일까
    useEffectOnlyUpdate(() => {
        if(!startJuiceAni) return false;

        dropElAni.animation.play();

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
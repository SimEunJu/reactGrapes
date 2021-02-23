import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import useAnimation from '../../hooks/animation/useAnimation';

const Header = ({changeTitle, title}) => {
    
    const [branchRef, branchAni] = useAnimation(animationConfig.extendBranch); 
    const [leafRef, leafAni] = useAnimation(animationConfig.rotateLeaf);

    const [titleInput, setTitleInput] = useState(title);
    const [titleBtnTxt, setTitleBtnTxt] = useState('입력');
    const [isWriteMode, setWriteMode] = useState(false); 
    
    const writeStartAni = useCallback(() => {
        const animations = [branchAni, leafAni];
        animations.forEach(ani => {
            const {ref, keyframes, options} = ani;
            ani.animation = ref.current.animate(keyframes, options);
        });
    }, [branchAni, leafAni]);

    const writeEndAni = useCallback(() => {
        const animations = [branchAni, leafAni];
        animations.forEach(ani => {
            const {animation} = ani;
            animation.reverse();
        });
    }, [branchAni, leafAni]);

    const animateLeafToWrite = useCallback(() => {
        writeStartAni(); 
        setWriteMode(true);
    }, [setWriteMode]);
    
    const animateLeafToClose = () => {
        writeEndAni();
        setWriteMode(false);

        if(titleInput) setTitleBtnTxt('수정');
        else setTitleBtnTxt('입력');
    }

    const handlekeyPress = useCallback(({key}) => {
        if(key === 'Enter'){
           animateLeafToClose();
           changeTitle(titleInput);
        }
    }, [changeTitle]);

    const handleChange = ( {target: {value}} ) => {
        setTitleInput(value);
    }

    const handleClick = (e) => {
        if(isWriteMode){
            animateLeafToClose();
            changeTitle(titleInput);
        } 
        else animateLeafToWrite();
    }

    // TODO: onBlur와 onClick 충돌 문제
    const handleWriteAni = useCallback((isWriteModeTrigger) => {
        if(isWriteMode === isWriteModeTrigger) return false;

        if(isWriteModeTrigger) animateLeafToWrite();
        else animateLeafToClose();
    }, [isWriteMode]);

    return (
        <HeaderBlock>
            <InputBlock>
                <input 
                    value={titleInput} 
                    onChange={handleChange} 
                    onKeyPress={handlekeyPress} 
                    type='title' 
                    placeholder='제목을 입력해 주세요'
                    onFocus={() => handleWriteAni(true)}
                    ></input>
                <Leaf ref={leafRef} onClick={handleClick} >
                    {titleBtnTxt}
                </Leaf>
            </InputBlock>
            <HorizontalBranch  ref={branchRef} />
            <VerticalBranch />
        </HeaderBlock>
    );
}

const animationConfig = {
    extendBranch: {
        keyframes: [
            {width: '40%'}, 
            {width: '80%'}
        ],
        options: {
            duration: 1000,
            easing: 'cubic-bezier(0.18, 0.01, 0, 1)',
            fill: 'both',
        }
    },
    rotateLeaf: {
        keyframes: [
            {transform: 'rotate(10deg)', left: '65%'},
            {transform: 'rotate(0)', left: '80%'}
        ],
        options: {
            duration: 1000,
            easing: 'cubic-bezier(0.18, 0.01, 0, 1)',
            fill: 'both',
        }
    }
}

const HeaderBlock = styled.div`
    width: 100%;
    margin-top: 60px;
`;
const InputBlock = styled.div`
    display: inline;

    input{
            text-align: center;
            display: block;
            margin: auto;
            padding: 10px;
            border: none;
            outline-style: none;
            font-size: 20px;
        }
`;
const Leaf = styled.div`
    background-color: #537126;
    border-radius: 48% / 72% 0;
    width: 100px;
    height: 70px;
    position: absolute;
    left: 65%;
    top: 25px;
    transform: rotate(10deg);
    z-index: 1;
    line-height: 70px;
    text-align: center;
    color: white;
    cursor: pointer;
`;
const HorizontalBranch = styled.div`
    background-color: #433b2e;
    width: 40%;
    height: 20px;
    margin: auto;
    border-radius: 8px;
`;
const VerticalBranch = styled.div`
    background-color: #433b2e;
    height: 50px;
    width: 20px;
    margin: auto;
`;

export default Header;
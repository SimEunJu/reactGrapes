import React, { useCallback, useState } from 'react';
import './Header.scss';

import JuiceBtn from '../JuiceBtn';
import ShowcaseBtn from '../ShowcaseBtn';
import useAnimation from '../../hooks/animation/useAnimation';

const animationOtps = {
    branchEl: {
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
    leafEl: {
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

const Header = ({changeTitle}) => {
    
    const [branchRef, branchAni] = useAnimation(animationOtps['branchEl']); 
    const [leafRef, leafAni] = useAnimation(animationOtps['leafEl']);

    const [titleInput, setTitleInput] = useState('');
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
        if(isWriteMode) animateLeafToClose();
        else animateLeafToWrite();
        changeTitle(titleInput);
    }

    const handleWriteAni = useCallback((isWriteModeTrigger) => {
        if(isWriteMode === isWriteModeTrigger) return false;

        if(isWriteModeTrigger) animateLeafToWrite();
        else animateLeafToClose();
    }, [isWriteMode]);

    return (
        <div className='header'>
            {/* TODO: 분리
            <JuiceBtn />
            <ShowcaseBtn isJuiceSaved={isJuiceSaved}/>
            */}
            <div className="inputArea">
                <input 
                    value={titleInput} 
                    onChange={handleChange} 
                    onKeyPress={handlekeyPress} 
                    type='title' 
                    placeholder='제목을 입력해 주세요'
                    onFocus={() => handleWriteAni(true)}
                    ></input>
                <div className='leaf' ref={leafRef} onClick={handleClick} >
                    {titleBtnTxt}
                </div>
            </div>
            <div className='horizontalBranch' ref={branchRef}></div>
            <div className='verticalBranch'></div>
        </div>
    );
}

export default Header;
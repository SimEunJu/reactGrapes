import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeDepth, setDepth } from '../../store/modules/grape';

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    label{
        color: green;
        font-weight: bold;
    }
    
    input{
        margin: 20px;
        width: 200px;
        height: 20px;
        text-align: center;
        outline: none;
        border: 2px solid green;
    }
    
    button{
        border: 2px solid green;
        color: green;
        background-color: white;
        height: 25px;
        outline: none;
        
        &:hover{
            background-color: green;
            color: white;
        }
    }
`;

/* TODO: useCallback 활용
    1. 이벤트핸들러 함수에는 useCallback을 사용하지 않음 -> 컴포넌트에서 사용중인 1개의 state에만 의존하기 때문
    2. 대신 handleInputVal 함수는 내부적으로 사용하는 state 변수를 외부에서 주입할 수 있기 때문에 파라미터로 받고 useCallback으로 wrap
*/
const DepthInput = () => {

    const inputEl = useRef(null);
    const [depthInputVal, setDepthInputVal] = useState('');
    const {isDepthSet, depth} = useSelector(({grape}) => ({
        isDepthSet: grape.get('isDepthSet'),
        depth: grape.get('depth')
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if(isDepthSet) setDepthInputVal(depth);
    }, []);

    const handleChange = ({target: {value}}) => {
        if(isDepthSet) dispatch(setDepth(false));
        setDepthInputVal(value);
    }
    
    const shouldUpdate = (depthInputVal) => {
        if(depth !== depthInputVal) return true;
        return false;
    }

    const handleInputVal = useCallback((inputVal) => {

        const parsedDepth = Number.parseInt(inputVal.trim(), 10);
        if(Number.isNaN(parsedDepth)){
            alert('올바른 정수를 입력해주세요.');
            inputEl.current.focus();
            return;
        }
        
        if(!shouldUpdate(parsedDepth)) return;
        
        dispatch(changeDepth(parsedDepth));
        dispatch(setDepth(true));

    }, [dispatch]);

    const handlekeyPress = ({key}) => {
        if(key === 'Enter'){
            handleInputVal(depthInputVal);
        }
    }

    return(
        <InputBlock>
            <label>포도송이 높이</label>
            <input 
                name="depth"
                type="text"
                value={depthInputVal} 
                onChange={handleChange}
                onKeyPress={handlekeyPress}
                placeholder='원하는 높이를 입력해 주세요'
                autoFocus={true}
                ref={inputEl}>
            </input>
            <button type="button" onClick={() => handleInputVal(depthInputVal)} >
                입력
            </button>
        </InputBlock> 
    );
    
}

export default DepthInput;
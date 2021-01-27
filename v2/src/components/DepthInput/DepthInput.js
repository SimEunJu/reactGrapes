import React, { useCallback, useState } from 'react';
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

// TODO: useCallback을 어떻게 활용해야 하나...
const DepthInput = () => {

    const [depthInputVal, setDepthInputVal] = useState('');
    const {isDepthSet} = useSelector(({grape}) => {
        return {isDepthSet: grape.get('isDepthSet')}
    });
    const dispatch = useDispatch();

    const handleChange = ({target: {value}}) => {
        if(isDepthSet) dispatch(setDepth(false));
        setDepthInputVal(value);
    }
    
    const handleInputVal = useCallback(() => {

        const parsedDepth = Number.parseInt(depthInputVal.trim(), 10);
        if(Number.isNaN(parsedDepth)){
            alert('올바른 정수를 입력해주세요.');
            return;
        } 
    
        dispatch(changeDepth(parsedDepth));
        dispatch(setDepth(true));

    }, [depthInputVal, dispatch]);

    const handlekeyPress = ({key}) => {
        if(key === 'Enter'){
            handleInputVal();
        }
    }

    return(
        <InputBlock>
            <label>포도 송이 높이</label>
            <input 
                name="depth"
                type="text"
                value={depthInputVal} 
                onChange={handleChange}
                onKeyPress={handlekeyPress}
                placeholder='원하는 높이를 입력해 주세요'>
            </input>
            <button onClick={handleInputVal} >
                입력
            </button>
        </InputBlock> 
    );
    
}

export default DepthInput;
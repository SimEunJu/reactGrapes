import React from 'react';
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const BtnOutLine = styled.div`
    width: 120px;
    height: 120px;
    border: 4px solid purple;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Btn = styled.button`
    margin-top: 0;
    border: 2px solid purple;
    border-radius: 50%;
    background-color: white;
    height: 100px;
    width: 100px;
    text-align: center;
    font-size: 20px;
    color: purple;
    font-weight: bold;
    outline: none;
    ${props => props.ready &&
        css`
            background-color: 'purple';
            color: 'white';
        `    
    }    
`;

const BtnBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${props => props.ready? 'all 1s ease-out 0.3s' : ''};
    visibility: ${props => props.ready? '' : 'hidden'};
    transform: ${props => props.ready? 'translateX(0)' : 'translateX(-10vw)'};   
`;


const StartBtn = ({ history }) => {
    const {isDepthSet, gno} = useSelector(({grape}) => ({
        isDepthSet: grape.get('isDepthSet'),
        gno: grape.get('gno')
    }));
    
    const handleClick = () => {
        if(!isDepthSet) return false;
        history.push(`/grapes/${gno}`);
    }
    
    return (
        <BtnBlock ready={isDepthSet}>
            <BtnOutLine>
                <Btn 
                    ready={isDepthSet}
                    onClick={handleClick} >
                    시작하기
                </Btn>
            </BtnOutLine>
        </BtnBlock>)
}

export default withRouter(StartBtn);
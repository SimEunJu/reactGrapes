import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Btn = styled.div`
    width: 50px;
    height: 55px;
    background-color: lightblue;
    border-radius: 50%;
    position: fixed;
    left: calc(100vw - 100px);
    top: 108px;
    &:before, &:after{
        content: '';
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: lightblue;
        position: absolute;
        top: 5px;
    }
    &:before{
        left: -25px;
    }
    &:after{
        left: 35px;
    }
`;

const ShowcaseBtn = ({handleClick}) => (
    <Link to='/setting'>
        <Btn onClick={handleClick}><span style={{position: 'fixed', zIndex: '7', lineHeight: '50px'}}>진열장으로</span></Btn>
    </Link>
);

export default ShowcaseBtn;
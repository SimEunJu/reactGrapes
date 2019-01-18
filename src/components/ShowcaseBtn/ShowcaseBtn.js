import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Btn = styled.div`
    width: 80px;
    height: 50px;
    border: 5px solid lightblue;
    border-radius: 7px;
    position: fixed;
    left: calc(100vw - 120px);
    top: 108px;
    pointer: cursor;
`;

const ShowcaseBtn = ({handleClick}) => (
    <Link to='/setting'>
        <Btn onClick={handleClick}>진열장으로 이동</Btn>
    </Link>
);

export default ShowcaseBtn;
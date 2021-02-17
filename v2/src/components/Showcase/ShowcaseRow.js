import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router';
import MiniJuice from './MiniJuice';

const RowWrap = styled.div`
    display: flex;
    position: relative;
    
    &:before{
        content: '';
        position: absolute;
        background-color: rgba(0,0,0,0.1);
        width: 100%;
        height: 100%;
        z-index: 5;
    }

    &:hover:before{
        width: 50px;
    }
`;
const Bar = styled.div`
    width: 100%;
    height: 10px;
    background-color: burlywood;
`;

const Comment = styled.div`
    padding-left: 5%;
    height: inherit;
    display: flex;
    width: 100%;
    align-items: center;
`;
const RowContainer = styled.div`
    position: relative;
`;
const Padding = styled.div`
    width: 50px;
    height: inherit;
`;

const ShowcaseRow = ({history, rgba, title, id}) => {
    
    const handleClick = () => {
        history.push(`/grapes/${id}`);
    }

    //const {rgba, title, _id:id, regdate} = this.props.grapes;
    return(
        <RowContainer>
            <RowWrap>
                <Padding />
                <MiniJuice rgba={rgba} handleClick={handleClick}/> 
                <Comment>{title}</Comment>
            </RowWrap>
            <Bar />
        </RowContainer>
    );
}

export default withRouter(ShowcaseRow);
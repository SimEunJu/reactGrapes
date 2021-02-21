import React from 'react'; 
import styled from 'styled-components';
import {withRouter} from 'react-router';
import MiniJuice from '../MiniJuice';

const RowWrap = styled.div`
    display: flex;
    position: relative;
    
    &:before{
        content: '';
        position: absolute;
        background-color: rgba(0,0,0,0.1);
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    &:hover:before{
        width: 0%;
    }
`;
const Bar = styled.div`
    width: 100%;
    height: 10px;
    background-color: burlywood;
`;

const Comment = styled.div`
    padding: 20px 30px;
`;
const RowContainer = styled.div`
    position: relative;
`;

const ShowcaseRow = ({history, grapes : {rgba, title, id} }) => {
   
    const handleClick = () => {
        history.push(`/grapes/${id}`);
    }

    return(
        <RowContainer>
            <RowWrap>
                <MiniJuice rgba={rgba} handleClick={handleClick}/> 
                <Comment>{title}</Comment>
            </RowWrap>
            <Bar />
        </RowContainer>
    );
}

export default withRouter(ShowcaseRow);
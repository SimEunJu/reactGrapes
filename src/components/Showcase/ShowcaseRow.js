import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import MiniJuice from './MiniJuice';

const RowWrap = styled.div`
    opacity: 0.7;
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
    width: calc(100% - 250px);
    height: inherit;
`;
const RowContainer = styled.div`
    position: relative;
`;
const Padding = styled.div`
    width: 50px;
    height: inherit;
`;

class ShowcaseRow extends Component{
  
    render(){
        const {rgba, title} = this.props;
        return(
            <Fragment>
                <RowContainer>
                    <RowWrap>
                        <Padding />
                        <MiniJuice rgba={rgba}/> 
                        <Comment>{title}</Comment>
                    </RowWrap>
                    <Bar />
                </RowContainer>
            </Fragment>
        );
    }
}

export default ShowcaseRow;
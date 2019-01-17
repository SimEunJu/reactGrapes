import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import * as grapeAcions from '../../store/modules/grape';
import styled from 'styled-components';
import HeightInfo from '../HeightInfo';

import UserInput from '../UserInput';

const EntryContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
`;
const BtnWrap = styled.div`
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
    ${props => props.ready}
`;
const BtnArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s ease-out 0.3s;
    visibility: ${p => p.ready? '' : 'hidden'};
    transform: ${p => p.ready? 'translateX(0)' : 'translateX(-10vw)'};
`;

class Entry extends Component{
    state = {
        ready: false,
        depth: 0
    }

    BTN_STYLE = 'background-color: purple; color: white;';
    REGEX = /\d+/g;

    handleChildClick = (depth) => {
        if(!this.REGEX.test(depth)){
            alert('올바른 정수를 입력해주세요.');
            return;
        } 
        this.setState({ready: true, depth});
    }
    
    handleDepthAction = () =>{
        const {UserInputAction}= this.props;
        UserInputAction.changeDepth(this.state.depth);
    }

    handleClick = () => {
        if(!this.state.ready) return false;
        this.handleDepthAction();
    }
    
    handleKeyPress = (e) => {
        if(!this.state.ready) return false;
        if(e.key === 'Enter'){
           this.handleDepthAction();
        }
    }
    
    render(){
        const {handleClick, handleKeyPress, handleChildClick} = this;
        const {ready, depth} = this.state;
        return(
        <EntryContent>
            <UserInput handleClick={handleChildClick}/>
            <HeightInfo depth={ready && depth} />
            <BtnArea ready={ready}>
                <BtnWrap>
                    <Link to={ready? '/grape' : ''}>
                        <Btn 
                            ready={ready? this.BTN_STYLE : ''}
                            onClick={handleClick} 
                            onKeyPress={handleKeyPress}>
                            시작하기
                        </Btn>
                    </Link>
                </BtnWrap>
            </BtnArea>
        </EntryContent>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        UserInputAction: bindActionCreators(grapeAcions, dispatch)
    })
)(Entry);
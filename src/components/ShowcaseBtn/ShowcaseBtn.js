import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {withRouter} from 'react-router-dom';

const OpenAni = keyframes`
    0% { transform: skewY(8deg);}
    100% { transform: rotateY(150deg) skewY(8deg);}
`;

const CloseAni = keyframes`
    0% {transform: skewY(8deg);}
    100% { transform: rotateY(-150deg) skewY(8deg); }
`;

const Btn = styled.div`
    width: 60px;
    height: 65px;
    background-color: white;
    border-radius: 5%;
    border: 3px solid lightblue;
    position: fixed;
    left: calc(100vw - 108px);
    top: 108px;
    text-align: center;
    line-height: 65px;
`;

const Door = styled.div`
    width: 60px;
    height: 65px;
    background-color: white;
    border-radius: 5%;
    border: 3px solid lightblue;
    border-left: none;
    position: fixed;
    z-index: 10;
    left: calc(100vw - 108px);
    top: 108px;
    text-align: center;
    line-height: 65px;
    transform-origin: left;
    transform: skewY(8deg);
    animation: ${p => p.isOpen === true? OpenAni : ''} 1s ease-in-out forwards;
    animation: ${p => p.isOpen === false? CloseAni : ''} 1s ease-in-out forward;
`;

class ShowcaseBtn extends Component{
    state = {isOpen : null};

    handleMouseEnter = () => {
        this.setState({isOpen : true});   
    }

    handleMouseLeave = () => {
        this.setState({isOpen : false});    
    }

    handleClick = () => {
        this.props.history.push('/setting');
    }

    render(){

        //if(this.props.savedJuice ===  true && this.state.isOpen === false) this.handleMouseEnter();
        return(
            <div>
            <Door onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} isOpen={this.state.isOpen}/>
            <Btn onClick={this.handleClick}>진열장</Btn>
            </div>
        );
    }
}
  
export default withRouter(ShowcaseBtn);
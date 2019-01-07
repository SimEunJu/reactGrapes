import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";
import './Grape.scss';

class Grape extends Component{
    reference;
    state = {
        height: '',
        width: ''
    }

    getRandRatio = () => {
        let num;
        while(true){
            num = Math.random();
            if(num > 0.5) return num;
        }
    } 
    getDropHeight = () => {
        const y = this.reference.offsetTop;
        const dist = document.body.clientHeight - y;
        return dist;
    }
    getDropWidth = () => {
        const {depth} = this.props;
        const size = Math.floor(window.innerHeight/depth);
        const x = this.reference.offsetLeft;
        const dist = document.body.clientWidth/2 - x - size/2;
        return dist;
    }
    componentDidMount(){
        this.setState({
            height: this.getDropHeight(),
            width: this.getDropWidth()
        });
    }
    render(){
        const {handleClick, offset, depth, color='green', isJuice} = this.props;
        const size = Math.floor(window.innerHeight/depth);
        let DropAni;
        if(isJuice){
            DropAni = keyframes`
            0% {
                transform : translateY(0) translateX(0);
            }
            100% {
                transform : translateY(${this.state.height}px) translateX(${this.state.width}px); 
                background-color: white;
            }
        `;
        }
        const Drop = styled.div`
            animation: ${DropAni} ${3*this.getRandRatio()}s ease 1 forwards;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 100%;
            cursor: pointer;
        `;

       return (
           <Drop
                ref={ref => this.reference=ref}
                onClick={()=> handleClick(offset)}
                className='grape'>
           </Drop>
       );
    }
}
export default Grape;
import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";
import './Grape.scss';
import checkedImg from '../../img/checked.png';
import pencilImg from '../../img/pencil.png';

const Btn = styled.div`
    width: 40px;
    border: 0.5px solid white;
    margin: 2px;
    border-radius: 2px;
    text-align: center;
    color: white;
`;

class Grape extends Component{
    reference;
    state = {
        height: '',
        width: '',
        visibility: 'hidden'
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
    handleMouseOver = () => {
        this.setState({...this.state, visibility: ''});
    }
    handleMouseOut = () => {
        this.setState({...this.state, visibility: 'hidden'});
    }
    render(){
        const {handleClick, offset, depth, color, isJuice, savedJuice} = this.props;
        
        if(savedJuice) return <div></div>;

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
            margin: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        `;

       return (
           <Drop onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
                ref={ref => this.reference=ref}>
                <div style={{visibility: this.state.visibility}}>
                    <img src={pencilImg} onClick={this.props.handleModalOpen}></img>
                    <img src={checkedImg} onClick={()=> handleClick(offset)}></img>
                </div>
           </Drop>
       );
    }
}
export default Grape;
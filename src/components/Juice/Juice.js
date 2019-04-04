import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';

const JuiceAni = keyframes`
    0% { transform: translateY(-70vh) rotate(0); }
    18.75% { transform: translateY(-75vh) rotate(30deg); }
    37.5% { transform: translateY(-70vh) rotate(0); }
    75% { transform: translateY(-75vh) rotate(-30deg); }
    100% { transform: translateY(-70vh) rotate(0); }
`;
const CapAni = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(15px); }
`;
const SaveAni = keyframes`
    0% { transform: translateY(-70vh) scale(1); }
    100% { transform: translateY(-70vh) scale(0); }
`;
const BottleEnter = styled.div`
    border-radius: 3px;
    margin: auto;
    position: relative;
    border: 2px solid black;
    width: 48px;
    height: 17px;
    background-color: white;
`;
const BottleNeck = styled.div`
    border: 2px solid black;
    position: relative;
    border-bottom: 0px solid white;
    margin: auto;
    border-top: none;
    width: 31px;
    height: 19px;
    background-color: white;
    z-index: 5;
`;
const BottleBody = styled.div`
    border: 2px solid black;
    width: 86px;
    position: absolute;
    height: 110px;
    left: 56px;
    top: 35px;
    border-top-left-radius: 45px;
    border-top-right-radius: 45px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    margin: auto;
`;
const Liquid = styled.div`
    background-color: ${props => props.rgba};
    width: 100%;
    height: 70%;
    position: relative;
    top: 30%;
`;
const BottleWrap = styled.div`
    position: relative;
    margin: auto;
    width: 200px;
    height: 150px;
    animation: ${JuiceAni} 1.5s ease-in-out 1s 1 forwards, ${SaveAni} 1s ease-in-out 4s 1 forwards;
`;
const Cap = styled.div`
    position: absolute;
    left: 85px;
    top: -25px;
    background-color: brown;
    z-index: -1;
    border-radius: 7px;
    width: 30px;
    height: 30px;
    animation: ${CapAni} 0.5s ease-in 3s 1 forwards;
`;
class Juice extends Component {
    aniCnt = 0;
    handleAniEnd = () => {
        const {saveJuice} = this.props;
        if(++this.aniCnt === 2){
            saveJuice();
            this.aniCnt = 0;
        }
    }
    render(){
        const {rgba, isJuice} = this.props;
        if(!isJuice) return <div />;
        return(
            <BottleWrap onAnimationEnd={this.handleAniEnd}>
                <Cap onAnimationEnd={e => e.stopPropagation()}/>
                <BottleEnter />
                <BottleNeck />
                <BottleBody>
                    <Liquid rgba={rgba}/>
                </BottleBody>
            </BottleWrap>
        );
    }
}

export default Juice;
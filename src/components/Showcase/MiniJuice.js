import React, {Component} from 'react';
import styled from 'styled-components';

const BottleEnter = styled.div`
    border-radius: 3px;
    margin: auto;
    border: 2px solid black;
    width: 45px;
    height: 17px;
    position: relative;
    top: -8px;
    background-color: white;
}
`;
const BottleNeck = styled.div`
    border: 2px solid black;
    border-bottom: 0px solid white;
    margin: auto;
    position: relative;
    border-top: none;
    width: 29px;
    height: 19px;
    top: -8px;
    background-color: white;
    z-index: 1;
`;
const BottleBody = styled.div`
    border: 2px solid black;
    position: relative;
    top: -13px;
    width: 70px;
    height: 90px;
    margin: auto;
    border-top-left-radius: 45px;
    border-top-right-radius: 45px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;
const Liquid = styled.div`
    position: relative;
    top: 30%;
    height: 70%;
    background-color: ${p => p.rgba};
`;
const BottleWrap = styled.div`
    position: relative;
    width: 100px;
    height: 150px;
    &:before{
        content: '';
        poition: absolute;
        background-color: rgba(0,0,128,0.1);
        width: 100px;
        heigth: 100px;
    }
`;
const Cap = styled.div`
    margin: auto;
    position: relative;
    top: 10px;
    background-color: brown;
    border-radius: 7px;
    width: 30px;
    height: 30px;
    z-index: -1;
`;

class MiniJuice extends Component{
    render(){
        return(
            <BottleWrap>
                <Cap/>
                <BottleEnter />
                <BottleNeck />
                <BottleBody>
                    <Liquid rgba={this.props.rgba}/>
                </BottleBody>
            </BottleWrap>
        );
    }
}

export default MiniJuice;
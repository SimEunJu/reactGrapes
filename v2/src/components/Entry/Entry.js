import React, { useState } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeAcions from '../../store/modules/grape';
import { EntryContent, Btn, BtnWrap, BtnArea  } from "./styled";
import HeightInfo from '../HeightInfo';
import UserInput from '../UserInput';

const btnReadyStyle = { 
    backgroundColor: 'purple',
    color: 'white'
};

const Entry = (props) => {
    const [isDepthSet, setIsDepthSet] = useState(false);
    const [depth, setDepth] = useState(0);
    
    const handleChildClick = (depth) => {

        const parsedDepth = Number.parseInt(depth.trim(), 10);
        if(Number.isNaN(parsedDepth)){
            alert('올바른 정수를 입력해주세요.');
            return;
        } 

        setIsDepthSet(true);
        setDepth(depth);
    }

    const handleChildChange = () => {
        setIsDepthSet(false);
    }

    const handleDepthAction = () =>{
        const {GrapeActions}= props;
        GrapeActions.changeDepth(depth);
    }

    const handlekeyPress = (e) => {
        if(e.key === 'Enter'){
            if(!isDepthSet) return false;
            handleDepthAction();
        }
    }

    const handleClick = () => {
        if(!isDepthSet) return false;
        handleDepthAction();
    }
    
    props.GrapeActions.setJuice({isJuice: false});
        
    if(props.gno !== null) window.location.href = "/grapes/"+props.gno;
    
    return (
        <EntryContent>
            <UserInput handlekeyPress={handlekeyPress} handleClick={handleChildClick} handleChange={handleChildChange}/>
            <HeightInfo depth={isDepthSet && depth} />
            <BtnArea ready={isDepthSet}>
                <BtnWrap>
                    <Btn 
                        style={isDepthSet ? btnReadyStyle : {}}
                        onClick={handleClick} >
                        시작하기
                    </Btn>
                </BtnWrap>
            </BtnArea>
        </EntryContent>
    );
}

export default connect(
    (state) => ({
        gno: state.grape.get('gno')
    }),
    (dispatch) => ({
        GrapeActions: bindActionCreators(grapeAcions, dispatch)
    })
)(Entry);
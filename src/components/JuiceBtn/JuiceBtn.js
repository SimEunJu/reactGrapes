import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../../store/modules/grape';
import './JuiceBtn.scss';

class JuiceBtn extends Component{
    handleClick = () =>{
        const {isJuice, GrapeActions} = this.props;
        if(isJuice) return;
        GrapeActions.makingJuice();
    }
    render(){
        return(
            <svg className='juiceBtnWrap' width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
                <circle onClick={this.handleClick} className='juiceBtn' cx='50' cy='50' fill='gold' r='30'></circle>
                <text onClick={this.handleClick} x='35' y='45'>주스</text>
                <text onClick={this.handleClick} x='25' y='65'>만들기</text>
            </svg>
        );
        
    }
}

export default connect(
    (state) => ({
        isJuice: state.grape.get('isJuice')
    }),
    (dispatch) => ({
        GrapeActions: bindActionCreators(grapeActions, dispatch)
    })
)(JuiceBtn);
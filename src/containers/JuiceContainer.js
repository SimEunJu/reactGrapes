import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Juice from '../components/Juice';
import * as grapeActions from '../store/modules/grape';

class JuiceContainer extends Component{
    getJuiceColor = () =>{
        const {green, purple} = this.props.juiceRatio;
        const totalCnt = green + purple;
        const gRatio = green/totalCnt;
        const pRatio = purple/totalCnt;
        const rgba = `rgba(${128*pRatio},${128*gRatio},0,1)`;
        return rgba;
    }
    
    saveJuice = (e) =>{
        const {GrapeActions} = this.props;
        GrapeActions.saveJuice();
        GrapeActions.setRgba(this.getJuiceColor());
        alert('주스가 저장되었습니다. 보관함에서 확인가능합니다.');
    }
    render(){
        return(
            <Juice
                saveJuice={this.saveJuice} 
                isJuice={this.props.isJuice} 
                rgba={this.getJuiceColor()}/>
        );
    }
}

export default connect(
    (state) => ({
        juiceRatio: state.grape.get('juiceRatio'),
        isJuice: state.grape.get('isJuice'),
        savedJuice: state.grape.get('savedJuice'),
    }),
    (dispatch) => ({
        GrapeActions: bindActionCreators(grapeActions, dispatch)
    })
)(JuiceContainer);
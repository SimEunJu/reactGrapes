import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Juice from '../components/Juice';
import * as grapeActions from '../store/modules/grape';

class JuiceContainer extends Component{
    getJuiceColor = () =>{
        const {green, purple} = this.props.juiceRatio;
        const totalCnt = green + purple;
        const pRatio = purple/totalCnt*0.6+0.4;
        const rgba = `rgba(179,32,82,${1*pRatio})`;
        return rgba;
    }
    
    saveJuice = (e) =>{
        const {GrapeActions} = this.props;
        GrapeActions.saveJuice();
        GrapeActions.setRgba({'rgba': this.getJuiceColor()});
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
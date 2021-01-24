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
        const {GrapeActions, gno} = this.props;
        GrapeActions.saveJuice();
        GrapeActions.setRgba({'rgba': this.getJuiceColor(), gno});
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
        gno: state.grape.get('gno'),
        juiceRatio: state.grape.get('juiceRatio'),
        isJuice: state.grape.get('isJuiceMaking'),
        savedJuice: state.grape.get('isJuiceSaved'),
    }),
    (dispatch) => ({
        GrapeActions: bindActionCreators(grapeActions, dispatch)
    })
)(JuiceContainer);
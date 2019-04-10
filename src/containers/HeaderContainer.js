import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';
import Header from '../components/Header';

class HeaderContainer extends Component{
    setTitle = (title) => {
        this.props.GrapeAction.setTitle(title);
    }
    render(){
        return(
            <Header setTitle={this.setTitle} savedJuice={this.props.savedJuice}/>
        );
    }
}
export default connect(
    (state) => ({
        savedJuice: state.grape.get('isJuiceSaved')
    }),
    (dispatch) => ({
        GrapeAction: bindActionCreators(grapeActions, dispatch)
    })
)(HeaderContainer);
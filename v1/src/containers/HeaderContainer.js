import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';
import Header from '../components/Header';

class HeaderContainer extends Component{
    setTitle = (title) => {
        const {gno} = this.props;
        this.props.GrapeAction.setTitle({gno, title});
    }
    render(){
        const {savedJuice, title} = this.props;
        return(
            <Header title={title} setTitle={this.setTitle} savedJuice={savedJuice}/>
        );
    }
}
export default connect(
    (state) => ({
        gno: state.grape.get('gno'),
        title: state.grape.get('title'),
        savedJuice: state.grape.get('isJuiceSaved')
    }),
    (dispatch) => ({
        GrapeAction: bindActionCreators(grapeActions, dispatch)
    })
)(HeaderContainer);
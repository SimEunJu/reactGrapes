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
            <Header setTitle={this.setTitle}/>
        );
    }
}
export default connect(
    null,
    (dispatch) => ({
        GrapeAction: bindActionCreators(grapeActions, dispatch)
    })
)(HeaderContainer);
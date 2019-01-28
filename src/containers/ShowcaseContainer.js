import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Showcase from '../components/Showcase';
import * as grapeActions from '../store/modules/grape';

class ShowcaseContainer extends Component{
    render(){
        this.props.GrapeActions.setJuice({isJuice: false});
        const {rgba, title} = this.props;
        console.log(rgba);
        return(
            <Showcase rgba={rgba} title={title}/>
        );
    }
}

export default connect(
    (state) => ({
        rgba: state.grape.get('rgba'),
        title: state.grape.get('title'),
    }),
    (dispatch) => ({
        GrapeActions: bindActionCreators(grapeActions, dispatch)
    })
)(ShowcaseContainer);
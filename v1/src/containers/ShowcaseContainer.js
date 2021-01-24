import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Showcase from '../components/Showcase';
import * as grapeActions from '../store/modules/grape';

class ShowcaseContainer extends Component{
    constructor(props){
        super(props);
        this.props.GrapeActions.getShowcase();
    }
    render(){
        const {loading, showcase} = this.props;
        if(loading) return <div></div>;
        this.props.GrapeActions.setJuice({isJuice: false});
        return(
            <Showcase showcase={showcase}/>
        );
    }
}

export default connect(
    (state) => ({
        rgba: state.grape.get('rgba'),
        title: state.grape.get('title'),
        showcase: state.grape.get('showcase'),
        loading: state.pender.pending['grape/GET_SHOWCASE']
    }),
    (dispatch) => ({
        GrapeActions: bindActionCreators(grapeActions, dispatch)
    })
)(ShowcaseContainer);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Showcase from '../components/Showcase';

class ShowcaseContainer extends Component{
    render(){
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
    null
)(ShowcaseContainer);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';
import GrapeWrapper from '../components/GrapeWrapper';

class GrapeWrapperContainer extends Component {
    state = {
        isSunRotate: false
    };
    handleClick = (offset) => {
        const {GrapeActions, color} = this.props;
        if(color[offset] === 'green'){
            GrapeActions.changeColor({'offset': offset, 'color':'purple'});
            this.setState({isSunRotate: true})
        }
        else{
            GrapeActions.changeColor({'offset': offset, 'color':'green'});
            this.setState({isSunRotate: false})
        } 
       
    }
    render(){
        const {depth, color, isJuice} = this.props;
        return(
            <GrapeWrapper 
                depth={depth} 
                color={color} 
                handleClick={this.handleClick}
                isJuice={isJuice}
                isSunRotate={this.state.isSunRotate}
                />
        );
    }
}

export default connect(
    (state) => ({
        depth: state.grape.get('depth'),
        color: state.grape.get('color'),
        isJuice: state.grape.get('isJuice')
    }),
    (dispatch) => ({
        GrapeActions : bindActionCreators(grapeActions, dispatch)
    })
)(GrapeWrapperContainer); 
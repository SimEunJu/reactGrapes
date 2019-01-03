import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';
import GrapeWrapper from '../components/GrapeWrapper';

class GrapeWrapperContainer extends Component {
    handleClick = (offset) => {
        const {GrapeActions, color} = this.props;
        if(color[offset] === 'green') GrapeActions.changeColor({'offset': offset, 'color':'purple'});
        else GrapeActions.changeColor({'offset': offset, 'color':'green'});
        
    }
    render(){
        const {depth, color} = this.props;
        return(
            <GrapeWrapper 
                depth={depth} 
                color={color} 
                handleClick={this.handleClick}/>
        );
    }
}

export default connect(
    (state) => ({
        depth: state.grape.get('depth'),
        color: state.grape.get('color')
    }),
    (dispatch) => ({
        GrapeActions : bindActionCreators(grapeActions, dispatch)
    })
)(GrapeWrapperContainer); 
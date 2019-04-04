import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';

import GrapeWrapper from '../components/GrapeWrapper';
import Modal from '../components/Modal';
import {GREEN, PURPLE} from '../common/Color';

class GrapeWrapperContainer extends Component {
    state = {
        isSunRotate: false
    };
    handleClick = (offset) => {
        const {GrapeActions, color} = this.props;
        if(color[offset] === GREEN){
            GrapeActions.changeColor({'offset': offset, 'color':PURPLE});
            this.setState({isSunRotate: true})
        }
        else{
            GrapeActions.changeColor({'offset': offset, 'color':PURPLE});
            this.setState({isSunRotate: false})
        } 
       
    }
    handleModalOpen = () => {
        this.props.GrapeActions.showModal({'modal': true});
    }
    handleModalClose = () => {
        this.props.GrapeActions.showModal({'modal': false});
    }
    render(){
        const {depth, color, isJuice, modal, savedJuice} = this.props;
        return(
            <Fragment>
                {modal && <Modal handleModalClose={this.handleModalClose}/>}
                <GrapeWrapper 
                    handleModalOpen={this.handleModalOpen}
                    depth={depth} 
                    color={color} 
                    handleClick={this.handleClick}
                    isJuice={isJuice}
                    savedJuice={savedJuice}
                    isSunRotate={this.state.isSunRotate}
                    />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        depth: state.grape.get('depth'),
        color: state.grape.get('color'),
        isJuice: state.grape.get('isJuice'),
        savedJuice: state.grape.get('savedJuice'),
        modal: state.grape.get('modal')
    }),
    (dispatch) => ({
        GrapeActions : bindActionCreators(grapeActions, dispatch)
    })
)(GrapeWrapperContainer); 
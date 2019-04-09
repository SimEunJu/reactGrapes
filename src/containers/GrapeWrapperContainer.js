import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';

import GrapeWrapper from '../components/GrapeWrapper';
import Modal from '../components/Modal';
import {GREEN, PURPLE} from '../common/Color';

class GrapeWrapperContainer extends Component {
    constructor(props){
        super(props);
        const gno = window.location.href.match(/.*\/grapes\/(\w+)$/);
        props.GrapeActions.getGrapesStatus(gno);
    }
    state = {
        isSunRotate: false, 
        offset: null,
    };
    handleClick = (offset) => {
        const {GrapeActions, color} = this.props;
        if(color[offset] === GREEN){
            GrapeActions.changeColor({'offset': offset, 'color':PURPLE});
            this.setState({isSunRotate: true})
        }
        else{
            GrapeActions.changeColor({'offset': offset, 'color':GREEN});
            this.setState({isSunRotate: false})
        } 
       
    }
    handleModalOpen = (offset) => {
        this.setState({...this.state, offset});
        this.props.GrapeActions.showModal({'modal': true});
    }
    handleModalClose = () => {
        this.props.GrapeActions.showModal({'modal': false});
    }
    handleGrapeContent = ({title, content}) => {
        this.props.GrapeActions.changeGrapeContent({offset: this.state('offset'), title, content});
    }
    render(){
        const {depth, grape, isJuice, modal, savedJuice} = this.props;
        return(
            <Fragment>
                {modal && <Modal handleModalClose={this.handleModalClose}/>}
                <GrapeWrapper 
                    handleModalOpen={this.handleModalOpen}
                    handleGrapeContent={this.handleGrapeContent}
                    depth={depth} 
                    grape={grape} 
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
        grape: state.grape.get('grape'),
        isJuice: state.grape.get('isJuice'),
        savedJuice: state.grape.get('savedJuice'),
        modal: state.grape.get('modal')
    }),
    (dispatch) => ({
        GrapeActions : bindActionCreators(grapeActions, dispatch)
    })
)(GrapeWrapperContainer); 
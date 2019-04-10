import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeActions from '../store/modules/grape';

import GrapeWrapper from '../components/GrapeWrapper';
import Modal from '../components/Modal';

class GrapeWrapperContainer extends Component {
    constructor(prop){
        super(prop);
        const gno = window.location.href.match(/.*\/grapes\/(\w+)$/)[1];
        this.props.GrapeActions.getGrapesStatus(gno);
    }
    state = {
        isSunRotate: false, 
        offset: null,
    };

    handleClick = (offset) => {
        const {GrapeActions, grape, gno} = this.props;
        if(grape[offset].isChecked ===  false){
            GrapeActions.changeColor({gno, 'idx': offset, 'isChecked': true});
            this.setState({isSunRotate: true})
        }
        else{
            GrapeActions.changeColor({gno, 'idx': offset, 'isChecked': false});
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
        this.props.GrapeActions.changeGrapeContent({gno: this.props.gno, idx: this.state('offset'), title, content});
    }
    render(){
        const {depth, grape, isJuice, modal, savedJuice, loading} = this.props;
        if(loading) return;
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
        gno: state.grape.get('gno'),
        loading: state.pender.pending['grape/GET_GRAPES_STATUS'],
        depth: state.grape.get('depth'),
        grape: state.grape.get('grape'),
        isJuice: state.grape.get('isJuiceMaking'),
        savedJuice: state.grape.get('isJuiceSaved'),
        modal: state.grape.get('modal')
    }),
    (dispatch) => ({
        GrapeActions : bindActionCreators(grapeActions, dispatch)
    })
)(GrapeWrapperContainer); 
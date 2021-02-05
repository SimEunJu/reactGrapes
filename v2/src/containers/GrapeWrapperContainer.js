import React, {Fragment, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeColor, showModal, changeGrapeContent} 
    from '../store/modules/grape';

import GrapeWrapper from '../components/Grapes';
import Modal from '../components/Modal';
import Sun from '../components/Sun';

// TODO: 전역이냐, 부모 상태냐 그것이 문제로다..
// TODO: atomic 상태관리 도입해야...
const GrapeWrapperContainer = () => {

    const {gno, setContentSuc, grape, isModalOpen} = useSelector(({grape, pender}) => ({
        gno: grape.get('gno'),
        setContentSuc: pender.success['grape/CHANGE_GRAPE_CONTET'],
        grape: grape.get('grape'),
        isModalOpen: grape.get('modal')
    }));
    const dispatch = useDispatch();

    const [isSunRotate, setSunRotate] = useState(false);
    const [editGrapeIdx, setEditGrapeIdx] = useState(null);

    const changeGrapeChecked = useCallback((grapeIdx) => {
        
        let isChecked = false;
        if(!grape[grapeIdx].isChecked) isChecked = true;
        
        dispatch(changeColor({gno, idx: grapeIdx, isChecked}));
        dispatch(setSunRotate(isChecked));
    }, [grape, dispatch]);

    const openModal = useCallback((editGrapeIdx) => {
        setEditGrapeIdx(editGrapeIdx);
        dispatch(showModal({'modal': true}));
    }, [dispatch]);

    const closeModal = useCallback(() => {
        dispatch(showModal({'modal': false}));
    }, [dispatch]);

    const editGrapeContent = useCallback(({title, content}) => {
        dispatch(changeGrapeContent({gno, idx: editGrapeIdx, title, content}));
    }, [dispatch]);

    return(
        <Fragment>
            <Sun isSunRotate={isSunRotate}/>
            {isModalOpen && 
                <Modal 
                    grapeContent={grape[editGrapeIdx]} 
                    setContentSuc={setContentSuc} 
                    handleGrapeContent={editGrapeContent} 
                    handleModalClose={closeModal}/>
            }
            <GrapeWrapper 
                openModal={openModal}
                changeGrapeChecked={changeGrapeChecked}
                />
        </Fragment>
    );
    
}

export default withRouter(GrapeWrapperContainer);
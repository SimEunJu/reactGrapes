import React, {Fragment, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeColor, showModal, changeGrapeContent, hideModal} 
    from '../store/modules/grape';

import Grapes from '../components/Grapes';
import Modal from '../components/Modal';
import Sun from '../components/Sun';

// TODO: 전역이냐, 부모 상태냐 그것이 문제로다..
// TODO: atomic 상태관리 도입해야...
const GrapeWrapperContainer = () => {

    const {gno, isContentChangeSuccess, grapes, isModalOpen} = useSelector(({grape, loading}) => ({
        gno: grape.gno,
        isContentChangeSuccess: loading.changeGrapeContent,
        grapes: grape.grape,
        isModalOpen: grape.modal
    }));
    const dispatch = useDispatch();

    const [isSunRotate, setSunRotate] = useState(false);
    const [editGrapeIdx, setEditGrapeIdx] = useState(null);

    // TODO: useCallback에 파라미터 있는 함수 넘겨줄 수 없는데 해결방안 생각해보기
    const changeGrapeChecked = (grapeIdx, grapeSeq) => {
        
        let isChecked = false;
        if(!grapes[grapeSeq].isChecked) isChecked = true;
        
        dispatch(changeColor({gno, idx: grapeIdx, isChecked}));
        setSunRotate(isChecked);
    };

    const openModal = (editGrapeIdx) => {
        setEditGrapeIdx(editGrapeIdx);
        dispatch(showModal({gno, idx: editGrapeIdx}));
    };

    const closeModal = useCallback(() => {
        dispatch(hideModal());
    }, [dispatch]);

    const editGrapeContent = ({title, content}) => {
        dispatch(changeGrapeContent({gno, idx: editGrapeIdx, title, content}));
    };

    return(
        <Fragment>
            <Sun isSunRotate={isSunRotate}/>
            {isModalOpen && 
                <Modal 
                    isContentChangeSuccess={isContentChangeSuccess} 
                    editGrapeContent={editGrapeContent} 
                    closeModal={closeModal}/>
            }
            <Grapes 
                openModal={openModal}
                changeGrapeChecked={changeGrapeChecked}
                />
        </Fragment>
    );
    
}

export default withRouter(GrapeWrapperContainer);
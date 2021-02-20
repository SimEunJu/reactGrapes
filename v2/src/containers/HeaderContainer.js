import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTitle} from '../store/modules/grape';
import Header from '../components/Header';

const HeaderContainer = () => {

    const {gno, title, isJuiceSaving} = useSelector(({grape}) => ({
        gno: grape.gno,
        title: grape.title,
        isJuiceSaving: grape.isJuiceSaving
    }));
    const dispatch = useDispatch();

    const changeTitle = (titleNext) => {
        titleNext = titleNext.trim();
        if(title !== titleNext) dispatch(setTitle({gno, title: titleNext}));
    }

    return(
        <Header title={title} changeTitle={changeTitle} isJuiceSaving={isJuiceSaving}/>
    );
}

export default HeaderContainer;
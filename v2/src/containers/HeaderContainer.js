import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTitle} from '../store/modules/grape';
import Header from '../components/Header';

const HeaderContainer = () => {

    const {gno, title, isJuiceSaving} = useSelector(({grape}) => ({
        gno: grape.get('gno'),
        title: grape.get('title'),
        isJuiceSaving: grape.get('isJuiceSaving')
    }));
    const dispatch = useDispatch();

    const changeTitle = (title) => {
        dispatch(setTitle({gno, title}));
    }

    return(
        <Header title={title} changeTitle={changeTitle} isJuiceSaving={isJuiceSaving}/>
    );
}

export default HeaderContainer;
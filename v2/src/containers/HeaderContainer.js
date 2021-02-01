import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTitle} from '../store/modules/grape';
import Header from '../components/Header';

const HeaderContainer = () => {

    const {gno, title, isJuiceSaved} = useSelector(({grape}) => ({
        gno: grape.get('gno'),
        title: grape.get('title'),
        isJuiceSaved: grape.get('isJuiceSaved')
    }));
    const dispatch = useDispatch();

    const changeTitle = (title) => {
        dispatch(setTitle({gno, title}));
    }

    return(
        <Header title={title} changeTitle={changeTitle} isJuiceSaved={isJuiceSaved}/>
    );
}

export default HeaderContainer;
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import JuiceBtn from '../JuiceBtn';
import ShowcaseBtn from '../ShowcaseBtn';

const JuiceBtnContainer = () => {
    
    const {isJuiceSaved} = useSelector(({grape}) => ({
        isJuiceSaved: grape.get('isJuiceSaved')
    }));

    return (
        <Fragment>
            <JuiceBtn />
            <ShowcaseBtn isJuiceSaved={isJuiceSaved}/>
        </Fragment>
    );
}

export default JuiceBtnContainer;
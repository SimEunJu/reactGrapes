import React, { Fragment } from 'react';
import JuiceBtn from '../components/JuiceBtn';
import ShowcaseBtn from '../atoms/showcase/ShowcaseBtn';

const JuiceBtnContainer = () => {

    return (
        <Fragment>
            <JuiceBtn />
            <ShowcaseBtn />
        </Fragment>
    );
}

export default JuiceBtnContainer;
import React, {Fragment} from 'react';
import GrapeWrapperContainer from '../containers/GrapeWrapperContainer';
import JuiceContainer from '../containers/JuiceContainer';
import HeaderContainer from '../containers/HeaderContainer';

const MainPage = () => (
    <Fragment>
        <HeaderContainer />
        <GrapeWrapperContainer />
        <JuiceContainer />
    </Fragment>
);

export default MainPage;
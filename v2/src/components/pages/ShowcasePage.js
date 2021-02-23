import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Showcase from '../atoms/showcase/Showcase';
import NetworkErr from "./error/NetworkErr";
import Loader from "../atoms/Loader";


const ShowcasePage = () => {
    const {getShowcaseSuccess, getShowcaseFailure} = useSelector(({grape}) => ({
        getShowcaseSuccess: grape.getShowcaseSuccess,
        getShowcaseFailure: grape.getShowcaseFailure,
    }), shallowEqual);

    if(getShowcaseFailure) return <NetworkErr />;

    if(getShowcaseSuccess)return <Showcase />;

    return <Loader />;
};

export default ShowcasePage;
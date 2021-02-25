import React, {useEffect, useMemo} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ShowcaseRow from './ShowcaseRow';
import {getShowcase} from '../../../store/modules/grape';
import ScrollSentinel from '../ScrollSentinel';
import Loader from '../Loader';
import NetworkErr from '../../pages/error/NetworkErr';

const Showcase = () => {
    
    const {showcase, showcasePaging, 
        getShowcaseSuccess, getShowcaseLoading} = useSelector(({grape, loading}) => ({
        
        getShowcaseSuccess: grape.getShowcaseSuccess,
        getShowcaseLoading: loading['grape/getShowcase'],
        showcase: grape.showcase,
        showcasePaging: grape.showcasePaging
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        debugger;
        dispatch(getShowcase({size: showcasePaging.size, page: showcasePaging.page+1}));
    }, []);

    const bunchOfGrapes = useMemo(() => 
        showcase.map(grape => <ShowcaseRow grapes={grape}/>), 
    [showcase]) ;

    if(getShowcaseLoading) return <Loader />;

    if(getShowcaseSuccess){
        return(
            <ShowcaseFrame>
                {bunchOfGrapes}
                <ScrollSentinel apiCall={getShowcase} page={showcasePaging.page + 1} size={showcasePaging.size} hasNext={showcasePaging.hasNext}/>
            </ShowcaseFrame>
        );
    }

    return <NetworkErr />;
}

const ShowcaseFrame = styled.div`
    margin: 50px;
    border: 7px solid olivedrab;
    background-color: white;
`;

export default Showcase;
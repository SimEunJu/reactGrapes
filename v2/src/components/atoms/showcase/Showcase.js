import React, {useEffect, useMemo} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ShowcaseRow from './ShowcaseRow';
import {getShowcase} from '../../../store/modules/grape';

const Showcase = () => {
    
    const showcase = useSelector(({grape}) => grape.showcase);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShowcase());
    }, []);

    const bunchOfGrapes = useMemo(() => 
        showcase.map(grape => <ShowcaseRow grapes={grape}/>), 
        [showcase]) ;

    return(
        <ShowcaseFrame>
            {bunchOfGrapes}
        </ShowcaseFrame>
    );
}

const ShowcaseFrame = styled.div`
    margin: 10%;
    border: 7px solid olivedrab;
    background-color: white;
`;

export default Showcase;
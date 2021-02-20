import React, {useEffect, useMemo} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ShowcaseRow from './ShowcaseRow';
import {getShowcase} from '../../store/modules/grape';

const ShowcaseFrame = styled.div`
    margin: 10%;
    border: 7px solid olivedrab;
    background-color: white;
`;

const Showcase = () => {
    
    const {showcase, loading} = useSelector(({grape, loading}) => ({
        showcase: grape.showcase,
        loading: loading.getShowcase

    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShowcase());
    }, []);

    const bunchOfGrapes = useMemo(() => 
        showcase.map(grape => <ShowcaseRow grapes={grape}/>), 
        [showcase]) ;

    // TODO: loader로 교체
    if(loading) return <div />;
    //this.props.GrapeActions.setJuice({isJuice: false});
    return(
        <ShowcaseFrame>
            {bunchOfGrapes}
        </ShowcaseFrame>
    );
}

export default Showcase;
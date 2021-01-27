import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Grape = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: green;
`;
const GrapeRow = styled.div`
    display: flex;
    justify-content: center;
`;
const GrapeBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${props => props.ready? 'all 1s ease-out' : ''};
    visibility: ${props => props.ready? '' : 'hidden'};
    transform: ${props => props.ready? 'translateX(0)' : 'translateX(-10vw)'};
`;

const Msg = styled.div`
    padding: 10px;
    text-align: center;
    height: 200px;
    width: 200px;
    color: purple;
    font-size: 20px;
`;

const Depth = () => {
    const {depth, isDepthSet} = useSelector(({grape}) => ({
        depth: grape.get('depth'),
        isDepthSet: grape.get('isDepthSet')
    }));

    const makeGrapeComponent = useMemo(() => {
        const grapeRows = [];
        for (let row = 0; row < depth; row++) {
            const grapeRow = [];
            for (let col = row; col < depth; col++) {
                grapeRow.push(<Grape />)
            }
            grapeRows[row] = <GrapeRow>{grapeRow}</GrapeRow>;
        }
        return grapeRows;
    }, [depth]);

    const totalGrapeCnt = ( depth*(depth+1) )/2;
    return(
        <GrapeBlock ready={isDepthSet}>
            <Msg>
                {makeGrapeComponent}
                {totalGrapeCnt}일 동안<br />진행할 수 있습니다!
            </Msg>
        </GrapeBlock>
    );
}

export default Depth;
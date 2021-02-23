import React, { useEffect, useMemo, useRef} from 'react';
import styled from 'styled-components';
import Grape from './Grape';
import { GREEN, PURPLE } from '../../common/Color';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { saveJuice } from '../../store/modules/grape';
import useEffectOnlyUpdate from '../../hooks/useEffectOnlyUpdate';

const Grapes = (props) => {

    const grapesRef = useRef();
    const {depth, grape, startJuiceAni} = useSelector( ({grape}) => ({
        depth: grape.depth,
        grape: grape.grape,
        startJuiceAni: grape.isJuiceMaking
    }), shallowEqual);
    const dispatch = useDispatch();

    // TODO: Depth 컴포넌트의 makeGrapeComponent 메소드와 합쳐서 refactor
    // TODO: 포도알 간의 간격을 줄이기 위해서는 canvas 사용해야 할 듯
    const makeGrapeComponent = useMemo(() => {
        const {openModal, changeGrapeChecked} = props;

        const grapeRows = [];
        
        const {clientHeight, clientWidth} = document.documentElement;
        const sizeOfGrape = Math.floor( (Math.min(clientHeight, clientWidth)-200) / depth );
        let idx = 0;
        for (let row = 0; row < depth; row++) {
            const grapeRow = [];
            const cntPerRow = depth - row;
            for (let col = 0; col < cntPerRow; col++) {
                grapeRow.push(<Grape
                    id={grape[idx].id}
                    seq={grape[idx].seq}
                    key={grape[idx].id}
                    size={sizeOfGrape}
                    color={grape[idx].isChecked ? PURPLE : GREEN}
                    openModal={openModal}
                    changeGrapeChecked={changeGrapeChecked}
                    />
                );
                idx++;
            }
            grapeRows[row] = <div className='grapeWrap'>{grapeRow}</div>;
        }
        return grapeRows;
    }, [props, grape]);

    // 부모에서 child animation이 모두 끝났는지 확인해야 다음 단계로 실행 가능
    useEffectOnlyUpdate(() => {
        Promise.any(
            grapesRef.current.getAnimations({ subtree: true })
              .map(animation => animation.finished)
          ).then(() => dispatch(saveJuice()));
    }, [startJuiceAni]);

    // 포도알(<Grape>) 애니메이션 끝나도 영역 유지하기 위해
    // 맨처음 render링 될 때 실행되는 ref에는 current가 없기 때문에 useEffectOnlyUpdate 사용
    useEffectOnlyUpdate(() => {
        const height = grapesRef.current.getBoundingClientRect().height;
        grapesRef.current.height = height;
    }, []);

    return(
        <GrapesBlock ref={grapesRef} style={{height: `${grapesRef.current?.height}px`}}>  
            {makeGrapeComponent}
        </GrapesBlock>
    );

}

const GrapesBlock = styled.div`
    
    width: 80%;
    margin: auto;
    
    .grapeWrap{
        display: flex;
        justify-content: center;
    }
`;

export default Grapes;
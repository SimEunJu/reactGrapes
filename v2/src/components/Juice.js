import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimationService } from '../hooks/animation/animation';
import useAnimation from '../hooks/animation/useAnimation';
import useAnimations from '../hooks/animation/useAnimations';
import useEffectOnlyUpdate from '../hooks/useEffectOnlyUpdate';

const BottleBlock = styled.div`
    position: relative;
    margin: auto;
    width: 200px;
`;
const Cap = styled.div`
    position: relative;
    top: 3px;
    margin: auto;
    border-radius: 7px;
    width: 30px;
    height: 35px;
`;
const BottleEnter = styled.div`
    border-radius: 3px;
    margin: auto;
    position: relative;
    top: 2px;
    border: 2px solid black;
    width: 48px;
    height: 17px;
    background-color: white;
`;
const BottleNeck = styled.div`
    border: 2px solid black;
    position: relative;
    border-bottom: none;
    margin: auto;
    border-top: none;
    width: 31px;
    height: 19px;
    background-color: white;
    z-index: 1;
`;
const BottleBody = styled.div`
    border: 2px solid black;
    width: 86px;
    height: 110px;
    position: relative;
    top: -2px;
    border-top-left-radius: 35%;
    border-top-right-radius: 35%;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    background-color: white;
    margin: auto;
`;
const Liquid = styled.div`
    width: 100%;
    height: 70%;
    position: relative;
    top: 30%;
`;

const animationOpts = {
    capEl: {
        name: 'closeCap',
        order: 2,
        keyframes: [
            { transform: 'translateY(0)', backgroundColor: 'brown' },
            { transform: 'translateY(15px)', backgroundColor: 'brown' }
        ],
        options: {
            duration: 500,
            //delay: 3000,
            fill: 'forwards',
            easing: 'ease-in'
        }
    },
    bottleEl: [ 
        {   
            name: 'shakeBottle',
            order: 1,
            keyframes : [
                { transform: 'rotate(0)' },
                { transform: 'rotate(30deg)' },
                { transform: 'rotate(0)' },
                { transform: 'rotate(-30deg)' },
                { transform: 'rotate(0)' }
            ],
            options: {
                duration: 1500,
                //delay: 1000,
                //composite: 'accumulate',
                fill: 'forwards',
                easing: 'ease-in-out'
            }
        },
        {
            name: 'minimizeBottle',
            order: 3,
            keyframes: [
                { transform: 'scale(1)' },
                { transform: 'scale(0)' }
            ],
            options: {
                duration: 1000,
                //delay: 4000,
                fill: 'forwards',
                easing: 'ease-in-out'
            }
        }
    ],
    liquidEl: {
        name: "setLiquidColor",
        order: 4,
        keyframes: [
            {backgroundColor: null}
        ],
        options: {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease-in'
        }
    }
};

const Juice = ({rgba, saveJuice}) => {
    
    const [bottleBlockRef, bottleBlockAnis] = useAnimations(animationOpts['bottleEl']);
    const [capRef, capAni] = useAnimation(animationOpts['capEl']);
    const [liquidRef, liquidAni] = useAnimation(animationOpts['liquidEl']);

    const isJuiceSaving = useSelector(({grape}) => grape.isJuiceSaving);

    // TODO: promise 패턴 개선 여지
    useEffectOnlyUpdate(() => {
        // animationSeq = [bottleBlockAnis[0], liquidAni, capAni, bottleBlockAnis[1]];
        if(!isJuiceSaving) return false;

        liquidAni.keyframes[0].backgroundColor = rgba;
        
        Promise.all([
                AnimationService.animate(bottleBlockAnis[0]).finished,
                AnimationService.animate(liquidAni).finished,
            ])
            .then(() => AnimationService.animate(capAni).finished)
            .then(() => AnimationService.animate(bottleBlockAnis[1]).finished)
            .then(saveJuice)
            .catch((e) => {
                console.error(e);
            })
            .finally();

    }, [isJuiceSaving]);

    if(!isJuiceSaving) return <div />;
    return(
        <BottleBlock ref={bottleBlockRef}>
            <Cap ref={capRef} />
            <BottleEnter />
            <BottleNeck />
            <BottleBody>
                <Liquid ref={liquidRef}/>
            </BottleBody>
        </BottleBlock>
    );

}

export default Juice;
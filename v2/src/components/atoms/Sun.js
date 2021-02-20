import React, {useEffect} from 'react';
import useAnimation from '../../hooks/animation/useAnimation';
import './Sun.scss';

const animationOpts = {
    svgEl: {
        keyframes: [
            {transform: 'rotate(0deg)'},
            {transform: 'rotate(360deg)'}
        ],
        options: {
            duration: 2000
        }
    },
    circleEl: {
        keyframes: [
            {fill: 'orange'},
            {fill: 'orangered'}
        ],
        options: {
            duration: 2000
        }
    }
}

const Sun = ({isSunRotate}) => {

    const [svgRef, svgAni] = useAnimation(animationOpts['svgEl']);
    const [circleRef, circleAni] = useAnimation(animationOpts['circleEl']);

    useEffect(() => {
        if(isSunRotate){
            const animations = [svgAni, circleAni];
            animations.forEach(ani => {
                const {ref, keyframes, options} = ani;
                ref.current.animate(keyframes, options);
            })
        }
    }, [isSunRotate]);
      
    return(
        <svg className="sun" ref={svgRef} width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
            <line x1='5' y1='50' x2='95' y2='50' stroke='orange' strokeWidth='2.5'></line>
            <line x1='50' y1='5' x2='50' y2='95' stroke='orange' strokeWidth='2.5'></line>
            <line x1='18.75' y1='18.75' x2='81.25' y2='81.25' stroke='orange' strokeWidth='2.5'></line>
            <line x1='81.25' y1='18.75' x2='18.75' y2='81.25' stroke='orange' strokeWidth='2.5'></line>
            <circle ref={circleRef} cx='50' cy='50' fill='orange' r='30'></circle>
        </svg>
    );
}
export default Sun;
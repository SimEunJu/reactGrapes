import { useMemo, useRef } from "react";
import { Animation } from './animation';

function useAnimations(animationOpts) {
    
    const ref = useRef(null);
    
    const animations = [];
    
    animationOpts.forEach(opt => {
        const {keyframes, options, order, name} = opt;
        const animation = new Animation(ref, keyframes, options, order, name);
        animations.push(animation);
    });
    
    return useMemo(() => [ref, animations], [ref]);
}

export default useAnimations;
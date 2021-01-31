import { useMemo, useRef } from "react";

function useAnimation({keyframes, options}) {
    const ref = useRef(null);
    
    return useMemo(() => [ref,{
        ref,
        animation: null,
        keyframes,
        options
    }], [ref]);
    
}

export default useAnimation;
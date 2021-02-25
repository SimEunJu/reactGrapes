import React, { useEffect, useRef } from 'react';
import { useDispatch} from 'react-redux';

const ScrollSentinel = ({apiCall, rootMargin=100, page, size, hasNext}) => {
    const sentinelRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            rootMargin: `${rootMargin}px`
        };
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(!entry.isIntersecting){
                    return;
                }
                if(hasNext === false){
                    observer.unobserve(entry.target);
                    return;
                } 
                dispatch(apiCall(page, size));            
            })
        }, options);
        io.observe(sentinelRef.current);
    }, []);

    return <div ref={sentinelRef}/>;
};

export default ScrollSentinel;
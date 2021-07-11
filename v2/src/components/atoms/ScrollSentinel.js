import React, { useEffect, useRef } from "react";

const ScrollSentinel = ({ apiCall, isStop }) => {
	const sentinelRef = useRef(null);
	const ioRef = useRef(
		new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}
					apiCall();
				});
			},
			{ rootMargin: "100px" }
		)
	);

	useEffect(() => {
		if (sentinelRef.current) ioRef.current.observe(sentinelRef.current);

		return () => {
			if (sentinelRef.current)
				ioRef.current.unobserve(sentinelRef.current);
		};
	}, []);

	useEffect(() => {
		if (isStop) ioRef.current.unobserve(sentinelRef.current);
	}, [isStop]);

	return <div ref={sentinelRef} />;
};

export default ScrollSentinel;

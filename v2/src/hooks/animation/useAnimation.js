import { useMemo, useRef } from "react";

// 1 컴포넌트, 1 애니메이션
function useAnimation({ keyframes, options }) {
	const ref = useRef(null);

	return useMemo(
		() => [
			ref,
			{
				ref,
				animation: null,
				keyframes,
				options,
			},
		],
		[ref]
	);
}

export default useAnimation;

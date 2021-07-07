import { useMemo, useRef } from "react";
import { Animation } from "./animation";

// 1 컴포넌트, N 애니메이션
// TODO: useAnimation(1), useAnimations(N)으로 나누는 것이 합당한가
function useAnimations(animationConfigs) {
	const ref = useRef(null);

	const animations = {};

	for (const aniName in animationConfigs) {
		const { keyframes, options, order, name } = animationConfigs[aniName];
		const animation = new Animation(ref, keyframes, options, order, name);
		animations[aniName] = animation;
	}

	return useMemo(() => [ref, animations], [ref]);
}

export default useAnimations;

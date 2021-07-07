import { useEffect, useRef } from "react";

function useEffectOnlyUpdate(func, deps) {
	const isUpdateRef = useRef(false);
	useEffect(() => {
		if (isUpdateRef.current) {
			func();
		}
		isUpdateRef.current = true;
	}, deps);
}

export default useEffectOnlyUpdate;

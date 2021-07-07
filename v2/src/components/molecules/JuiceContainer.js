import React, { useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Juice from "../atoms/Juice";
import { setRgba } from "../../store/modules/grape";

const JuiceContainer = () => {
	const { gno, juiceColorCntSet } = useSelector(
		({ grape }) => ({
			gno: grape.gno,
			juiceColorCntSet: grape.juiceRatio,
		}),
		shallowEqual
	);

	const dispatch = useDispatch();

	const getJuiceColor = useMemo(() => {
		const { green: greenCnt, purple: purpleCnt } = juiceColorCntSet;
		const totalCnt = greenCnt + purpleCnt;
		const aRatio = (purpleCnt / totalCnt) * 0.6 + 0.4;
		const rgba = `rgba(179, 32, 82, ${1 * aRatio})`;
		return rgba;
	}, [juiceColorCntSet]);

	const saveJuice = () => {
		dispatch(setRgba({ rgba: getJuiceColor, gno }));
	};

	return <Juice saveJuice={saveJuice} rgba={getJuiceColor} />;
};

export default JuiceContainer;

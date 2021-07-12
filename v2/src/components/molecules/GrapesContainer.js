import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor, showModal } from "../../store/modules/grape";

import Grapes from "../atoms/Grapes";
import Modal from "../atoms/Modal";
import Sun from "../atoms/Sun";

// TODO: 전역이냐, 부모 상태냐 그것이 문제로다..
const GrapeWrapperContainer = () => {
	const { gno, grapes, changeGrapeContent, isModalOpen } = useSelector(
		({ grape, loading }) => ({
			gno: grape.gno,
			grapes: grape.grape,
			changeGrapeContent: grape.changeGrapeContent,
			isModalOpen: grape.modal,
		})
	);
	const dispatch = useDispatch();

	const [isSunRotate, setSunRotate] = useState(null);
	const [editGrapeIdx, setEditGrapeIdx] = useState(null);

	const changeGrapeChecked = (grapeIdx, grapeSeq) => {
		const nextChkStat = !grapes[grapeSeq].isChecked;

		dispatch(changeColor({ gno, idx: grapeIdx, isChecked: nextChkStat }));
		setSunRotate(grapeIdx);
	};

	const openModal = (editGrapeIdx) => {
		setEditGrapeIdx(editGrapeIdx);
		dispatch(showModal({ gno, idx: editGrapeIdx }));
	};

	useEffect(() => {
		if (changeGrapeContent.isSuccess) window.confirm("완료되었습니다.");
	}, [changeGrapeContent.isSuccess]);

	return (
		<>
			<Sun isSunRotate={isSunRotate} />
			{isModalOpen && <Modal gno={gno} editGrapeIdx={editGrapeIdx} />}
			<Grapes
				openModal={openModal}
				changeGrapeChecked={changeGrapeChecked}
			/>
		</>
	);
};

export default GrapeWrapperContainer;

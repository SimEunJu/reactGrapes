import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	changeColor,
	showModal,
	changeGrapeContent,
	hideModal,
} from "../../store/modules/grape";

import Grapes from "../atoms/Grapes";
import Modal from "../atoms/Modal";
import Sun from "../atoms/Sun";

// TODO: 전역이냐, 부모 상태냐 그것이 문제로다..
const GrapeWrapperContainer = () => {
	const { gno, grapes, isModalOpen } = useSelector(({ grape, loading }) => ({
		gno: grape.gno,
		grapes: grape.grape,
		isModalOpen: grape.modal,
	}));
	const dispatch = useDispatch();

	const [isSunRotate, setSunRotate] = useState(false);
	const [editGrapeIdx, setEditGrapeIdx] = useState(null);

	const changeGrapeChecked = (grapeIdx, grapeSeq) => {
		let isChecked = false;
		if (!grapes[grapeSeq].isChecked) isChecked = true;

		dispatch(changeColor({ gno, idx: grapeIdx, isChecked }));
		setSunRotate(isChecked);
	};

	const openModal = editGrapeIdx => {
		setEditGrapeIdx(editGrapeIdx);
		dispatch(showModal({ gno, idx: editGrapeIdx }));
	};

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

export default withRouter(GrapeWrapperContainer);

import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

export const createNewBunchGrapes = async (depth) => {
	const res = await axios.post(`/new`, { depth });
	const token = res.data.token;

	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
	return res;
};

export const getBunchGrapes = async (gno) => await axios.get(`/${gno}`);

export const updateBunchGrapesTitle = async ({ gno, title }) =>
	await axios.patch(`/${gno}/title`, { title });

export const updateGrapeCheck = async ({ gno, idx, isChecked }) =>
	await axios.patch(`/${gno}/${idx}/check`, { isChecked });

export const updateGrapeContent = async ({ gno, idx, title, content }) =>
	await axios.patch(`/${gno}/${idx}`, { title, content });

export const getGrape = async ({ gno, idx }) =>
	await axios.get(`/${gno}/${idx}`);

export const updateGrapeFinish = async ({ gno, rgba }) =>
	await axios.patch(`/${gno}/finish`, { rgba });

export const getBunchGrapesList = async ({ size, page }) =>
	await axios.get(`/list?size=${size}&page=${page}`);

export const updateBunchGrapesClosed = async ({ gno, isFinish }) =>
	await axios.post(`/${gno}/finish`, { isFinish });

export const deleteGrapes = (gno) => axios.delete(`/${gno}`);

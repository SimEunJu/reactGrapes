import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.common["Authorization"] =
	"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MjU3MzE1NzN9.ny7qR4KfrZL0yt29TlhzRiIAD-8EiHLvBl1Gvp0gMvi6Pz8x1iNmtCJAjWab_8a5U2U3e9NlQYz95qADAHkNLA";

export const createNewBunchGrapes = async depth =>
	await axios.post(`/new`, { depth });
export const getBunchGrapes = async gno => await axios.get(`/${gno}`);
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

//export const updateJuiceFinishState = async ({gno, isFinish}) => await axios.post(`/${gno}/finish`,{isFinish});
export const deleteGrapes = gno => axios.delete(`/${gno}`);

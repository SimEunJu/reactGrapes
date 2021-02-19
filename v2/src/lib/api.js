import axios from 'axios';

axios.defaults.baseURL = '/api/grapes';
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTM4MzUwNjF9.ysahVPXzR_yehkHM9Z3LUnHoSDCV7qCWLRPibrkdbk9c15kkaX2mESfbVfyIDTm6udXWKGbNpny6tv4uSXFbOw";

export const createNew = async (depth) => await axios.post(`/new`, {depth});
export const readGrapes = async (gno) => await axios.get(`/${gno}`);
export const updateTitle = async ({gno, title}) => await axios.patch(`/${gno}/title`,{title});
export const updateOneGrapeColor = async ({gno, idx, isChecked}) => await axios.patch(`/${gno}/${idx}/check`, {isChecked});
export const updateOneGrape = async ({gno, idx, title, content}) => await axios.patch(`/${gno}/${idx}`, {title,content});
export const readOneGrape = async ({gno, idx}) => await axios.get(`/${gno}/${idx}`);
export const finishOneGrape = async ({gno, rgba}) => await axios.patch(`/${gno}/finish`, {rgba});
export const readShowcase = async () => await axios.get(`/list`);

//export const updateJuiceFinishState = async ({gno, isFinish}) => await axios.post(`/${gno}/finish`,{isFinish});
export const deleteGrapes = (gno) => axios.delete(`/${gno}`)
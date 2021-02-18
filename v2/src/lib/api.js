import axios from 'axios';

axios.defaults.baseURL = '/api/grapes';
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTM3NDg0OTd9.FTddaKrnInfO8BJ8hxBtfBsRISUC7hNMVK35NiRjXuO_QnvSR-wZ_AZpXfRxUPbbSfGRr1k5fuj6LNTQ-TaCyQ";

export const createNew = async (depth) => await axios.post(`/new`, {depth});
export const readGrapes = async (gno) => await axios.get(`/${gno}`);
export const updateTitle = async ({gno, title}) => await axios.patch(`/${gno}/title`,{title});
export const updateOneGrapeColor = async ({gno, idx, isChecked}) => await axios.patch(`/${gno}/${idx}/check`, {isChecked});
export const updateOneGrape = async ({gno, idx, title, content}) => await axios.patch(`/${gno}/${idx}`, {title,content});
export const readOneGrape = async ({gno, idx}) => await axios.get(`/${gno}/${idx}`);

export const updateRgba = ({gno, rgba}) => axios.post(`/${gno}/rgba`,{rgba});
export const updateJuiceFinishState = ({gno, isFinish}) => axios.post(`/${gno}/finish`,{isFinish});
export const readShowcase = () => axios.get(`/local/showcase`);
export const deleteGrapes = (gno) => axios.delete(`/${gno}`)
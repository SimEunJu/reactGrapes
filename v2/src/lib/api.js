import axios from 'axios';

axios.defaults.baseURL = '/api/grapes';
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTM2NDUyOTl9.ZtXcrdV_fUqBa6eGYPMcxsBtVwNZanre3es2aGJF_P8HK89HvH_5IDfeOb735MczNJEXx4l-CSMo8IqR9M_t7A";

export const createNew = async (depth) => await axios.post(`/new`, {depth});

export const readGrapes = async (gno) => await axios.get(`/${gno}`);

export const updateTitle = ({gno, title}) => axios.post(`/${gno}/title`,{title});
export const updateOneGrape = ({gno, idx, title, content}) => axios.post(`/${gno}/${idx}`, {title,content});
export const updateOneGrapeColor = ({gno, idx, isChecked}) => axios.patch(`/${gno}/${idx}/check`, {isChecked});
export const updateRgba = ({gno, rgba}) => axios.post(`/${gno}/rgba`,{rgba});
export const updateJuiceFinishState = ({gno, isFinish}) => axios.post(`/${gno}/finish`,{isFinish});

export const readShowcase = () => axios.get(`/local/showcase`);
export const deleteGrapes = (gno) => axios.delete(`/${gno}`)
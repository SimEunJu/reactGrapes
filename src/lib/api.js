import axios from 'axios';

const PREFIX = '/api/grapes';

export const createNew = (depth) => axios.get(`${PREFIX}/local/new?depth=${depth}`);

export const readGrapes = (gno) => axios.get(`${PREFIX}/${gno}`);
export const updateTitle = ({gno, title}) => axios.post(`${PREFIX}/${gno}/title`,{title});
export const updateOneGrape = ({gno, idx, title, content}) => axios.post(`${PREFIX}/${gno}/${idx}`, {title,content});
export const updateOneGrapeColor = ({gno, idx, isChecked}) => axios.post(`${PREFIX}/${gno}/${idx}/color`, {isChecked});
export const updateRgba = ({gno, rgba}) => axios.post(`${PREFIX}/${gno}`,{rgba});

export const readShowcase = () => axios.get(`${PREFIX}/local/showcase`);
export const deleteGrapes = (gno) => axios.delete(`${PREFIX}/${gno}`)
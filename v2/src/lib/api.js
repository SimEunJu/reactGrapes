import axios from 'axios';

const PREFIX = '/api/grapes';

export const createNew = (depth) => {
    console.log(depth);
    const res = axios.get(`${PREFIX}/local/new?depth=${depth}`);
    console.log(res);
    return res;
}

export const readGrapes = (gno) => axios.get(`${PREFIX}/${gno}`);
export const updateTitle = ({gno, title}) => axios.post(`${PREFIX}/${gno}/title`,{title});
export const updateOneGrape = ({gno, idx, title, content}) => axios.post(`${PREFIX}/${gno}/${idx}`, {title,content});
export const updateOneGrapeColor = ({gno, idx, isChecked}) => axios.post(`${PREFIX}/${gno}/${idx}/color`, {isChecked});
export const updateRgba = ({gno, rgba}) => axios.post(`${PREFIX}/${gno}/rgba`,{rgba});
export const updateJuiceFinishState = ({gno, isFinish}) => axios.post(`${PREFIX}/${gno}/finish`,{isFinish});

export const readShowcase = () => axios.get(`${PREFIX}/local/showcase`);
export const deleteGrapes = (gno) => axios.delete(`${PREFIX}/${gno}`)
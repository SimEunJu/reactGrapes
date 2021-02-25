import axios from 'axios';

axios.defaults.baseURL = '/api/grapes';
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTQzMzk4NDV9.KybzutjYDR7-A0Fp5uJ1WR23DmDkU3dZMKfHasKbz0K9sEG5oZblWI76WaFj0xZkVZ-wTWfysM7hF8ILMIrgaQ";

export const createNewBunchGrapes = async (depth) => await axios.post(`/new`, {depth});
export const getBunchGrapes = async (gno) => await axios.get(`/${gno}`);
export const updateBunchGrapesTitle = async ({gno, title}) => await axios.patch(`/${gno}/title`,{title});
export const updateGrapeCheck = async ({gno, idx, isChecked}) => await axios.patch(`/${gno}/${idx}/check`, {isChecked});
export const updateGrapeContent = async ({gno, idx, title, content}) => await axios.patch(`/${gno}/${idx}`, {title,content});
export const getGrape = async ({gno, idx}) => await axios.get(`/${gno}/${idx}`);
export const updateGrapeFinish = async ({gno, rgba}) => await axios.patch(`/${gno}/finish`, {rgba});
export const getBunchGrapesList = async ({size, page}) => await axios.get(`/list?size=${size}&page=${page}`);

//export const updateJuiceFinishState = async ({gno, isFinish}) => await axios.post(`/${gno}/finish`,{isFinish});
export const deleteGrapes = (gno) => axios.delete(`/${gno}`);

/*
function postReq(url, params={}){
    axios.post(url, params)
    .catch((err) => {
        if(err.status === 401){
            // authentication fail
            switch (err.code) {
                case "C007":
                    // login page로 리다이렉트
                    break;
                default:
                    break;
            }
        }
    })
}*/
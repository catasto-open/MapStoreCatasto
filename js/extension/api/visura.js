import axios from '@mapstore/libs/ajax';

export const getVisuraBlob = (printObj, fileType) => {
    const url = printObj.url;
    let params = printObj.query;
    params.format = fileType;
    return axios.get(
        url,
        {
            params: params,
            responseType: "blob",
            headers: printObj.headers
        }
    );
};


export const getVisuraJSON = (printObj) => {
    const url = printObj.url;
    let params = printObj.query;
    return axios.get(
        url,
        {
            params: params,
            headers: {...printObj.headers, 'content-type': 'application/json'}
        }
    );
};

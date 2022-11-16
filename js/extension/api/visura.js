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

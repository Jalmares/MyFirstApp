import {useState, useEffect} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGET = async (endpoint = '', params = '', token = '') => {
    const fetchOptions = {
        headers: {
            'x-access-token': token,
        },
    };
    const response = await fetch(apiUrl + endpoint + '/' + params,
        fetchOptions);
    if (!response.ok) {
        throw new Error('fetchGET error: ' + response.status);
    }
    return await response.json();
};

const fetchPOST = async (endpoint = '', data = {}, token = '') => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(apiUrl + endpoint, fetchOptions);
    const json = await response.json();
    console.log(json);
    if (response.status === 400 || response.status === 401) {
        const message = Object.values(json).join();
        throw new Error(message);
    } else if (response.status > 299) {
        throw new Error('fetchPOST error: ' + response.status);
    }
    return json;
};


const getAllMedia = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchMedia = async () => {
        try {
            const json = await fetchGET('media/all');
            const result = await Promise.all(json.files.map(async (item) => {
                return await fetchGET('media', item.file_id);
            }));
            setData(result);
            setLoading(false);
        } catch (e) {
            console.log('getAllMedia error', e.message);
        }
    };
    useEffect(() => {
        fetchMedia();
    }, []);
    return [data, loading];
};

export {getAllMedia, fetchGET, fetchPOST};

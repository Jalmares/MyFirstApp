import {useState} from 'react';
import {AsyncStorage} from "react-native";
import {fetchGET} from "./APIHooks";
import validate from 'validate.js';

const constraints = {
    title: {
        length: {
            minimum: 3,
            message: 'please give titlename at least 3 characters'
        }
    },

};

const useUploadForm = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const handleTitleChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                title: text,
            }));
    };

    const handleDescriptionChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                description: text,
            }));
    };

    const handleUpload= async (file) => {

        const filename = file.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        if (type === 'image/jpg') {
            type = 'image/jpeg';
        }

        const fd = new FormData();
        fd.append('title', inputs.title);
        fd.append('description', inputs.description);
        fd.append('file', {uri: file.uri, name: filename, type});

        try {

            const token = await AsyncStorage.getItem('userToken');

            const fetchOptions = {
                method: 'POST',
                headers: {
                    'x-access-token': token,
                },
                body: fd,
            };

            const result = await fetch('http://media.mw.metropolia.fi/wbma/media/', fetchOptions);
            if (result.file_id) {
                const json = await fetchGET('media/all');
                const result = await Promise.all(json.files.map(async (item) => {
                    return await fetchGET('media', item.file_id);
                }));
                setMedia(result);
                //navigation.replace('Home');
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const validateForm = (attr) => {
        const fieldName = Object.keys(attr).pop();
        const valForm = validate(attr, constraints);
        let valid = undefined;
        if (valForm[fieldName]) {
            valid = valForm[fieldName][0];
        }
        setErrors((errors) =>
            ({
            ...errors,
            [fieldName]: valid,
                fetch: undefined,
        }));
    };

    const resetText = (attr, text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                [attr]: text,
            }));
    };


    return {
        handleTitleChange,
        handleDescriptionChange,
        handleUpload,
        validateForm,
        resetText,
        inputs,
        errors,
        setErrors,
    };
};

export default useUploadForm;
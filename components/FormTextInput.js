import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {Input, Item} from 'native-base';


const FormTextInput = (props) => {
    const {style, ...otherProps} = props;
    return (
        <Item>
        <Input
            {...otherProps}
        />
        </Item>
    );
};


FormTextInput.propTypes = {
    style: PropTypes.object,
};

export default FormTextInput;
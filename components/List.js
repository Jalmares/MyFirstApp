import React from 'react';
import {FlatList,} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const List = (props) => {
    console.log(props);
    return (
        <FlatList
            data={props.mediaArray}
            renderItem={({item}) => <ListItem singleMedia={item} />}
        />
    );
};

List.propTypes = {
    mediaArray: PropTypes.array,
};

export default List;
import React, {useContext} from 'react';
import {FlatList,} from 'react-native';
import ListItem from './ListItem';
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia} from "../hooks/APIHooks";
import PropTypes from 'prop-types';



const List = (props) => {
    const [media, setMedia] = useContext(MediaContext);
    const [data, loading] = getAllMedia();
    console.log('List', data, loading);
    setMedia(data);
    return (
        <FlatList
            data={media}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ListItem
                navigation={props.navigation}
                singleMedia={item} />}
        />
    );
};

List.propTypes = {
    navigation: PropTypes.object,
};

export default List;
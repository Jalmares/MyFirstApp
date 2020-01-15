import React, {useContext} from 'react';
import {FlatList,} from 'react-native';
import ListItem from './ListItem';
import {MediaContext} from "../contexts/MediaContext";
import {useFetch} from "../hooks/APIHooks";



const List = () => {
    const [media, setMedia] = useContext(MediaContext);
    const [data, loading] = useFetch('https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json');
    console.log('List', data, loading);
    setMedia(data);
    return (
        <FlatList
            data={media}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ListItem singleMedia={item} />}
        />
    );
};


export default List;
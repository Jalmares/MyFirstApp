/* eslint-disable max-len */
import React, {useContext, useEffect, useState} from 'react';
import {
    List as BaseList, Spinner, View,
} from 'native-base';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const List = (props) => {
    const [media, setMedia] = useContext(MediaContext);
    const [loading, setLoading] = useState(true);

    const getMedia = async () => {
        try {
            const data = await getAllMedia();
            setMedia(data.reverse());
            setLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    return (
        <View>
            {loading ? (
                <Spinner/>
            ) : (
                <BaseList
                    dataArray={media}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <ListItem
                        navigation={props.navigation}
                        singleMedia={item}
                    />}
                />
            )}
        </View>
    );
};

List.propTypes = {
    navigation: PropTypes.object,
};

export default List;

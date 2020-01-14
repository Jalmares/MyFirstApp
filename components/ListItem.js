import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {
    console.log('list item props', props);

    const item = props.singleMedia;

    return (
        <TouchableOpacity style={styles.background}>
            <Image
                style={{
                    width: 100,
                    height: null,
                    flex: 1,
                }}
                source={{uri: item.thumbnails.w160}}

            />
            <View style={{
                flex: 1,
                marginLeft: 5,
            }}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{props.singleMedia.title}</Text>
                <Text style={{fontSize: 13}}>{props.singleMedia.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },

    background: {
        backgroundColor: '#8b8b8b',
        marginBottom: 5,
        flexDirection: 'row',
        padding: 10,
    },
});

ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;
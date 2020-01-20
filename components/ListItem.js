import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
    console.log('list item props', props);

    const item = props.singleMedia;

    return (
        <TouchableOpacity style={styles.background}>
            <Image
                style={{
                    width: 180,
                    height: 180,
                    flex: 1,
                    borderRadius: 100,
                    overflow: "hidden",
                }}
                source={{uri: mediaURL + item.thumbnails.w160}}

            />
            <View style={{
                flex: 1,
                marginLeft: 5,
            }}>
                <Text style={{fontSize: 20, fontWeight: "bold", color: "orange"}}>{props.singleMedia.title}</Text>
                <Text style={{fontSize: 13}}>{props.singleMedia.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#8b8b8b',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
});

ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;
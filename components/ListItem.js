import {Image, Dimensions, Text,} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Single from "../views/Single";
import {Button, ListItem as Item, Left, Body, Label, Right} from 'native-base';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
    console.log('list item props', props);

    const item = props.singleMedia;

    return (
            <Item>
                <Left>
            <Image
                style={{
                    width: Dimensions.get("window").width * 0.18,
                    height: Dimensions.get("window").height * 0.08,
                    overflow: "hidden",
                }}
                source={{uri: mediaURL + item.thumbnails.w160}}
            />
            <Body>
                <Text numberOfLines={1} style={{fontSize: 20, fontWeight: "bold", color: "orange"}}>{props.singleMedia.title}</Text>
                <Text numberOfLines={1}>{props.singleMedia.description}</Text>
            </Body>
                </Left>
                <Right>
                <Button onPress={() =>
                {props.navigation.push('Single',
                    {title: item.title,
                        description: item.description,
                        filename: item.thumbnails.w160})}}>
                    <Body>
                        <Label style={{color: "white"}}>View</Label>
                    </Body>
                </Button>
                </Right>
            </Item>
    );
};

ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;
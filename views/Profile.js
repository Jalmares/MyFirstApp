import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {Body, Button, Label, Container, Icon, Left, Content, Card, CardItem, Text} from 'native-base';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = (props) => {
    const [user, setUser] = useState({});
    const userToState = async () => {
        const userFromStorage = await AsyncStorage.getItem('user');
        setUser(JSON.parse(userFromStorage));
    };

    useEffect(() => {
        userToState();
    }, []);

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };
    return (
        <Container style={{padding: 20}}>
            <Content>
                <Card>
                    <CardItem header bordered>
                        <Left>
                            <Icon name={"person"} size={25}/>
                            <Body>
                                <Text>Username: {user.username}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>

                    </CardItem>
                    <Text>Fullname: {user.full_name}</Text>
                    <Text style={{paddingBottom: 15}}>Email: {user.email}</Text>
                    <Button onPress={signOutAsync}>
                        <Body>
                            <Label style={{color: "white"}}>Logout</Label>
                        </Body>
                    </Button>
                </Card>
            </Content>
        </Container>
    );
};


Profile.propTypes = {
    navigation: PropTypes.object,
};

export default Profile;
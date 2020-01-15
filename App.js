import React from 'react';
import {View, } from 'react-native';
import List from './components/List';
import {MediaProvider} from "./contexts/MediaContext";

const App = () => {
    return (
        <MediaProvider>
          <View>
            <List/>
          </View>
        </MediaProvider>
    );
};

export default App;
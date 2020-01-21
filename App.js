import React from 'react';
import {View, } from 'react-native';
import {MediaProvider} from "./contexts/MediaContext";
import Navigator from './navigators/Navigator';

const App = () => {
    return (
            <MediaProvider>
                <Navigator></Navigator>
        </MediaProvider>

    );
};


export default App;
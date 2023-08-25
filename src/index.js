import React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import FlashMessage from 'react-native-flash-message';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
export default function App() {
    return (
        <Provider store={store}>
            <Routes />
            <FlashMessage position="bottom" icon="auto" />
        </Provider>
    );
}
// shadowColor: 'black',
// shadowOffset: { width: 0, height: 2 },
// shadowOpacity: 0.2,
// shadowRadius: 4,
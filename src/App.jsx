import React, {Component} from 'react';
import './App.scss';
import {Provider} from 'react-redux';
import initStore, {history} from './store/store';
import {ConnectedRouter} from 'connected-react-router';
import {PersistGate} from 'redux-persist/integration/react';
import Layout from "./common/Layout/Layout";

const {store, persistor} = initStore();

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <Layout/>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        )
    }
}
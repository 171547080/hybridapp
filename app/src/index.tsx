import React from 'react';
import { Provider } from 'react-redux'
import Router from './router';
import store from './config/dva'
import BootomTabs from './router/BottomTabs';

class MyApp extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Router></Router>
            </Provider>
        )
    }
}
export default MyApp

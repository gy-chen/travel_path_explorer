import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import store from './store';
import './index.css';
import App from './App';
import GoogleMapKeyContext from './component/GoogleMapKeyContext';
import GoogleStaticMapKeyContext from './component/GoogleStaticMapKeyContext';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Provider store={store}>
        <GoogleStaticMapKeyContext.Provider value={process.env.REACT_APP_GMAPS_API_KEY}>
            <GoogleMapKeyContext.Provider value={process.env.REACT_APP_GMAPS_API_KEY}>
                <App />
            </GoogleMapKeyContext.Provider>
        </GoogleStaticMapKeyContext.Provider>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

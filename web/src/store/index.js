import { createStore } from 'redux';
import rootReducer from '../reducer';

export const configureStore = (enhancer = undefined) => {
    return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducer';
import rootEpic from '../epic';

export const configureStore = (enhancer = undefined) => {

    const epicMiddleware = createEpicMiddleware();

    const finalStoreEnhancer = enhancer ? compose(
        applyMiddleware(epicMiddleware),
        enhancer
    ) : applyMiddleware(epicMiddleware);

    const store = createStore(rootReducer, finalStoreEnhancer);

    epicMiddleware.run(rootEpic);

    return store;
};

const store = configureStore();

export default store;
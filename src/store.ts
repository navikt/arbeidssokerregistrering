import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer, { AppState } from './reducer';
import { metricsMiddleWare } from './middleware/metrics-middleware';

export function create(): Store<AppState> {
    const useExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== undefined;
    const composer = useExtension ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const composed = composer(
        applyMiddleware(thunkMiddleware, metricsMiddleWare)
    );

    return composed(createStore)(reducer, {});
}

let store: Store<AppState>;
export function getStore(): Store<AppState> {
    if (!store) {
        store = create();
    }
    return store;
}

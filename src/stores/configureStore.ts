import { createStore, applyMiddleware, Store } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import params from "./Reducers/ParamsReducers";

// Reducers
import users from './Reducers/UsersReducer';
import { iUsersAction, iUsersConnected } from "../interfaces/UsersInterface";
import { thunk } from "redux-thunk";


// const combinedReducers = combineReducers({
//     users: users
// });

const persistConfig = {
    key: 'root',
    storage: storage,
};


const persistedReducer = persistReducer(persistConfig, users);

// const reduxDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

type DispatchType = (args: iUsersAction) => iUsersAction;

export const store: Store<iUsersConnected, iUsersAction> & {
    dispatch: DispatchType;
} = createStore(persistedReducer, applyMiddleware(thunk as any));

export const persistor = persistStore(store as any);
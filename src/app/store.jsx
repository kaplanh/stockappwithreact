import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";

import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage/session"; //?sessionStorage
import storage from "redux-persist/lib/storage/"; //?bu sekilde default:localStorage
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        stock: stockReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware:getDefaultMiddleware({serializableCheck:false}),
});
export const persistor = persistStore(store);
export default store;

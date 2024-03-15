import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from "redux-thunk"
import userReducer from '../reducers/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['persist/PERSIST'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    // Agrega más reducers según sea necesario para otros datos en tu aplicación
   
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    // Agrega más reducers según sea necesario para otros datos en tu aplicación
  },
  
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
console.log(store.getState())

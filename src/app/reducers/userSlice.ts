import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: UserInfo | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface UserInfo {
  
  id: string;
  name: string;
  apellido?: string;
  email: string;
  phone: string;
  phoneopc?: string;
  imageUrl: string;
  matricula?: string;
  dni?: string;
  numeroOperador?: string;
  role: string;
  address: string;
  addressId: string;
  especialidad?: string;
  especialidad2?:string;
  especialidad3?:string;
  dependencia?: string;
  tipo:string
  descripcion:string
}

export interface UserWithId extends UserInfo {
  id: string;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserInfo | null>) {
      console.log("setCurrentUser action dispatched with payload:", action.payload);
      state.currentUser = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      console.log("setLoading action dispatched with payload:", action.payload);
      state.loading = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      console.log("setErrorMessage action dispatched with payload:", action.payload);
      state.errorMessage = action.payload;
    },
  },
});

export const { setCurrentUser, setLoading, setErrorMessage } = userSlice.actions;
export default userSlice.reducer;

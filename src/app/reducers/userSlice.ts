import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: UserInfo | null;
  selectedUser: UserInfo | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface UserInfo {
  
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
  especialidad?:string
  dependencia?:string
}
export interface UserWithId extends UserInfo{
    id: string;
}

const initialState: UserState = {
  currentUser: null,
  selectedUser: null,
  loading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserInfo | null>) {
        console.log("Nuevo usuario:", action.payload);
      state.currentUser = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<UserInfo | null>) {
      state.selectedUser = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setCurrentUser, setSelectedUser, setLoading, setErrorMessage } = userSlice.actions;

export default userSlice.reducer;

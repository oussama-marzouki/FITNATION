import { createSlice } from '@reduxjs/toolkit';

const client = JSON.parse(localStorage.getItem('client'))  ;



const clientSlice = createSlice({
  name: 'client',
  initialState : client ? client : null , 
  reducers: {
    setClientData: (state, action) => {
      localStorage.setItem('client' , JSON.stringify(action.payload)) ;
      return action.payload;
    },
  },
});

export const { setClientData } = clientSlice.actions;

export default clientSlice.reducer ;
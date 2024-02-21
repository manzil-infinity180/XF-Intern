import {createSlice} from "@reduxjs/toolkit"
const initialStateAcc = {
    isAuthenticated:false,
    loading:false,
    isRedirect:false
}

const accSlice = createSlice({
    name:"account",
    initialState:initialStateAcc,
    reducers:{
        OtpRequest(state){
          state.loading = true
        },
        otpSuccess(state,action){
            state.loading = true,
            state.isRedirect = true
            state.message = action.payload
        },
        otpFail(state,action){
            state.loading = true,
            state.isRedirect = false
            state.error = action.payload
        },
        register(state){
            state.loading = true
        },
        registerSuccess(state,action){
            state.isAuthenticated = true,
            state.loading = false,
            state.user = action.payload
        },
        registerFailure(state,action){
            state.isAuthenticated = false,
            state.error = action.payload,
            state.loading = false
        },
        loginSuccess(state,action){
            state.isAuthenticated = true,
            state.message = action.payload
        },
        loadingFailure(state,action){
            state.isAuthenticated = false,
            state.error= action.payload
        }
    }

});
export const {
    OtpRequest,
    register,otpFail,
    otpSuccess,
     registerSuccess,loginSuccess,loadingFailure
    } = accSlice.actions;
    
export default accSlice.reducer;
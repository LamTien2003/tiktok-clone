import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '@/api/axiosClient';
import { setTokens, deleteToken } from '@/utils/storage';

const initialState = {
    isModal: true,
    isLogin: false,
    user: null,
    loginSuccess: false,
    loginError: false,
};

export const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModal = true;
        },
        closeModal: (state) => {
            state.isModal = false;
        },
        loginStart: (state) => {
            state.isLogin = true;
            state.loginError = false;
            state.loginSuccess = false;
        },
        loginSuccess: (state, action) => {
            state.isLogin = false;
            state.loginError = false;
            state.loginSuccess = true;
            state.user = { ...action.payload.data, token: action.payload.meta.token };
        },
        loginError: (state) => {
            state.isLogin = false;
            state.loginError = true;
            state.loginSuccess = false;
        },
        logout: (state) => {
            state.isLogin = false;
            state.loginError = false;
            state.loginSuccess = false;
            state.user = null;
        },
    },
});
export const handleRegister = (values) => {
    return async (dispatch) => {
        try {
            const response = await axiosClient.post('auth/register', {
                type: 'email',
                email: values.userName,
                password: values.password,
            });
            dispatch(loginSuccess(response));
            setTokens(response.meta.token);
            dispatch(closeModal());
        } catch (err) {
            console.log(err);
        }
    };
};
export const handleLogin = (values) => {
    return async (dispatch) => {
        try {
            const response = await axiosClient.post('auth/login', {
                email: values.userName,
                password: values.password,
            });
            dispatch(loginSuccess(response));
            setTokens(response.meta.token);
            dispatch(closeModal());
        } catch (err) {
            if (err.response.status === 401) {
                alert('Tài khoản hoặc mật khẩu không đúng');
            }
        }
    };
};
export const handleLogout = () => {
    return async (dispatch) => {
        dispatch(logout());
        deleteToken();
        dispatch(closeModal());
    };
};
// Action creators are generated for each case reducer function
export const { openModal, closeModal, loginStart, loginSuccess, loginError, logout } = authSlice.actions;

export default authSlice.reducer;

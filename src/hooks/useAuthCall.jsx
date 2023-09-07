// //? Bir hook sadece bir react component ve bir custom hook icersinde cagrilabilir. Bir Js fonksiyonu icerisinde hook cagiralamaz.

import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    registerSuccess,
} from "../features/authSlice";

const authApiCall = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (userData) => {
        // const BASE_URL = "https://11536.fullstack.clarusway.com";

        //***************.env/.env.local/.env.production.localpro**************
        // ?console.log(import.meta.env.VITE_API_KEY); //?.env.localin cagrilmasi
        //? console.log(import.meta.env.VITE_API_KEY_PROD); //?undefined olarak gözükür cünkü bu sadece canlida gözükür
        //?canliya almak icin terminalden
        //!pnpm build
        //!canlidaki halini görmek icin pnpm preview komutlari yazmalisin
        //********************************************************************

        dispatch(fetchStart());
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/account/auth/login/`,
                userData
            );
            dispatch(loginSuccess(data));
            toastSuccessNotify("login islemi basarili");
            navigate("/stock");
        } catch (error) {
            console.log(error.message); //?axios error altindaki message i bastik
            dispatch(fetchFail());
            // toastErrorNotify("login islemi basarisiz");
            toastErrorNotify(error.response.data.non_field_errors[0]);
        }
    };

    const logout = async () => {
        dispatch(fetchStart());
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/account/auth/logout/`
            );
            dispatch(logoutSuccess());
            toastSuccessNotify("logout islemi basarili");
            navigate("/");
        } catch (error) {
            console.log(error);
            dispatch(fetchFail());
            toastErrorNotify("logout islemi basarisiz");
        }
    };

    const register = async (userData) => {
        dispatch(fetchStart());
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/account/register/`,
                userData
            );
            dispatch(registerSuccess(data));
            toastSuccessNotify("kayit islemi basarili");
            navigate("/stock");
        } catch (error) {
            console.log(error.message); //?axios error altindaki message i bastik
            dispatch(fetchFail());
            // toastErrorNotify("login islemi basarisiz");
            toastErrorNotify("Kayit islemi basarisiz olmustur.");
        }
    };
    return { login, logout, register };
};

export default authApiCall;

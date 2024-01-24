import React, { useContext, useEffect, useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate, Outlet
} from "react-router-dom";
import axios from 'axios';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Navbar from "../components/Navbar";
import { AuthContext } from '../context/AuthContext';
import { loginSuccessful, logout } from '../context/AuthAction';

const apiUrl = import.meta.env.VITE_API_URL;

const Index = () => {
    const { dispatch, user } = useContext(AuthContext);

    useEffect(() => {
        dispatch(logout());

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${apiUrl}/auth/login/success`, {
                    withCredentials: true,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (res) {
                    const data = res.data;
                    dispatch(loginSuccessful(data?.payload?.user));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [dispatch]);

    const Layout = () => {
        return (
            <div>

                <Navbar user={user} />
                <div className="bg-slate-200 w-full min-h-[calc(100vh-48px)]">
                    <Outlet />
                </div>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home user={user} />
                },
                {
                    path: "/register",
                    element: (
                        !user ? <Register /> : <Navigate to="/" replace />
                    )
                },
                {
                    path: "/login",
                    element: (
                        !user ? <Login /> : <Navigate to="/" replace />
                    )
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Index;
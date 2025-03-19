import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
    // const isLoggedIn = useSelector();
    const [profile, setProfile] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                "https://library-bookstore.onrender.com/api/v1/get-user-information",
                { headers }
            );
            setProfile(res.data);
        };
        fetch();
    }, []);

    return (
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
            {!profile && (
                <div className="w-full h-[100%] flex items-center justify-center">
                    <Loader />
                </div>
            )}

            {profile && (
                <>
                    <div className="w-full md:w-1/6">
                        <Sidebar data={profile} />
                    </div>
                    <div className="w-full md:w-5/6">
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;

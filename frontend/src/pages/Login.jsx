import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
    const [values, setValue] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    };

    const submit = async () => {
        try {
            if (values.username === "" || values.password === "") {
                alert("Please fill all fields");
            } else {
                const res = await axios.post(
                    "https://library-bookstore.onrender.com/api/v1/sign-in",
                    values
                );

                dispatch(authActions.login());
                dispatch(authActions.changeRole(res.data.role));
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                navigate("/profile");
            }
        } catch (error) {
            alert(error.res.data.message);
        }
    };

    return (
        <div className="h-[92.2vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Sign In</p>

                <div className="mt-4">
                    <div>
                        <label htmlFor="" className="text-zinc-400">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Username"
                            name="username"
                            required
                            value={values.username}
                            onChange={change}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Password"
                            name="password"
                            required
                            value={values.password}
                            onChange={change}
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
                            onClick={submit}
                        >
                            Login
                        </button>
                    </div>

                    <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                        Or
                    </p>
                    <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
                        Don't have an account? &nbsp;
                        <Link to="/signup" className="hover:text-blue-500">
                            <u>SignUp</u>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

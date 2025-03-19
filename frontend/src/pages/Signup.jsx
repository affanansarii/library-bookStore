import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [values, setValue] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const change = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                values.username === "" ||
                values.email === "" ||
                values.password === ""
            ) {
                alert("Please fill all fields");
            } else {
                const res = await axios.post(
                    "https://library-bookstore.onrender.com/api/v1/sign-up",
                    values
                );
                alert(res.data.message);
                navigate("/signin");
            }
        } catch (error) {
            alert(error.res.data.message);
        }
    };

    return (
        <div className="h-[92.2vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Sign Up</p>

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
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="xyz@example.com"
                            name="email"
                            required
                            value={values.email}
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
                            SignUp
                        </button>
                    </div>

                    <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                        Or
                    </p>
                    <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
                        Already have an account? &nbsp;
                        <Link to="/signin" className="hover:text-blue-500">
                            <u>Login</u>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

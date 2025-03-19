import React from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);

    return (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-center">
            <img src={data.avatar} className="h-[12vh]" />
            <p className="mt-3 text-xl text-zinc-100 font-semibold">
                {data.username}
            </p>
            <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
            <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

            {role === "admin" && (
                <div className="w-full flex-col items-center justify-center hidden lg:flex mt-10 mb-10">
                    <Link
                        to="/profile/add-book"
                        className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
                    >
                        Add Book
                    </Link>
                </div>
            )}

            <button
                className="bg-zinc-900 w-3/6 lg:w-full mt-10 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 hover:bg-white rounded hover:text-zinc-900 transition-all duration-300"
                onClick={() => {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    history("/");
                }}
            >
                Logout <FaArrowRightFromBracket className="ms-4" />
            </button>
        </div>
    );
};

export default Sidebar;

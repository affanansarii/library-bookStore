import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (
        <>
            {role === "admin" && (
                <div className="w-full flex lg:hidden items-center justify-between mt-4">
                    <Link
                        to="/profile/add-book"
                        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
                    >
                        Add Book
                    </Link>
                </div>
            )}
        </>
    );
};

export default MobileNav;

import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const BookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                `https://library-bookstore.onrender.com/api/v1/book/${id}`
            );
            setData(res.data.data);
        };
        fetch();
    }, []);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const deleteBook = async () => {
        const res = await axios.delete(
            "https://library-bookstore.onrender.com/api/v1/delete-book",
            {
                headers,
            }
        );
        alert(res.data.message);
        navigate("/dashboard");
    };

    return (
        <>
            {data && (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
                    <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center ">
                        <img
                            src={data.url}
                            alt={data.title}
                            className="h-[50vh] lg:h-[70vh] rounded"
                        />
                        {isLoggedIn === true && role === "admin" && (
                            <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 ml-10">
                                <Link
                                    to={`/update-book/${id}`}
                                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center"
                                >
                                    <FaEdit />
                                    <span className="ms-4 block lg:hidden">
                                        Edit Book
                                    </span>
                                </Link>

                                <button
                                    className="text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-0 lg:mt-8 bg-white flex items-center justify-center"
                                    onClick={deleteBook}
                                >
                                    <MdOutlineDelete />
                                    <span className="ms-4 block lg:hidden">
                                        Delete Book
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-4  w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">
                            {data.title}
                        </h1>
                        <p className="text-zinc-400 mt-1">by {data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">
                            by {data.description}
                        </p>
                        <p className="flex text-zinc-400 mt-4 items-center justify-start">
                            Publication Year: {data.year}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Genre: {data.genre}
                        </p>
                    </div>
                </div>
            )}

            {!data && (
                <div className="h-screen bg-zinc-900 flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>
    );
    s;
};

export default BookDetails;

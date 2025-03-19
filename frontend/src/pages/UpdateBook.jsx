import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        genre: "",
        year: "",
        description: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                data.url === "" ||
                data.title === "" ||
                data.author === "" ||
                data.genre === "" ||
                data.year === "" ||
                data.description === ""
            ) {
                alert("All fields are required");
            } else {
                const res = await axios.put(
                    "https://library-bookstore.onrender.com/api/v1/update-book",
                    data,
                    { headers }
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    genre: "",
                    year: "",
                    description: "",
                });
                alert(res.data.message);
                navigate(`/book/${id}`);
            }
        } catch (error) {
            alert(error.res.data.message);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                `https://library-bookstore.onrender.com/api/v1/book/${id}`
            );
            setData(res.data.data);
        };
        fetch();
    }, []);

    return (
        <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Update Book
            </h1>
            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label htmlFor="" className="text-zinc-400">
                        Image
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Image Url"
                        name="url"
                        required
                        value={data.url}
                        onChange={change}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Title of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Title"
                        name="title"
                        required
                        value={data.title}
                        onChange={change}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Author of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Author"
                        name="author"
                        required
                        value={data.author}
                        onChange={change}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Genre of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Genre"
                        name="genre"
                        required
                        value={data.genre}
                        onChange={change}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Publication Year
                    </label>
                    <input
                        type="number"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Publication year"
                        name="year"
                        required
                        value={data.year}
                        onChange={change}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Description of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Description"
                        name="description"
                        required
                        value={data.description}
                        onChange={change}
                    />
                </div>

                <button
                    className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 translate-all duration-300 "
                    onClick={submit}
                >
                    Update Book
                </button>
            </div>
        </div>
    );
};

export default UpdateBook;

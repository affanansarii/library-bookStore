import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/Book/BookCard";
import axios from "axios";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(
                "https://library-bookstore.onrender.com/api/v1/get-all-books"
            );
            setData(res.data.data);
            setFilteredData(res.data.data);
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGenre) {
            filtered = filtered.filter((book) => book.genre === selectedGenre);
        }

        if (selectedAuthor) {
            filtered = filtered.filter(
                (book) => book.author === selectedAuthor
            );
        }

        if (selectedYear) {
            filtered = filtered.filter(
                (book) => book.publicationYear.toString() === selectedYear
            );
        }

        setFilteredData(filtered);
    }, [searchTerm, selectedGenre, selectedAuthor, selectedYear, data]);

    // Extract unique values for filters
    const genres = [...new Set(data.map((book) => book.genre))];
    const authors = [...new Set(data.map((book) => book.author))];
    const years = [...new Set(data.map((book) => book.publicationYear))];

    return (
        <div className="bg-zinc-900 px-12 py-8 h-auto">
            <h4 className="text-3xl text-yellow-100">All Books</h4>

            {/* Search & Filters */}
            <div className="my-4 flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 rounded bg-gray-800 text-white w-full sm:w-1/3"
                />

                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="p-2 rounded bg-gray-800 text-white w-full sm:w-1/4"
                >
                    <option value="">Filter by Genre</option>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="p-2 rounded bg-gray-800 text-white w-full sm:w-1/4"
                >
                    <option value="">Filter by Author</option>
                    {authors.map((author, index) => (
                        <option key={index} value={author}>
                            {author}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 rounded bg-gray-800 text-white w-full sm:w-1/4"
                >
                    <option value="">Filter by Year</option>
                    {years.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loader */}
            {!filteredData.length && (
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>
            )}

            {/* Books Grid */}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {filteredData.map((item, index) => (
                    <div key={index}>
                        <BookCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

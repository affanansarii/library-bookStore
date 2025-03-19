import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BookDetails from "./components/BookDetails/BookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);
    useEffect(() => {
        if (
            localStorage.getItem("id") &&
            localStorage.getItem("token") &&
            localStorage.getItem("role")
        ) {
            dispatch(authActions.login());
            dispatch(authActions.changeRole(localStorage.getItem("role")));
        }
    }, []);

    return (
        <div>
            <Navbar />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />}>
                    {role === "admin" && (
                        <Route path="/profile/add-book" element={<AddBook />} />
                    )}
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/update-book/:id" element={<UpdateBook />} />
                <Route path="/book/:id" element={<BookDetails />} />
            </Routes>
        </div>
    );
};

export default App;

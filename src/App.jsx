import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from './main';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Homes from './components/Home/Homes';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails.jsx'; // Corrected typo
import MyJobs from './components/Job/MyJobs';
import PostJob from './components/Job/PostJob';
import Application from './components/Applications/Application';
import MyApplications from './components/Applications/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:9000/api/v1/user/getuser',
                    {
                        withCredentials: true,
                    }
                );
                setUser(response.data.user);
                setIsAuthorized(true);
            } catch (error) {
                setIsAuthorized(false);
            }
        };
        fetchUser();
    }, [isAuthorized]);

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                  
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Homes />} />
                    <Route path="/job/getall" element={<Jobs />} />
                    <Route path="/job/:id" element={<JobDetails />} /> 
                    <Route path="/job/post" element={<PostJob />} />
                    <Route path="/job/me" element={<MyJobs />} />
                    <Route path="/application/:id" element={<Application />} />
                    <Route path="/applications/me" element={<MyApplications />} />
                    <Route path="*" element={<NotFound />} /> 
                </Routes>
                <Footer />
                <Toaster />
            </Router>
        </>
    );
};

export default App;

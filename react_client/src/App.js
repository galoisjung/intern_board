import React, {useEffect, useState} from "react";
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Hello} from "./Hello";
import {useCookies} from "react-cookie";
import {BrowserRouter, Route, Router, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import Write from "./Write";


function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [currentStatus, setCurrentStatus] = useState('logged out')
    const [cookies] = useCookies(['session_key'])
    const toggleForm = (formName) => {
        window.location.href = formName;
        console.log(currentForm)
    }
    const loginStatus = (stat) => {
        setCurrentStatus(stat);
        console.log(stat)
    }
    // const [api] = useState(JSON.stringify('http://localhost:5000/api/phishing'))
    axios.defaults.withCredentials = true;
    return (
        <div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/hello" element={<Hello/>}/>
                <Route path="/write" element={<Write/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;
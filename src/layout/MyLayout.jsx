import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ErrorPages from '../pages/ErrorPages';
import Detailes from '../pages/Detailes';

function MyLayout() {

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark")
  }

  const setLigthMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light")
  }

  const toggenThem = (e) =>{
    if (e.target.checked) {
      setDarkMode()
    }else{
      setLigthMode()
    }
  }


  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">Home</a>
          </li>
          <li>
            <a href="/login" className="hover:underline">Login</a>
          </li>
          <li>
            <a href="/register" className="hover:underline">Register</a>
          </li>

          <input type="checkbox" onChange={toggenThem}/>

        </ul>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Detailes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPages />} />
        </Routes>
      </div>
    </div>
  );
}

export default MyLayout;

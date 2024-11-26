import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Layout = () => {
  useEffect(() => {
    AOS.init({
    duration: 1000, // Global animation duration
    once: false, // Only once animation
    });
  }, []);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <ToastContainer/>
        <ScrollRestoration />
    </div>
  )
}

export default Layout

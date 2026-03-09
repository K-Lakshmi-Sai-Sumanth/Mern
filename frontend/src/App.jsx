import { BrowserRouter, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  const Login = lazy(() => import("./pages/Login"));
  const Register = lazy(() => import("./pages/Register"));
  const Posts = lazy(() => import("./pages/Posts"));

  return (
    <BrowserRouter>
      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

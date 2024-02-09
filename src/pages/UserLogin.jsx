import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../components/authorization/api";

function UserLogin() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginToken = (token) => {
    localStorage.setItem("accessTokenUser", token.accessTokenUser);
    localStorage.setItem("refreshTokenUser", token.refreshTokenUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/profile/login", formData);
        toast.success("Login Successfully");
        handleLoginToken(response.data);
        navigate("/");
      } catch (error) {
        console.log("Login failed", error.response.data);
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="mx-10 sm:mx-0">
        <h1 className="font-bold text-3xl text-gray-600 text-center my-20">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            placeholder="email"
            className={`bg-slate-100 p-3 rounded-xl shadow-lg ${
              errors.email && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          <input
            type="password"
            id="password"
            placeholder="password"
            className={`bg-slate-100 p-3 rounded-xl shadow-lg ${
              errors.password && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
          <button
            type="submit"
            className="bg-gray-800 text-cyan-50 p-3 my-6 rounded-xl shadow-inner text-xl font-bold hover:opacity-90"
          >
            LOGIN
          </button>
        </form>
        <span className="my-5 italic">Don't have an Account ?</span>
        <Link to="/register">
          <span className="text-blue-600 mx-5 font-bold">Register</span>
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;

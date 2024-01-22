import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserLogin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLoginToken = (token) => {
    localStorage.setItem("accessTokenUser", token.accessTokenUser);
    localStorage.setItem("refreshTokenUser", token.refreshTokenUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/v1/user/profile/login", formData)
      .then((response) => {
        console.log(response);
        toast.success("Login Successfully");
        handleLoginToken(response.data);
        console.log("Login successful", response.data);
        navigate("/");
      })
      .catch((error) => {
        navigate("/login");
        console.log("Login failed", error.response.data);
        toast.error("Login failed");
        
      });
  };

  return (
    <div className="max-w-lg mx-auto p-4 ">
      <div>
        <h1 className="font-bold text-3xl text-gray-600 text-center my-20">
          USER LOGIN
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            placeholder="email"
            className="bg-slate-100 p-3 rounded-xl shadow-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="bg-slate-100 p-3 rounded-xl shadow-lg"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-gray-800 text-cyan-50 p-3 my-6 rounded-xl shadow-inner text-xl font-bold hover:opacity-90"
          >
            LOGIN
          </button>
        </form>
        <span className="my-5 italic">Dont have an Account ?</span>
        <Link to="/register">
          <span className="text-blue-600 mx-5 font-bold">Register</span>
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;

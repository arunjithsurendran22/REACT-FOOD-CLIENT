import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../components/authorization/api";

function ForgotPassword() {
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
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/profile/forgot-password", formData);
        console.log(response.data);
        toast.success(response.data.message);
        navigate("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Forgot password request failed. Please try again.");
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="mx-10 sm:mx-0">
        <h1 className="font-bold text-3xl text-gray-600 text-center my-20">
          FORGOT PASSWORD
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className={`bg-slate-100 p-3 rounded-xl shadow-lg ${
              errors.email && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          <button
            type="submit"
            className="bg-gray-800 text-cyan-50 p-3 my-6 rounded-xl shadow-inner text-xl font-bold hover:opacity-90"
          >
            RESET PASSWORD
          </button>
        </form>
        <span className="my-5 italic">Remember your password?</span>
        <Link to="/login">
          <span className="text-blue-600 mx-5 font-bold">Login</span>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../components/authorization/api";
import { toast } from "react-toastify";

function UserRegister() {
  const inputFocus = useRef();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Validate input fields in real-time
    validateField(e.target.id, e.target.value);
  };
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const validateField = (field, value) => {
    let error = "";
    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!value.includes("@")) {
        error = "Email must contain @";
      } else {
        error = "";
      }
    } else if (field === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)
      ) {
        error =
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character (@, $, !, %, *, ?, or &)";
      } else {
        error = "";
      }
    } else if (field === "mobile") {
      if (!value) {
        error = "Mobile is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Mobile number must be 10 digits";
      } else {
        error = "";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/profile/register", formData);
        console.log("Registration successful:", response.data);
        if (response.data.message === "user registered successfully") {
          toast.success("User registered successfully");
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Handle backend validation errors
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          console.log("Register failed", error);
        }
      }
    }
  };

  const validateForm = () => {
    const nameError = errors.name;
    const emailError = errors.email;
    const passwordError = errors.password;
    const mobileError = errors.mobile;
    return (
      nameError === "" &&
      emailError === "" &&
      passwordError === "" &&
      mobileError === ""
    );
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="mx-10 sm:mx-0">
        <h1 className="font-bold text-3xl text-cyan-600 text-center my-20">
          REGISTER USER
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            ref={inputFocus}
            type="text"
            id="name"
            placeholder="Name"
            className="bg-slate-100 p-3 rounded-xl shadow-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            id="mobile"
            placeholder="Mobile"
            className={`bg-slate-100 p-3 rounded-xl shadow-lg ${
              errors.mobile && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.mobile && (
            <span className="text-red-500">{errors.mobile}</span>
          )}
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
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`bg-slate-100 p-3 rounded-xl shadow-lg ${
              errors.password && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
          <button
            type="submit"
            className="bg-gray-800 text-cyan-50 p-3 my-6 rounded-xl shadow-inner text-xl font-bold hover:opacity-90"
          >
            REGISTER
          </button>
        </form>
        <div>
          <span className="italic">Have an Account ?</span>
          <Link to="/login">
            <span className="text-blue-800 mx-5 font-bold">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;

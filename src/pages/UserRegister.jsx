import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function UserRegister() {
  const [formData, setFormData] = useState({});
  const navigate =useNavigate()

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/profile/register",
        formData
      );
      console.log(response);
      console.log("Registration successful:", response.data);
      navigate('/login');
    } catch (error) {
      console.log("Register failed", error.response.data);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-4">
      <div>
        <h1 className="font-bold text-3xl text-cyan-600 text-center my-20">
          REGISTER USER
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
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
            className="bg-slate-100 p-3 rounded-xl shadow-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-xl shadow-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-xl shadow-lg"
            onChange={handleChange}
          />
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

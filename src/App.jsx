import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navabr from "./components/shared/Navbar";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import Favourites from "./pages/Favourites";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Navabr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart toast={toast} />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="user-orders" element={<Orders />} />
          <Route path="user-address" element={<Address />} />
          <Route path="user-favourites" element={<Favourites />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

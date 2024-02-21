import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import VendorPage from "./pages/VendorPage";
import NavbarBottom from "./components/shared/NavbarBottom";
import ForgotPassword from "./pages/ForgotPassword";
import ProfileProvider from "../src/components/shared/profile/ProfileProvider";
import Search from "./pages/Search";
import { AuthProvider } from "../src/components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Navabr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart toast={toast} />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/search" element={<Search />} />
            <Route path="/vendor-page/:vendorId" element={<VendorPage />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<Orders />} />
              <Route path="user-address" element={<Address />} />
              <Route path="user-favourites" element={<Favourites />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          <NavbarBottom />
          <ToastContainer />
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;

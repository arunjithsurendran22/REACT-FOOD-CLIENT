import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import api from "../../authorization/api";
import { toast } from "react-toastify";
import ProfilePhoto from "./ProfilePhoto";

const ProfileEdit = () => {
  const [openRight, setOpenRight] = useState(false);
  const [formData, setFormData] = useState({
    newName: "",
    newMobile: "",
    newEmail: "",
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    const formErrors = {};
    if (!formData.newName) {
      formErrors.newName = "Name is required";
    }
    if (!formData.newEmail) {
      formErrors.newEmail = "Email is required";
    } else if (!isValidEmail(formData.newEmail)) {
      formErrors.newEmail = "Invalid email format";
    }
    if (!formData.newMobile) {
      formErrors.newMobile = "Mobile number is required";
    }
    if (!formData.newPassword) {
      formErrors.newPassword = "New password is required";
    }
    if (!formData.oldPassword) {
      formErrors.oldPassword = "Old password is required";
    }
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await api.put("/profile/update-profile", formData);
      console.log(response.data.message);
      toast.success("successfully updated");
      closeDrawerRight();

      setFormData({
        newName: "",
        newMobile: "",
        newEmail: "",
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log("Failed to update profile", error);
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4 ">
        <Button
          onClick={openDrawerRight}
          className="md:bg-red-500 md:hover:bg-red-800 md:block hover:bg-red-700  items-center  md:p-2 p-2"
        >
          <MdEdit />
        </Button>
      </div>

      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Edit profile
            <ProfilePhoto />
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="newName"
              placeholder="name"
              value={formData.newName}
              onChange={handleChange}
              className={`border border-gray-400 p-3 my-3 rounded-lg ${
                errors.newName && "border-red-500"
              }`}
            />
            {errors.newName && (
              <span className="text-red-500">{errors.newName}</span>
            )}
            <input
              type="email"
              name="newEmail"
              placeholder="email"
              value={formData.newEmail}
              onChange={handleChange}
              className={`border border-gray-400 p-3 my-3 rounded-lg ${
                errors.newEmail && "border-red-500"
              }`}
            />
            {errors.newEmail && (
              <span className="text-red-500">{errors.newEmail}</span>
            )}
            <input
              type="number"
              name="newMobile"
              placeholder="contact"
              value={formData.newMobile}
              onChange={handleChange}
              className={`border border-gray-400 p-3 my-3 rounded-lg ${
                errors.newMobile && "border-red-500"
              }`}
            />
            {errors.newMobile && (
              <span className="text-red-500">{errors.newMobile}</span>
            )}
            <input
              type="password"
              name="newPassword"
              placeholder="new password"
              value={formData.newPassword}
              onChange={handleChange}
              className={`border border-gray-400 p-3 my-3 rounded-lg ${
                errors.newPassword && "border-red-500"
              }`}
            />
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword}</span>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`border border-gray-400 p-3 my-3 rounded-lg ${
                errors.confirmPassword && "border-red-500"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword}</span>
            )}
            <input
              type="password"
              name="oldPassword"
              placeholder="old password"
              value={formData.oldPassword}
              onChange={handleChange}
              className={`border border-gray-400 p-3 my-3 rounded-lg ${
                errors.oldPassword && "border-red-500"
              }`}
            />
            {errors.oldPassword && (
              <span className="text-red-500">{errors.oldPassword}</span>
            )}
            <Button type="submit" color="red" className="py-4 hover:bg-red-800">
              UPDATE
            </Button>
          </form>
        </Typography>
      </Drawer>
    </React.Fragment>
  );
};

export default ProfileEdit;

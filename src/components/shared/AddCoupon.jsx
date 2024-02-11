import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import api from "../authorization/api";
import { useDispatch } from "react-redux";
import { updateGrandTotal } from "../ReduxToolkit/cartReducer";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const [openRight, setOpenRight] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await api.get("/products/coupon-list/get");
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Failed to get coupons:", error);
        toast.error("Failed to get coupons");
      }
    };
    fetchCoupon();
  }, []);
  
  const handleAddCoupon = async (couponId) => {
    try {
      const response = await api.post(
        `/products/coupon-list/apply-coupon/${couponId}`
      );
      const { updatedCart } = response.data;

      if (response.data.success) {
        const { grandTotal } = updatedCart;
        dispatch(updateGrandTotal(grandTotal));
        closeDrawerRight();
        toast.success("Coupon applied successfully");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <Button
          color="red"
          onClick={openDrawerRight}
          className="shadow-md hover:shadow-lg transition duration-300"
        >
          Add Coupon
        </Button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blueGray">
            Coupons
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
        <div className="space-y-4">
          {coupons.map((coupon, index) => (
            <div
              key={index} // Using index as the key
              className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
            >
              <div>
                <Typography variant="paragraph" color="blueGray">
                  {coupon.title}
                </Typography>
                <Typography>{coupon.percentage}% off</Typography>
              </div>
              <Button
                color="red"
                onClick={() => handleAddCoupon(coupon._id)}
                className="shadow-md hover:shadow-lg transition duration-300"
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default AddCoupon;

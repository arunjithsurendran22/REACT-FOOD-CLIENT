import React, { useEffect, useState } from "react";
import { Drawer, Button, IconButton } from "@material-tailwind/react";
import { toast } from "react-toastify";
import api from "../components/authorization/api";

export function DrawerPlacement() {
  const [openRight, setOpenRight] = React.useState(false);
  const [inputCoupon, setInputCoupon] = useState("");
  const [coupons, setCoupons] = useState([]);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get("/products/coupon-list/get");
        setCoupons(response.data.coupons);
      } catch (error) {
        toast.error("Failed to fetch coupons");
        console.log("Failed to fetch coupons");
      }
    };
    fetchCoupons();
  }, []);

  const handleSubmit = async (couponId) => {
    try {
      const response = await api.post(
        `/products/coupon-list/apply-coupon/${couponId}`
      );

      if (response.data.message === "Coupon applied successfully") {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to apply coupon");
      console.log("Failed to apply coupon", error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <Button onClick={openDrawerRight}>Apply Coupon</Button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-2"
      >
        <div className="mb-6 flex items-center justify-end">
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
        <div>
          <input
            type="text"
            name="applycoupon"
            value={inputCoupon}
            placeholder="Apply coupon"
            onChange={(e) => setInputCoupon(e.target.value)}
            className="py-2"
          />
          <button
            className="font-bold shadow-lg bg-orange-700 px-4 py-2 ml-2 rounded-sm font-sans italic"
            onClick={() => handleSubmit(inputCoupon)}
          >
            APPLY
          </button>
          <div className="mt-5">
            {coupons.map((item) => (
              <ul
                key={item._id}
                className="shadow-lg py-10 pl-5 border border-gray-300 mb-5"
              >
                <li>{item.title}</li>
                <li>{item.percentage}</li>
                <button
                  className="shadow-lg bg-orange-700 px-5 py-1 font-serif rounded-lg"
                  key={item._id}
                  onClick={() => handleSubmit(item._id)}
                >
                  APPLY
                </button>
              </ul>
            ))}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

import { useEffect, useState } from "react";
import api from "../authorization/api";
import { toast } from "react-toastify";
import { Button, Radio } from "@material-tailwind/react";

const Payment = ({ cartItem, totalToPay ,vendorId}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  console.log(vendorId);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/profile/get-profile");
        const { _id, name, email, mobile } = response.data;
        setName(name);
        setEmail(email);
        setMobile(mobile);
        setUserId(_id);
      } catch (error) {
        console.log("Failed to fetch user data:", error.message);
        toast.error("Failed to fetch user data");
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get("/profile/add-address/get");
        setAddresses(response.data.addresses);

        if (response.data.addresses.length > 0) {
          setSelectedAddress(response.data.addresses[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    };
    fetchAddresses();
  }, []);
  

  const handlePaymentFailed = (response) => {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Check if an address is selected
      if (!selectedAddress) {
        toast.error("Please select an address");
        setLoading(false);
        return;
      }

      // Step 1: Create an order
      const orderResponse = await api.post(
        "/products/order",
        {
          amount: totalToPay * 100,
          currency: "INR",
          receipt: "qwsaq1",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const order = orderResponse.data;
      console.log("Order details:", order);

      // Step 2: Initialize Razorpay payment
      const options = {
        key: "rzp_test_bhZf7vOSAgrRXf",
        amount: totalToPay,
        currency: "INR",
        name: "Food delivery",
        description: "Test Transaction",
        image:
          "https://i.pinimg.com/736x/d5/01/bb/d501bbab3b5f71d42e3fe37401bd6b92.jpg",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };

          try {
            // Step 3: Validate payment
            const validateRes = await api.post(
              "/products/order/validate",
              body,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const jsonRes = validateRes.data;
            const { orderId, paymentId } = jsonRes;
            console.log("Response from the server:", jsonRes);
            console.log("orderId", orderId);
            console.log("paymentId", paymentId);
            toast.success(jsonRes.message);

            // Step 4: Send payment details back to the server
            const paymentDetails = {
              orderId,
              paymentId: response.razorpay_payment_id,
              userId,
              vendorId,
              address: selectedAddress,
              cartItem,
              totalToPay,
            };
            console.log("paymentDetails", paymentDetails);
            try {
              const paymentResponse = await api.post(
                "/products/order/payment",
                paymentDetails,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const paymentData = paymentResponse.data;
              console.log("Payment details saved:", paymentData);
            } catch (error) {
              console.error("Error saving payment details:", error.message);
              toast.error("Error saving payment details");
            }
          } catch (error) {
            console.error("Error during payment validation:", error.message);
            toast.error("Error during payment validation");
          }
        },
        prefill: {
          name,
          email,
          contact: mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true,
        },
      };

      // Step 5: Open Razorpay payment modal
      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", handlePaymentFailed);

      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error making payment request:", error.message);
      toast.error("Error making payment request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between ">
      <div className="grid grid-cols-3 gap-4">
        {/* Empty box for adding a new address */}
        <div className="p-4 bg-white rounded-md shadow-md flex items-center justify-center">
          <span className="text-4xl">+</span>
          <span className="ml-2">Add Address</span>
        </div>
        {addresses.map((address) => (
          <div
            key={address._id}
            className="mb-2 p-4 bg-white rounded-md shadow-md"
          >
            <input
              type="radio"
              id={address._id}
              name="address"
              value={address}
              checked={selectedAddress === address}
              onChange={() => setSelectedAddress(address)}
            />
            <label htmlFor={address._id} className="ml-2 block">
              <span className="font-semibold">{address.street}</span>
              <span>{address.city},</span>
              <span>{address.state} -</span>
              <span>{address.pincode}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={paymentHandler}
          disabled={loading}
          className="px-8 py-3 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
        >
          {loading ? "Processing..." : "PROCEED TO PAYMENT"}
        </Button>
      </div>
    </div>
  );
};

export default Payment;

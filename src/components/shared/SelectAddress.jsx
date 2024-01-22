import { useState, useEffect } from 'react';
import api from '../authorization/api';

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // Fetch user addresses from the server
    api.get('/profile/add-address/get')
      .then(response => {
        // Assuming `existAddress` is the correct property name
        setAddresses(response.data.existAddress || []);
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
      });
  }, []);

  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleAddToCart = () => {
    // Send a request to the server to associate the selected address with the cart item
    if (selectedAddress) {
      api.post(`/products/select-address/add-to-cart/${selectedAddress}`)
        .then(response => {
          console.log(response.data.message);
          // Handle success, maybe redirect to the payment page
        })
        .catch(error => {
          console.error('Error selecting address:', error);
        });
    }
  };

  return (
    <div>
      <h2>Select Address</h2>
      <form>
        {addresses && addresses.map(address => (
          <div key={address._id}>
            <label>
              <input
                type="radio"
                name="address"
                value={address._id}
                checked={selectedAddress === address._id}
                onChange={() => handleAddressChange(address._id)}
              />
              {`${address.street}, ${address.city}, ${address.state}, ${address.pincode}`}
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddToCart}>Add to Cart</button>
      </form>
    </div>
  );
};

export default SelectAddress;

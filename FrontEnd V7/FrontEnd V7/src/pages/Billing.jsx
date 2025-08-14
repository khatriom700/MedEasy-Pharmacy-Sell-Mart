import React, { useState } from 'react';
import { Footer } from "../components";
import Address from '../models/address';
import { useNavigate } from 'react-router-dom';
import UserOrderService from '../services/userorder.service';
import store from '../redux/store';
import { toast } from 'react-toastify';

const Billing = () => {
    const [address, setAddress] = useState(new Address('', '', '', '', ''));
    const currentUser = store.getState().user;
    const [errorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddress = (e) => {
        e.preventDefault();

        // Ensure delivery date is in the future (minimum 2 days from today)
        const today = new Date();
        today.setDate(today.getDate() + 2); // Minimum 2 days ahead
        const deliveryDate = today.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'

        // Create order object with deliveryDate
        const orderData = {
            ...address,
            deliveryDate: deliveryDate
        };

        UserOrderService.saveOrder(currentUser.id, orderData)
            .then(() => {
                toast.success("Order Placed", { autoClose: 1500 });
                navigate("/product");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="container my-3 py-3">
                <h1 className="text-center">Check Out</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}
                        <form onSubmit={handleAddress}>
                            <div className="form my-3">
                                <label htmlFor="FName">Address Line1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="FName"
                                    name="addressLine1"
                                    value={address.addressLine1}
                                    placeholder="Address Line1"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="LName">Address Line2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="LName"
                                    name="addressLine2"
                                    value={address.addressLine2}
                                    placeholder="Address Line2"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="City">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="City"
                                    name="city"
                                    value={address.city}
                                    placeholder="City"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="State">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="State"
                                    name="state"
                                    value={address.state}
                                    placeholder="State"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="ZipCode">Zip Code</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="ZipCode"
                                    name="zipCode"
                                    value={address.zipCode}
                                    placeholder="Zip Code"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Billing;

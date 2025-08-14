import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Footer } from '../components';
import productService from '../services/product.service';

function DeleteProductAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const productId = location.state;

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        expDate: null
    });

    useEffect(() => {
        productService.getProductById(productId).then((resp) => {
            setProduct({
                name: resp.data.name,
                price: resp.data.price,
                description: resp.data.description,
                stock: resp.data.stock,
                expDate: resp.data.expDate
            });
        });
    }, [productId]);

    const handleDeleteProduct = (e) => {
        e.preventDefault();
        productService.deleteProduct(productId).then((resp) => {
            toast.success("Product Deleted", { autoClose: 1500 });
            navigate('/updateProduct');
        }).catch(() => {
            toast.error("Error deleting product");
        });
    };

    return (
        <>
            <div className="container my-3 py-3">
                <h1 className="text-center">Delete Product</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-6 col-lg-6 col-sm-8 mx-auto">
                        <h4>Are you sure you want to delete this product?</h4>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Price:</strong> {product.price}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Expiry Date:</strong> {product.expDate}</p>

                        <div className="text-center">
                            <button className="my-2 mx-2 btn btn-danger" onClick={handleDeleteProduct}>
                                Delete
                            </button>
                            <Link to="/deleteProduct" className="my-2 mx-2 btn btn-secondary">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default DeleteProductAdmin;

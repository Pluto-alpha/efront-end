import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const userId = JSON.parse(localStorage.getItem('UserInfo')).user._id;
const initialState = {
    name: '',
    price: '',
    category: '',
    company: '',
    userId: userId,
};

const AddProduct = () => {
    const [data, setData] = useState(initialState);
    const { name, price, category, company, userId } = data;
    const navigate = useNavigate();


    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ name: '', price: '', category: '', company: "" })
        console.log(data);
    }


    const Add = async () => {
        await axios.post(`http://localhost:5000/addProduct`, data, userId, {
            "headers": {
                "content-type": "application/json",
            }
        }).then((res) => {
            setData(res.data)
            if (res.status === 201) {
                console.log('Product added successfully');
                navigate('/')
            }
        })
    }
    return (
        <div className='row'>
            <div className='col-6 position-absolute top-50 start-50 translate-middle'>
                <div className='card px-5 py-3'>
                    <h1>Add Product</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input type='text' value={name} name='name' className='form-control' onChange={handleChange} placeholder='Name' />
                        </div>
                        <div className='mb-3'>
                            <input type='number' value={price} name='price' className='form-control' onChange={handleChange} placeholder='Price' />
                        </div>
                        <div className='mb-3'>
                            <input type='text' value={category} name='category' className='form-control' onChange={handleChange} placeholder='Category' />
                        </div>
                        <div className='mb-3'>
                            <input type='text' value={company} name='company' className='form-control' onChange={handleChange} placeholder='Company' />
                        </div>
                        <button className='btn btn-primary' type="submit" onClick={Add}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
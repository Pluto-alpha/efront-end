import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initailState = {
    name: '',
    email: '',
    password: '',
}

const Signup = () => {
    const [data, setData] = useState(initailState);
    const { name, email, password } = data;
    const [errors, setError] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("UserInfo");
        if(auth){
            navigate('/')
        }
    },[navigate]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const valiadate = () => {
        let errors = {};
        if (!name) {
            errors.name = 'Name field is required!'
        }
        if (!email) {
            errors.email = 'Email field is required!'
        }
        if (!password) {
            errors.password = 'Password field is required!'
        }
        return errors;

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = valiadate();
        if (Object.keys(errors).length) return setError(errors)
        console.log(data);
        setData({ name: '', email: '', password: '' });
    }

    const signUp = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/register`, data, {
            "headers": {
                "content-type": "application/json",
            }
        }).then((res) => {
            setData(res.data);
            if (res.status === 201) {
                console.log('User registered successsfully!');
                localStorage.setItem("UserInfo",JSON.stringify(res.data))
                navigate('/')
            }
        })
    }


    return (
        <div className='row col-md-4 position-absolute top-50 start-50 translate-middle'>
            <Card className='pb-5 px-5 shadow p-3 mb-5 bg-body rounded'>
                <h1 className='my-2'>Register</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name='name' value={name} onChange={handleChange} placeholder="Name" />
                        <div className='error'>{errors ? errors.name : null}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" name='email' value={email} onChange={handleChange} placeholder="Enter email" />
                        <div className='error'>{errors ? errors.email : null}</div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
                        <div className='error'>{errors ? errors.password : null}</div>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={signUp}>
                        Signup
                    </Button>
                </Form>
            </Card>

        </div>
    )
}

export default Signup
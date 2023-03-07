import React, { useState,useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
    email: "",
    password: "",
};


const Login = () => {
    const [data, setData] = useState(initialState);
    const { email, password } = data;
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("UserInfo");
        if (auth) {
            navigate('/')
        }
    },[navigate])
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ email: '', password: '' });
        console.log(data);
    }

    const login = async () => {
        await axios.post(`http://localhost:5000/login`, data, {
            "headers": {
                "content-type": "application/json",
            }
        }).then((res) => {
            setData(res.data)
            if (res.status === 200) {
                console.log('Login successsfully!');
                localStorage.setItem("UserInfo", JSON.stringify(res.data))
                navigate('/')
            }
        })
    }

    return (
        <div className='row col-md-4 position-absolute top-50 start-50 translate-middle'>
            <Card className='pb-5 px-5 shadow p-3 mb-5 bg-body rounded'>
                <h1 className='my-2'>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" name='email' value={email} onChange={handleChange} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={login}>
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default Login;
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../ReduxToolkit/AuthSlice';

export const Signin = ({ togglePanel }) => {
     const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData))
        console.log("login form", formData);
    };

    return (
        <div>
            <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter your password'
                    margin="normal"
                />
                <div>
                    <Button
                        type="submit"
                        fullWidth
                        className="customButton" // Correct class name
                        sx={{ padding: ".9rem" }}
                    >
                        Login
                    </Button>
                </div>
            </form>
            <div className="mt-4 flex text-center gap-2 py-5 justify-center">
                <span>Don't have an account? </span>
                <Button onClick={togglePanel} variant="text">Register</Button>
            </div>
        </div>
    );
};

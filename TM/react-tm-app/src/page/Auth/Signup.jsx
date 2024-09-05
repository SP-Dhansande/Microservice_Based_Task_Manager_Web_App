import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { register } from '../../ReduxToolkit/AuthSlice';


export const Signup = ({ togglePanel }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
        console.log("formData", formData);
    };

    return (
        <div>
            <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Full Name"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Enter your full name'
                />
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
                
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.role}
                        label="Role"
                        name="role"
                        onChange={handleChange}
                    >
                        <MenuItem value={"ROLE_CUSTOMER"}>USER</MenuItem>
                        <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
                    </Select>
                </FormControl>

                <div>
                    <Button
                        type="submit"
                        fullWidth
                        className="customButton"
                        sx={{ padding: ".9rem" }}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
            <div className="mt-4 text-center">
                <span>Already have an account? </span>
                <Button onClick={togglePanel} variant="text">Login</Button>
            </div>
        </div>
    );
};

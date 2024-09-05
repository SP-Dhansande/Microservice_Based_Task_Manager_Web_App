import React, { useState } from 'react';
import "./Auth.css";
import { Signin } from './Signin';
import { Signup } from './Signup'; // Assuming you have a Signup component

export const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const togglePanel = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>
      <div className="box lg:max-w-4xl">
        <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
          <div className="front">
            <img src="https://cdn.pixabay.com/photo/2024/05/24/18/14/astronaut-8785566_640.png" alt="Astronaut" className="img" />
            <div className="text">
              <span className='text-1'>Success is built</span>
              <span className='text-2'>with passion</span>
            </div>
          </div>
          <div className="back">
            <img src="https://cdn.pixabay.com/photo/2024/05/24/18/14/astronaut-8785566_640.png" alt="" />
            <div className="text">
              <span className='text-1'>Join us now</span>
              <span className='text-2'>Create an account</span>
            </div>
          </div>
        </div>
        <div className="forms h-full">
          <div className="form-content h-full">
            
            
              <div className="login-form">
                <Signin togglePanel={togglePanel} />
              </div>
            
              <div className="signup-form">
                <Signup togglePanel={togglePanel} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

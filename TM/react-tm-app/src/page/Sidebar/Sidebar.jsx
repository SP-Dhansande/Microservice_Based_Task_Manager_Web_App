import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import "./Sidebar.css";
import CreateNewTaskForm from '../../Task/CreateNewTaskForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../ReduxToolkit/AuthSlice';


const menu = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "Create New Task", role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] },
];

const role = "ROLE_ADMIN"; // This can be dynamically fetched or passed based on user role

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("Home");
  const [openCreateNewTaskForm, setOpenCreateNewTaskForm] = useState(false);

  const handleCloseCreateNewTaskForm = () => {
    setOpenCreateNewTaskForm(false);
  };

  const handleOpenCreateNewTaskModel = () => {
    setOpenCreateNewTaskForm(true);
  };

  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);

    if (item.name === "Create New Task") {
      handleOpenCreateNewTaskModel();
    } else if (item.name === "Home") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString ? `${location.pathname}?${queryString}` : location.pathname;
      navigate(updatedPath);
    } else {
      updatedParams.set("filter", item.value);
      const queryString = updatedParams.toString();
      const updatedPath = queryString ? `${location.pathname}?${queryString}` : location.pathname;
      navigate(updatedPath);
    }

    setActiveMenu(item.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out");
  };

  return (
    <>
      <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[20vw] gap-4'>
        <div className='space-y-5 h-full'>
          <div className='flex justify-center'>
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className='border-2 border-[#c24dd0]'
              src='https://cdn.pixabay.com/photo/2024/05/24/18/14/astronaut-8785566_640.png'
            />
          </div>
          {
            menu
              .filter((item) => item.role.includes(role))
              .map((item, index) => (
                <p key={index} onClick={() => handleMenuChange(item)}
                  className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu === item.value ? "activeMenuItem" : "menuItem"}`}
                >
                  {item.name}
                </p>
              ))
          }
          <Button onClick={handleLogout} sx={{ padding: ".7rem", borderRadius: "2rem" }} fullWidth className='logoutButton'>
            Logout
          </Button>
        </div>
      </div>
      <CreateNewTaskForm open={openCreateNewTaskForm} handleClose={handleCloseCreateNewTaskForm} />
    </>
  );
};

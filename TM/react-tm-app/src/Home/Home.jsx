import React from 'react'
import { Sidebar } from '../page/Sidebar/Sidebar'
import { TaskList } from '../TaskList/TaskList'

export const Home = () => {
    return (
        <div className='lg:flex px-5 lg:px-20 pt-[2.9vh}'>
            <div className='hidden lg:block w-[25vw] relative'>
                <Sidebar />
            </div>
            <div className='right-side-bar w-full flex justify-center mb-10'>
                <TaskList/>
            </div>
        </div>
    )
}

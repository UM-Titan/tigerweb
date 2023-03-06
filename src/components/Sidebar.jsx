import React, { useState } from 'react';
import {
    FaTh,
    FaHome,
    FaBars,
    FaRegChartBar
}from "react-icons/fa";

import { NavLink } from 'react-router-dom';
import '../App.css'

const Sidebar = ({children}) =>{
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaHome/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaTh/>
        },
        {
            path:"/Explorer",
            name:"BATT",
            icon:<FaRegChartBar/>
        }
    ]
    
    return (
        <div className="siderow">
            <div style={{width: isOpen ? "200px" : "60px", height:'100%'}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">TigerEye</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>

                </div>

                {
                    menuItem.map((item,index) =>(
                        <NavLink to={item.path} key={index} className="link" >
                            <div className="icon" >{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} 
                                className="link_text">{item.name}</div>
                        </NavLink>
                        

                    ))
                }

            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar
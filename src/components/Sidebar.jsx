import React, { useState } from 'react';
import {
    FaTh,
    FaHome,
    FaBars,
    FaRegChartBar
}from "react-icons/fa";
import { Tooltip } from '@chakra-ui/react'

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
        <div style={{height: "100vh", width: "70px", marginLeft: "10px", zIndex: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} className='siderow'>
            <div style={{height: "400px", width: "70px", marginRight: "10px", background: "rgba(0, 0, 0, 0.62)", backdropFilter: "blur(12.7px)", WebkitBackdropFilter: "blur(12.7px)", borderRadius: "50px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"
        }}>
            {/* <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                <h1 style={{ display: isOpen ? "block" : "none", color: "white" }} className="logo">TigerEye</h1>
                <div style={{ marginLeft: isOpen ? "50px" : "0px", color: "white" }} className="bars">
                    <FaBars onClick={toggle} />
                </div>
            </div> */}
            

            {menuItem.map((item, index) => (
                <Tooltip label={`${item.name}`} color={"black"} borderRadius={"5px"} padding={"10px"} backgroundColor={"white"} placement="right" aria-label='A tooltip'>
                    <NavLink to={item.path} key={index} className="link">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }}
                            className="link_text">{item.name}</div>
                    </NavLink>
              </Tooltip>
                


            ))}

        </div><main>{children}</main></div>
        
    )
}

export default Sidebar
import React from 'react';
// import logo from '../logo.svg';
import '../App.css';
import video from '../data/tiger.mp4'
const Home = () => {
    return (
        <div style={{width:'100%',height:'100%', overflow: "hidden",
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0}}>
            
                <video src={video} style={{position: "absolute",
    top: "50%",
    left: "50%",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    transform: "translate(-50%, -50%)"}} autoPlay muted loop/>
            
        </div>
    );
};

export default Home;
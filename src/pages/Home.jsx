import React from 'react';
// import logo from '../logo.svg';
import '../App.css';
import video from '../data/tiger.mp4'
const Home = () => {
    return (
        <div style={{width:'100%',height:'100%'}}>
            <div style={{width:'100%',height:'100%'}}>
                <video src={video} width='100%' autoPlay muted loop/>
            </div>
        </div>
    );
};

export default Home;
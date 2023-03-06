import React from 'react';
import '../App.css';

// username: jeffcity
// password: TigerEye
const Analytics = () => {
    return (
        <div style={{width:'100%', margin:0, overflow:"hidden",height:'100vh'}}>
            <iframe  
                title='HeavyAI' width={'100%'} height={'100%'} margin={'1000'}
                
                src="https://heavy.ridsi-dash.com:6273/heavyai/dashboard/27?tab=-NObtLMVSssrxC22Q_Qb">

            </iframe>
        </div>
    );
};

export default Analytics;
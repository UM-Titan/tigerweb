import '../App__.css'
import React from 'react';
import { IonButton, IonCard, IonLabel } from '@ionic/react';
import { Chart } from "react-google-charts";

const options = {
    width: 450,
    height: 255,
    title:'Distress Types',
    legend: {
        alignment: 'center',
        position: 'left'
      },
    chartArea:{
        left:10,
        right:10,
        bottom:5,
        top:25,
        width: '100%',
        height: '100%'
    }
  };

  const pci_options = {
    width: 350,
    height: 250,
    redFrom: 0,
    redTo: 45,
    yellowFrom: 45,
    yellowTo: 65,
    minorTicks: 5,
  };

  const hist_options = {
    title: "Count of Distresses",
    chartArea: { width: "100%", height:'100%', left:150, top:20, bottom:150, right:20 },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "Distress Type",
    },
  };

const PieChart = (props) =>{
    
    return (
        
        <div>
            {props.dpies.length > 0 ? 
            <div className='boxdiv'>
                <IonCard className='chart-boxes' >
                    <Chart
                    chartType="PieChart"
                    width="50%"
                    data={props.dpies}
                    options={options}
                    />
                </IonCard>

            </div>
        
            :null}

        </div>
    )
}

const PciChart = (props) =>{
    
    return (
        
        <div>
            {props.dpies.length > 0 ? 
            <div className='boxdiv'>
                <IonCard className='chart-boxes' style={{width:'17rem',paddingLeft:'1rem'}}>
                    <Chart
                        chartType="Gauge"
                        width="100%"
                        // height="400px"
                        data={[['label','value'],['PCI',Math.round(props.apci)]]}
                        options={pci_options}
                    />
                </IonCard>

            </div>
        
            :null}

        </div>
    )
}

const ExtChart = (props) =>{
    
    return (
        
        <div>
            {props.dpies.length > 0 ? 
            <div className='boxdiv' >
                <IonCard className='tchart-boxes' >
                    <IonButton style={{width:'60%',marginTop:'10%', marginLeft:'4rem'}} size='large' fill="outline" >
                    Extent
                    </IonButton>
                    <IonLabel style={{fontSize:'80pt',color:'red',padding:'1rem'}}>{props.asvr.toFixed(1)}m</IonLabel>
                </IonCard>

            </div>
        
            :null}

        </div>
    )
}

const HistChart = (props) =>{
    
    return (
        
        <div>
            {props.dpies.length > 0 ? 
            // <div className='boxdiv'>
            <div >
                <IonCard className='chart-boxes' >
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={props.histdata}
                        options={hist_options}
                    />
                </IonCard>

            </div>
        
            :null}

        </div>
    )
}

export {PieChart, PciChart, ExtChart, HistChart}

// {
//     dpie.length > 0 ?
    
//     <div className='boxdiv'>

//     <IonCard className='chart-boxes' style={{width:'17rem',paddingLeft:'1rem'}}>
//       <Chart
//         chartType="Gauge"
//         width="100%"
//         // height="400px"
//         data={[['label','value'],['PCI',Math.round(avpci)]]}
//         options={pci_options}
//       />
//     </IonCard>

//       {/* <IonCard className='text-boxes' >
//       <IonButton style={{width:'90%'}}size='large' fill="outline" >
//         PCI
//       </IonButton>
//       <IonLabel style={{fontSize:'80pt',color:'red'}}>{Math.round(avpci)}</IonLabel>
//       </IonCard> */}
//       <IonCard className='text-boxes' >
//       <IonButton style={{width:'100%'}} size='large' fill="outline" >
//           Extent
//         </IonButton>
//         <IonLabel style={{fontSize:'80pt',color:'red'}}>{avrefl.toFixed(1)}m</IonLabel>
//   </IonCard>
//     <IonCard className='chart-boxes' >
//     <Chart
//       chartType="PieChart"
//       width="50%"
//       // height="100px"
//       data={dpie}
//       options={options}
//       // style={{backgroundColor:'red'}}
//     />
//     </IonCard>

    

//     </div>
//     :
//     null
//   }
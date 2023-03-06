import '../App__.css'
import React from 'react';
import {IonRange, IonItem, IonLabel, IonToggle, IonItemDivider, IonButton, IonCheckbox
} from '@ionic/react';
const avgValues = obj => Object.values(obj).reduce((a,b) => a+b)/Object.values(obj).length
const sumArray = array => array.reduce((a, b) => a + b,0)
const avgArray = array => array.reduce((a,b) => a+b)/array.length

const pieData = (dist_obj) => {
    const pie_data = []
    const rdkeys = Object.keys(dist_obj)
    pie_data.push(['cracks','percents'])
    for (var i=0; i<rdkeys.length;i++ ){
        pie_data.push([rdkeys[i], sumArray(dist_obj[rdkeys[i]])])
    }
    return pie_data
}


const SideDiv = (props) => {
    // console.log(props)
    return (
        <div className='map-filter'>
            <IonItemDivider style={{backgroundColor:'teal',color:'black',fontSize:16, marginTop:5}}>
            <IonLabel>Select Base MapStyle</IonLabel>
            </IonItemDivider> <br />
            <IonItem style={{marginTop:10, marginBottom:20}}>
            
            <IonItemDivider>
                <IonLabel style={{color:'black', fontSize:16}}>Satellite View</IonLabel>                
                <IonToggle  checked={props.satellite}  onIonChange={(event) =>{props.onStlChange(event.detail.checked)}} />
                </IonItemDivider>
            </IonItem> <br />

            {/* <h3> </h3> */}
            <IonItemDivider style={{backgroundColor:'teal',color:'black',fontSize:16}}>
              <IonLabel>Select Distress Types</IonLabel>
            </IonItemDivider> <br />
            <div style={{height:'22rem', marginBottom:'2rem',overflowY:'scroll'}}>
            <IonItem>
                <IonLabel>Alligator</IonLabel>
                {/* <IonToggle  checked={alchecked}  onIonChange={(e) => {switchToggle(e);filter_points_(alchecked,'Alligator Crack')}} /> */}
                <IonCheckbox checked={props.alchecked} onIonChange={(event) => {props.onAlchange(event.detail.checked)}}  />

            </IonItem><br />

            <IonItem>
                <IonLabel>Block</IonLabel>
                {/* <IonToggle  checked={blchecked}  onIonChange={e => {setBlchecked(e.detail.checked);filter_points_(blchecked,'Block Crack')}} /> */}
                <IonCheckbox  checked={props.blchecked}  onIonChange={e => {props.onBlchange(e.detail.checked)}} />
            </IonItem> <br />

            <IonItem>
                <IonLabel>Transverse</IonLabel>
                <IonCheckbox  checked={props.tlchecked}  onIonChange={e => {props.onTlchange(e.detail.checked)}} />
            </IonItem> <br />

            <IonItem>
                <IonLabel>Longitudinal</IonLabel>
                <IonCheckbox  checked={props.llchecked}  onIonChange={e => {props.onLlchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Potholes</IonLabel>
                <IonCheckbox  checked={props.plchecked}  onIonChange={e => {props.onPlchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Raveling</IonLabel>
                <IonCheckbox  checked={props.ravchecked}  onIonChange={e => {props.onRachange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Reflective</IonLabel>
                <IonCheckbox  checked={props.refchecked}  onIonChange={e => {props.onRfchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Spalling</IonLabel>
                <IonCheckbox  checked={props.spalchecked}  onIonChange={e => {props.onSpchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>PCC Joint</IonLabel>
                <IonCheckbox  checked={props.pccchecked}  onIonChange={e => {props.onPcchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Oil Spot</IonLabel>
                <IonCheckbox  checked={props.oilchecked}  onIonChange={e => {props.onOilchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Pop Out</IonLabel>
                <IonCheckbox  checked={props.popchecked}  onIonChange={e => {props.onPopchange(e.detail.checked)}} />
            </IonItem> <br />
            <IonItem>
                <IonLabel>Patch</IonLabel>
                <IonCheckbox  checked={props.patchchecked}  onIonChange={e => {props.onPatchchange(e.detail.checked)}} />
            </IonItem> <br />

            <IonItem>
                <IonLabel>Manhole</IonLabel>
                <IonCheckbox  checked={props.manchchecked}  onIonChange={e => {props.onManchchange(e.detail.checked)}} />
            </IonItem> <br />

            </div>

            <IonItem>
            <IonButton style={{width:'100%', color:'red'}} fill="outline" 
                onClick={() =>props.onFilterCheck()}
                // onClick = {clearFilters}
                >
                Reset Filters
            </IonButton>
            </IonItem> <br />

            <IonItemDivider style={{backgroundColor:'teal',color:'black',fontSize:16, marginTop:5}}>
              <IonLabel>Filter by PCI</IonLabel>
            </IonItemDivider> <br />

            


            <IonItem>
                <IonRange min={0} max={100} step={5} pin={true} value={props.pci_thresh} onIonChange={e => {props.onPctchange(e.detail.value)}} />
            </IonItem> <br />
            

        </div>
    )  
}

export {sumArray, avgArray, avgValues, pieData, SideDiv}
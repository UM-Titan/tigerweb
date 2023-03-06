import '../App__.css'
import React, {useState, useEffect} from 'react';
import MapGL, { Source, Layer,Popup,TrafficControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Draw from '@urbica/react-map-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import {avgArray, avgValues,pieData, SideDiv} from './functions'
import {PieChart, PciChart, ExtChart, HistChart} from './graphs'
import {ImageViews, ImageCarousel, LoadMore} from './images'
import * as geolib from 'geolib';


const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoieWF3b2t5ZXJlIiwiYSI6ImNrb2FpMzVocjBkYjUyb3FtdmdrbXEwYW4ifQ.qNlA0ASU5idyi6cr5Twg_w"

const Map = () =>{

    const [viewport, setViewport] = useState({
        latitude: 38.5767,
        longitude: -92.1735,
        zoom: 15
      });
    
    const [ satellite, setSatellite] = useState(false)
    const [data, setData] = useState([])
    const [data_ori, setOri] = useState([])
    const [pie,setPie] = useState([])

    const [pci_thresh,setPcithresh] = useState(100)
    const [ alchecked, setAlchecked] = useState(false)
    const [ blchecked, setBlchecked] = useState(false)
    const [ tlchecked, setTlchecked] = useState(false)
    const [ llchecked, setLlchecked] = useState(false)
    const [ plchecked, setPlchecked] = useState(false)
    const [ pccchecked, setPcchecked] = useState(false)
    const [ spalchecked, setSpchecked] = useState(false)
    const [ refchecked, setRfchecked] = useState(false)
    const [ ravchecked, setRachecked] = useState(false)
    const [ oilchecked, setOilchecked] = useState(false)
    const [ popchecked, setPopchecked] = useState(false)
    const [ patchchecked, setPatchchecked] = useState(false)
    const [ manchchecked, setManchchecked] = useState(false)

    const [apci, setPci] = useState('')
    const [asvr, setSvr] = useState('')
    const [histdata,setHistdata] = useState([])
    const [urlsel,setUrlsel] = useState('')
    const [urlpci,setUrlpci] = useState('')
    const [cpci,setCpci] = useState('')
    const [mapillary, setMapillary] = useState('')
    
    const [ show, setShow] = useState(false)
    const [ids, setId] = useState('')
    const [snapshot, setSnapshot] = useState([]);
    const [sname, setSname]= useState('');
    const [lng, setLng] = useState('')
    const [lat, setLat] = useState('')
    const [update, setUpdate] = useState(0)
    const [plg, setFeatures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetch('https://tiger.ridsi-dash.com:8000/jeffcity.geojson', {method:'GET', mode: 'cors'});
          const json = await data.json();
          setData(json);
          setOri(json);
        }
        fetchData()
      
        .catch(err => console.error('Could not load data', err));

      }, []);

    
      const nextFrame = (cid) => {        
        snapshot.map((url, i) => {
            if (url.properties['id'] === cid){
                if ((i+1) < snapshot.length){
                    setUrlsel(snapshot[i+1].properties.url);
                    setId(snapshot[i+1].properties.id)
                    setLat(snapshot[i+1].geometry.coordinates[1])
                    setLng(snapshot[i+1].geometry.coordinates[0])
                    setUrlpci(snapshot[i+1].properties.pci_avg)
                    setCpci(snapshot[i+1].properties.pci)
                    setMapillary(snapshot[i+1].properties.mapillary)
                    setSname(snapshot[i+1].properties.street_name)

                }
                
            }

            
        })
    }

    const prevFrame = (cid) => {
      snapshot.map((url, i) => {
            if (i>0){
                
                if (url.properties['id'] === cid){

                    setUrlsel(snapshot[i-1].properties.url);
                    setId(snapshot[i-1].properties.id)
                    setLat(snapshot[i-1].geometry.coordinates[1])
                    setLng(snapshot[i-1].geometry.coordinates[0])
                    setUrlpci(snapshot[i-1].properties.pci_avg)
                    setCpci(snapshot[i-1].properties.pci)
                    setMapillary(snapshot[i-1].properties.mapillary)
                    setSname(snapshot[i-1].properties.street_name)
                }

            }
            
        })
    }

    const onClick = (event) => {

        setUrlsel(event['features'][0].properties.url)
        setUrlpci(event['features'][0].properties.pci_avg)
        setCpci(event['features'][0].properties.pci)
        setMapillary(event['features'][0].properties.mapillary)
        setId(event['features'][0].properties.id)
        setLng(event['features'][0].geometry.coordinates[0])
        setLat(event['features'][0].geometry.coordinates[1])
        setSname(event['features'][0].properties.street_name)

        setShow(true)

        const street_name = event['features'][0].properties.street_name
        const filt_data = data.features.filter(element =>{
            if (element['properties']['street_name'] === street_name && element['properties']['pci'] <= pci_thresh){
              return true
            }
            return false
          })

        filt_data.sort((a, b) => (a.properties.id > b.properties.id) ? 1 : -1)
        setSnapshot(filt_data)

        const dist_obj = {}
        const dist_cnt = {}
        var distresses = []
        filt_data.map(road_feat =>{
            var dist_types = Object.keys(road_feat.properties.distress)
            for (var i=0; i<dist_types.length;i++){
                if (distresses.indexOf(dist_types[i]) === -1){distresses.push(dist_types[i])}
            }
        })

        for (var i=0; i<distresses.length;i++){
            dist_obj[distresses[i]] = []
            dist_cnt[distresses[i]] = 0
        }

        const svr = []; const all_pci = []
        
        filt_data.map(road_feat =>{
            const dst =road_feat.properties.distress
            const pci = road_feat.properties.pci
            if (Object.values(dst).length > 0) {

                svr.push(avgValues(dst))
                all_pci.push(pci)
                const ckeys = Object.keys(dst)
                const rdkeys = Object.keys(dist_obj)

                for (var i=0; i<ckeys.length;i++ ){
                    if (rdkeys.includes(ckeys[i])){
                      dist_obj[ckeys[i]].push(dst[ckeys[i]])
                      dist_cnt[ckeys[i]]+=1
                    } else {
                      dist_obj[ckeys[i]] = []
                      dist_obj[ckeys[i]].push(dst[ckeys[i]])
                    }
                    
                  }

            }
        })

        const ckeys = Object.keys(dist_obj)
        const hist_data = [["Distress","Extent"]]
        for (var j=0; j<ckeys.length; j++){

          hist_data.push([ckeys[j],dist_cnt[ckeys[j]]])

        }

        const pie_data = pieData(dist_obj)
        setPie(pie_data)
        setPci(avgArray(all_pci))
        setSvr(avgArray(svr))
        setHistdata(hist_data)

    }

    const filter_region = (plg) => {
      const data_obj = {}
      const filt_reg = data_ori.features.filter(element =>{
        const clon = element.geometry.coordinates[0]
        const clat = element.geometry.coordinates[1]

        if (geolib.isPointInPolygon( [clon, clat],  plg['features'][0].geometry.coordinates[0])){
          return true
        }
        return false
      })

      data_obj['type'] = 'FeatureCollection'
      data_obj['features'] = filt_reg
      setData(data_obj)

    }

    const filter_data = (value) => {
      const data_obj = {}
      const filt_data = data_ori.features.filter(element =>{
        if (element['properties']['pci']  <= value){
          return true
        }
        return false
      })
      data_obj['type'] = 'FeatureCollection'
      data_obj['features'] = filt_data
      setData(data_obj)

    }
    const filter_crack_type = (value) => {
      const data_obj = {}
      const filt_data = data.features.filter(element =>{
        if (Object.keys(element['properties']['distress']).includes(value)){
          return true
        }
        return false
      })

      data_obj['type'] = 'FeatureCollection'
      data_obj['features'] = filt_data

      setData(data_obj)

    }

    const unfilter_crack_type = (value) => {
      const data_obj = {}
      const filt_data = data_ori.features.filter(element =>{
        if (element['properties']['pci']  <= value){
          return true
        }
        return false
      })

      data_obj['type'] = 'FeatureCollection'
      data_obj['features'] = filt_data
      setData(data_obj)

    }

    const clearFilters = () => {
      setData(data_ori)
      setAlchecked(false)
      setBlchecked(false)
      setTlchecked(false)
      setLlchecked(false)
      setPlchecked(false)
      setSatellite(false)
      setPcchecked(false)
      setSpchecked(false)
      setRfchecked(false)
      setRachecked(false)
      setPcithresh(100)
      setShow(false)
      setFeatures([])

    }

    
    return (
        <div className='Main'>
            <div className='map-header'>
                EXPLORER
            </div>
            {
              show ? 
              <div className='boxdiv'>
                <PciChart dpies={pie} apci={apci} />
                <ExtChart dpies={pie} asvr={asvr} />
                <PieChart dpies={pie}/>
                <HistChart dpies={pie} histdata={histdata}/>
                
              </div>
              
              :
              null
            }
            <div className='Map'> 
            <SideDiv data={data} 
              satellite={satellite} onStlChange={value => setSatellite(value)} 
              alchecked={alchecked} onAlchange={value => {setAlchecked(value);value?filter_crack_type('Alligator Cracking'):unfilter_crack_type(pci_thresh)}}
              blchecked={blchecked} onBlchange={value => {setBlchecked(value);value?filter_crack_type('Block Cracking'):unfilter_crack_type(pci_thresh)}}
              tlchecked={tlchecked} onTlchange={value => {setTlchecked(value);value?filter_crack_type('Transverse Cracking'):unfilter_crack_type(pci_thresh)}}
              llchecked={llchecked} onLlchange={value => {setLlchecked(value);value?filter_crack_type('Longitudinal Cracking'):unfilter_crack_type(pci_thresh)}}
              plchecked={plchecked} onPlchange={value => {setPlchecked(value);value?filter_crack_type('Pothole'):unfilter_crack_type(pci_thresh)}}
              pccchecked={pccchecked} onPcchange={value => {setPcchecked(value);value?filter_crack_type('PCC_joint'):unfilter_crack_type(pci_thresh)}}
              spalchecked={spalchecked} onSpchange={value => {setSpchecked(value);value?filter_crack_type('Spalling'):unfilter_crack_type(pci_thresh)}}
              refchecked={refchecked} onRfchange={value => {setRfchecked(value);value?filter_crack_type('Reflective Cracking'):unfilter_crack_type(pci_thresh)}}
              ravchecked={ravchecked} onRachange={value => {setRachecked(value);value?filter_crack_type('Raveling'):unfilter_crack_type(pci_thresh)}}
              oilchecked={oilchecked} onOilchange={value => {setOilchecked(value);value?filter_crack_type('Oil_spot'):unfilter_crack_type(pci_thresh)}}
              popchecked={popchecked} onPopchange={value => {setPopchecked(value);value?filter_crack_type('Pop_out'):unfilter_crack_type(pci_thresh)}}
              patchchecked={patchchecked} onPatchchange={value => {setPatchchecked(value);value?filter_crack_type('Patch'):unfilter_crack_type(pci_thresh)}}
              manchchecked={manchchecked} onManchchange={value => {setManchchecked(value);value?filter_crack_type('Manhole'):unfilter_crack_type(pci_thresh)}}

              
              pci_thresh={pci_thresh} onPctchange={(value) => {setPcithresh(value);filter_data(value)}}
              onFilterCheck={() => clearFilters()} 
              />

            <MapGL
                style={{ width: '100%', height: '54rem' }}
                mapStyle = {satellite ? 'mapbox://styles/mapbox/satellite-v9': 'mapbox://styles/mapbox/dark-v9' }
                accessToken={MAPBOX_ACCESS_TOKEN}
                latitude={viewport.latitude}
                longitude={viewport.longitude}
                zoom={viewport.zoom}
                onViewportChange={(viewport) => setViewport(viewport)}
            >

            <Popup longitude={lng} latitude={lat} closeButton={true} closeOnClick={false} maxWidth='200px'>
                <div style={{width:'200px'}}>
                <div>Section Name: {sname}</div>
                  <div style={{flex:1, alignItems:'left'}}>Section PCI: {Math.round(urlpci)}</div>
                  <div style={{flex:1, alignItems:'left'}}>Image PCI: {Math.round(cpci)}</div>
                    🚧
                
                </div>
                
            </Popup>

            <Source id='points' type='geojson' data={data} />
            <Layer id='points' type='circle' source='points' 
                    onClick={onClick}
                    paint={{
                        'circle-radius': 3,
                        'circle-color':{
                            'type':'identity',
                            'property':'color'
                        }
                    }}

            />

            <Draw
                  onDrawCreate={(features) => {setFeatures(features); filter_region(plg)}}
                  onDrawUpdate={(features) => {setFeatures(features); filter_region(plg)}}
                />
            <TrafficControl showTraffic={false}/>
            </MapGL>
            <ImageViews urlsel={urlsel} show={show} urlpci={urlpci} 
                mapillary={mapillary}
              ids={ids}
              onNextFrame={value => nextFrame(value)}
              onPrevFrame={value => prevFrame(value)}
              onSetShow={value =>setShow(value)}
              
              />

            </div>
          {
            show? 
            <div style={{marginLeft:'2rem',marginRight:'2rem', marginTop:'-1rem'}} className='view-header'>
                IMAGE SNAPSHOT VIEWER
            </div>
            
            : null

          }

          <ImageCarousel update={update} snapshot={snapshot} show={show} urlsel={urlsel}
            onImgClick={value => setUrlsel(value)}
            onSetId={value => setId(value)}
            onSetPci={value => setUrlpci(value)}
            onSetcPci={value => setCpci(value)}
            onSetName={value => {setSname(value)}}
            onSetLng={value => {setLng(value)}}
            onSetLat={value => {setLat(value)}}
          />
          <LoadMore show={show} update={update} onUpdate={value =>setUpdate(value)} />
        </div>
    )

}

export default Map;
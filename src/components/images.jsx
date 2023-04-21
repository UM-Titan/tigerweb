import "../App__.css";
import React, { useState } from "react";
import { IonButton, IonCard, IonItem, IonLabel, IonIcon } from "@ionic/react";
import {
  caretBackSharp,
  caretForwardSharp,
  closeCircle,
  earthSharp,
} from "ionicons/icons";

const NextFrame = (props) => {
  console.log(props);
  props.snapshot.map((url, i) => {
    if (url.properties["id"] === props.ids) {
      if (i + 1 < props.snapshot.length) {
        // console.log(url)
        props.onClick(props.snapshot[i + 1].properties.url);
      }
    }
  });
};

// const ViewFrame = (props) => {

//     return (
//         <IonButton
//             className='img-buttons'
//             size='large' fill="outline" slot="end"
//             onClick={() => {
//                 nextFrame(props.snapshot, props.ids, )}}
//             >
//         <IonLabel>
//             Next
//         </IonLabel>
//         </IonButton>
//     )
// }
const ImageView = (props) => {
  // console.log(props)
  return (
    <div className="img-container">
      <img
        src={props.urlsel}
        // width={850}
        height={790}
        alt="image"
      />
    </div>
  );
};

const ImageView_ = (props) => {
  // console.log(props)
  return (
    <div
      style={{
        display: "inline-block",
        marginLeft: "10px",
        maxHeight: "50rem",
      }}
    >
      <IonCard>
        <IonItem>
          <IonButton
            className="img-buttons"
            size="large"
            fill="outline"
            slot="start"
            // onClick={() => {prevFrame(ids);}}
          >
            <IonLabel>Prev</IonLabel>
          </IonButton>

          <IonLabel
            className="img-label"
            // style={{ fontSize:23, color:ociv<50? 'red':'green'}}
          >
            PCI: {Math.round(props.urlpci)}
            {/* {sname} - PCI: {Math.round(props.urlpci)} */}
          </IonLabel>

          <IonButton
            className="img-buttons"
            size="large"
            fill="outline"
            slot="end"
            // onClick={() => { nextFrame(props.ids,props.snapshot)}}
          >
            <IonLabel>Next</IonLabel>
          </IonButton>
        </IonItem>

        <img
          src={props.urlsel}
          // width={550}
          height={720}
          alt="image"
        />
      </IonCard>
    </div>
  );
};

const ImageViews = (props) => {
  const [showModal, setShowModal] = useState(false);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <div>
      {props.show ? (
        <div
          style={{
            display: "inline-block",
            marginLeft: "10px",
            maxHeight: "50rem",
          }}
        >
          <IonCard>
            <IonItem>
              <IonIcon
                color="secondary"
                slot="start"
                size="large"
                icon={caretBackSharp}
                onClick={() => props.onPrevFrame(props.ids)}
                // style={{fontSize:'10px'}}
                className="icon-sizes"
              ></IonIcon>

              {/* <IonButton 
                        className='img-buttons' size='large' fill="outline" slot="start"
                        onClick={()=>props.onPrevFrame(props.ids)}
                        >
                        <IonLabel>Prev</IonLabel>
                        
                        </IonButton>

                        <IonButton  
                            className='img-buttons'
                            size='large' fill="outline" slot="start"
                            onClick={()=>props.onNextFrame(props.ids)}
                            >
                        <IonLabel>
                            Next
                        </IonLabel>
                        </IonButton> */}

              <IonIcon
                color="primary"
                slot="start"
                size="large"
                icon={caretForwardSharp}
                onClick={() => props.onNextFrame(props.ids)}
                className="icon-sizes"
                title="next"
              ></IonIcon>

              {/* <IonLabel 
                            className='img-label'
                            style={{ fontSize:23, color:props.urlpci<50? 'red':'green'}}
                            >
                            PCI: {Math.round(props.urlpci)}
                        </IonLabel> */}

              {/* <IonButton expand='block' size='large' slot='end' style={{height:'3rem'}} href={props.mapillary} target="_blank">
                                360 VIEW
                        </IonButton> */}
              {/* <button href={props.mapillary}> */}
              <a
                style={{ marginLeft: "2rem", border: "none" }}
                href={props.mapillary}
                target="_blank"
              >
                <IonIcon
                  href={props.mapillary}
                  target="_blank"
                  color="primary"
                  slot="end"
                  size="large"
                  icon={earthSharp}
                />
              </a>
              {/* </button> */}
              {/* </IonIcon> */}

              {/* <IonButton  
                            style={{backgroundColor:'red'}}
                            color="dark"
                            className='img-buttons'
                            size='large' fill="outline" slot="end"
                            onClick={()=>props.onSetShow(false)}
                            // onClick={() =>  nextFrame(ids)}
                            >
                            <IonIcon  slot="start" icon={closeCircle}></IonIcon>
                        <IonLabel>
                            Close
                        </IonLabel>
                        </IonButton> */}

              {/* <iframe width="640" height="480" src="https://www.mapillary.com/embed?map_style=OpenStreetMap&image_key=474265150817691&style=photo" frameborder="0"></iframe> */}

              {/* <IonLabel>
                            <a href={props.mapillary} onClick={() => setShowModal(true)}>
                                360VIEW
                            </a>
                            <iframe src={props.mapillary} style={{width:'100%',height:'400px'}}/>
                        </IonLabel> */}

              {/* <IonContent>

                            <IonModal isOpen={showModal}>
                                <iframe src={props.mapillary} style={{width:'640px',height:'480px'}}/>

                                <IonButton onClick={() => setShowModal(false)}>
                                    Close Modal
                                </IonButton>
                            </IonModal>
                            <IonButton onClick={() => setShowModal(true)}>
                                360 VIEW
                            </IonButton>
                        </IonContent> */}

              <IonIcon
                color="danger"
                slot="end"
                size="large"
                icon={closeCircle}
                onClick={() => props.onSetShow(false)}
              ></IonIcon>
            </IonItem>

            <ImageView urlsel={props.urlsel} />
          </IonCard>
        </div>
      ) : null}
    </div>
  );
};

const ImageCarousel = (props) => {
  return (
    <div className="box-shadow-md">
      {props.snapshot.length > 0 && props.show
        ? props.snapshot.slice(0, 10 + props.update).map((imgurl) => {
            return (
              <div style={{ padding: "1rem" }}>
                <img
                  src={imgurl.properties.url}
                  width={imgurl.properties.url === props.urlsel ? 350 : 75}
                  height={imgurl.properties.url === props.urlsel ? 450 : 150}
                  alt=""
                  onClick={() => {
                    props.onImgClick(imgurl.properties.url);
                    props.onSetId(imgurl.properties.id);
                    props.onSetPci(imgurl.properties.pci_avg);
                    props.onSetcPci(imgurl.properties.pci);
                    props.onSetName(imgurl.properties.street_name);
                    props.onSetLng(imgurl.geometry.coordinates[0]);
                    props.onSetLat(imgurl.geometry.coordinates[1]);
                  }}
                  style={{
                    cursor: "pointer",
                    display: "block",
                    borderRadius:
                      imgurl.properties.url === props.urlsel ? 10 : 1,
                    transform:
                      imgurl.properties.url === props.urlsel
                        ? "scale(1.0)"
                        : null,
                  }}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

const LoadMore = (props) => {
  return (
    <div>
      {props.show ? (
        <div
          style={{
            marginLeft: "2rem",
            marginRight: "2rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
          }}
          className="load-more"
        >
          <button
            onClick={() => {
              props.onUpdate(props.update + 5);
            }}
            className="btn-grad"
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { ImageView, ImageViews, NextFrame, ImageCarousel, LoadMore };

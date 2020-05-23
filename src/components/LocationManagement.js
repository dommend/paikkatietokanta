import React, {useState, useEffect} from 'react';
import LocationDataService from '../services/LocationService';
import {Link} from 'react-router-dom';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Icon from '@material-ui/core/Icon';
import {icon as leafletIcon} from 'leaflet';
import Slicer from 'react-slicer';
import 'react-slicer/build/react-slicer.css';
import {Throbber} from 'css-spinners-react';
import ShowMoreText from 'react-show-more-text';


const LocationsList = () => {
  const [locations, setLocations] = useState ([]);

  useEffect (() => {
    retrieveLocations ();
  }, []);

  const retrieveLocations = () => {
    LocationDataService.getAll()
      .then (response => {
        document.body.classList.remove ('locations-loaded');
        setLocations (response.data.reverse ());
        document.body.classList.add ('locations-loaded');
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  };

  const findAllmarkedImportant =() => {
    LocationDataService.findMarkedImportant () 
      .then (response => {
        setLocations (response.data.reverse ());
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  }
  
  const customMarkerIcon = leafletIcon ({
    iconUrl: require ('../resources/marker.png'),
    shadowUrl: require ('../resources/marker-shadow.png'),
    iconSize: [29, 39],
    shadowSize: [26, 16],
    shadowAnchor: [12, -12],
    popupAnchor: [0, -10],
  });

  const importantMarkerIcon = leafletIcon ({
    iconUrl: require ('../resources/marker-important.png'),
    shadowUrl: require ('../resources/marker-shadow.png'),
    iconSize: [26, 36],
    shadowSize: [26, 16],
    shadowAnchor: [12, -12],
  });

  return (
    <div id="page" className="location-management">

<div id="filter">
      <button
            className="btn btn-secondary"
            type="button"
            onClick={retrieveLocations}
          >
            <span className="material-icons">map</span>  Kaikki
          </button>
        <button
            className="btn btn-secondary"
            type="button"
            onClick={findAllmarkedImportant}
          >
            <Icon className="favorite">favorite</Icon> Tärkeäksi merkatut
          </button>
      </div>

      <Throbber />
      <Slicer initialPage={1} itemsPerPage={100}>
        
        {locations &&
          locations.map ((location, index) => (
            <div key={index} className="row">
              <div className="col-sm headline">
                {location.markedImportant
                  ? <div className="float-right">
                      <Icon className="favorite">favorite</Icon>
                    </div>
                  : ''}
                <h6>
                  <Link to={'/view/' + location.id}>
                    {location.title}
                  </Link>
                </h6>
                <div className="coordinates">
                  <Icon className="material-icons">place</Icon>
                  {location.coordinateN},
                  {location.coordinateE}
                </div>
              </div>
              <div className="col-sm map">
                <LeafletMap
                  center={[location.coordinateN, location.coordinateE]}
                  zoom={15}
                  maxZoom={20}
                  attributionControl={true}
                  zoomControl={false}
                  doubleClickZoom={true}
                  scrollWheelZoom={true}
                  dragging={true}
                  animate={true}
                  easeLinearity={0.35}
                >
                  <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                  <Marker
                    icon={
                      location.markedImportant
                        ? importantMarkerIcon
                        : customMarkerIcon
                    }
                    position={[location.coordinateN, location.coordinateE]}
                  >
                    <Popup>
                      {location.title}
                    </Popup>
                  </Marker>
                </LeafletMap>
              </div>
              <div className="col-sm description">
              <ShowMoreText       
                lines={3}
                more='Näytä enemmän'
                less='Näytä vähemmän'
                anchorClass=''
                expanded={false}
            >
                {location.description}
                </ShowMoreText>

              </div>
              <div className="col-sm control">
                <p>
                  <Link to={'/view/' + location.id} className="open">
                    Avaa
                  </Link>
                </p>
                <p>
                  <Link to={'/edit/' + location.id} className="edit">
                    Muokkaa
                  </Link>
                </p>
              </div>

            </div>
          ))}
      </Slicer>
    </div>
  );
};
export default LocationsList;

import React, {useState, useEffect} from 'react';
import LocationDataService from '../services/LocationService';
import {Link} from 'react-router-dom';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import ReactPlayer from 'react-player';
import FlickrLightbox from 'react-flickr-lightbox';
import Icon from '@material-ui/core/Icon';
import {icon as leafletIcon} from 'leaflet';

const LocationsList = () => {
  const [locations, setLocations] = useState ([]);

  useEffect (() => {
    retrieveLocations ();
  }, []);

  const retrieveLocations = () => {
    LocationDataService.getAll ()
      .then (response => {
        setLocations (response.data);
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  };

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
    <div id="fullpage" className="map-view">
      <LeafletMap
        center={[41, 0]}
        zoom={3}
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
        {locations.reverse &&
          locations.map ((location, index) => (
            <Marker
              key={index}
              icon={
                location.markedImportant
                  ? importantMarkerIcon
                  : customMarkerIcon
              }
              position={[location.coordinateN, location.coordinateE]}
            >
              <Popup>
                {location.markedImportant
                  ? <div className="float-right">
                      <Icon className="favorite">favorite</Icon>
                    </div>
                  : ''}
                <h5>
                  <Link to={'/view/' + location.id}>{location.title}</Link>
                </h5>
                <div className="coordinates">
                <Icon className="material-icons">place</Icon>
                  {location.coordinateN}
                  ,
                  {location.coordinateE}
                </div>
                <div className="description white-space">
                  {location.description}
                </div>
                <div className="meta">
                  {location.url
                    ? <a className="link-to-out" href={location.url}>
                        <Icon className="material-icons">link</Icon>
                        {' '}
                        {location.url}
                      </a>
                    : ''}
                  {location.flickrMore
                    ? <a className="link-to-flickr" href={location.flickrMore}>
                        <Icon className="material-icons">link</Icon>
                        {' '}
                        {location.flickrMore}
                      </a>
                    : ''}
                  {location.flickrTag
                    ? <div className="flickr-lightbox">
                        {' '}
                        <FlickrLightbox
                          api_key="b74826fa4ce3eeede6aa5bf2949d01a5"
                          searchTerm={location.flickrTag}
                          user_id="53573944@N00"
                          limit={8}
                        />
                      </div>
                    : ''}
                  {location.videoEmbed
                    ? <div className="player-wrapper">
                        <ReactPlayer
                          className="react-player"
                          width="100%"
                          height="100%"
                          url={location.videoEmbed}
                        />
                      </div>
                    : ''}
                </div>
                <div className="metadata flex">
                  <Link
                    to={'/view/' + location.id}
                    className="open-page button"
                  >
                    Avaa uudessa ikkunassa
                  </Link>
                  <Link
                    to={'/edit/' + location.id}
                    className="edit-page button"
                  >
                    Muokkaa
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
      </LeafletMap>
    </div>
  );
};

export default LocationsList;

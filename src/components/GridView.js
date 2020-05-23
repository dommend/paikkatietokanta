import React, { useState, useEffect } from 'react';
import LocationDataService from '../services/LocationService';
import { Link } from 'react-router-dom';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import ReactPlayer from 'react-player';
import FlickrLightbox from 'react-flickr-lightbox';
import Icon from '@material-ui/core/Icon';
import { icon as leafletIcon } from 'leaflet';
import Slicer from 'react-slicer';
import 'react-slicer/build/react-slicer.css';
import { Throbber } from 'css-spinners-react';
import ShowMoreText from 'react-show-more-text';

const LocationsList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    retrieveLocations();
  }, []);

  const retrieveLocations = () => {
    LocationDataService.getAll()
      .then(response => {
        document.body.classList.remove('locations-loaded');
        setLocations(response.data.reverse());
        document.body.classList.add('locations-loaded');
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findAllmarkedImportant = () => {
    LocationDataService.findMarkedImportant()
      .then(response => {
        setLocations(response.data.reverse());
        document.body.classList.add('locations-loaded');
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const customMarkerIcon = leafletIcon({
    iconUrl: require('../resources/marker.png'),
    shadowUrl: require('../resources/marker-shadow.png'),
    iconSize: [29, 39],
    shadowSize: [26, 16],
    shadowAnchor: [12, -12],
    popupAnchor: [0, -10],
  });

  const importantMarkerIcon = leafletIcon({
    iconUrl: require('../resources/marker-important.png'),
    shadowUrl: require('../resources/marker-shadow.png'),
    iconSize: [26, 36],
    shadowSize: [26, 16],
    shadowAnchor: [12, -12],
  });

  return (
    <div id="page" className="locationGrid-page">

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
          <Icon className="favorite">view_list</Icon> Tärkeät
          </button>
      </div>
      <Throbber />
      <Slicer initialPage={1} itemsPerPage={9}>
        {locations &&
          locations.map((location, index) => (
            <div className="location" key={index}>
              <div className="innercontainer">
                <div className="location-head">
                  {location.markedImportant
                    ? <div className="float-right">
                      <Icon className="favorite">favorite</Icon>
                    </div>
                    : ''}
                  <h5>
                    <Link to={'/view/' + location.id}>
                      {location.title}
                    </Link>
                  </h5>
                  <div className="coordinates">
                    <Icon className="material-icons">place</Icon>
                    {location.coordinateN},
                    {location.coordinateE}
                  </div>
                </div>
                <div className="location-body">
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
                  <div className="metadata flex">
                    <Link
                      to={'/view/' + location.id}
                      className="open-page button"
                    >
                      Avaa
                    </Link>
                    <Link
                      to={'/edit/' + location.id}
                      className="edit-page button"
                    >
                      Muokkaa
                    </Link>
                  </div>
                  <div className="location-inner-body">
                    <div className="description white-space">
                      <ShowMoreText
                        lines={5}
                        more='Näytä enemmän'
                        less='Näytä vähemmän'
                        anchorClass=''
                        expanded={false}
                      >
                        {location.description}
                      </ShowMoreText>
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
                        ? <a
                          className="link-to-flickr"
                          href={location.flickrMore}
                        >
                          <Icon className="material-icons">link</Icon>
                          {' '}
                          {location.flickrMore}
                        </a>
                        : ''}
                      {location.flickrTag
                        ?
                        <div className="flickr-lightbox">
                          <FlickrLightbox
                            api_key="b74826fa4ce3eeede6aa5bf2949d01a5"
                            searchTerm={location.flickrTag}
                            limit={10}
                            user_id="53573944@N00"
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
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slicer>
    </div>
  );
};
export default LocationsList;

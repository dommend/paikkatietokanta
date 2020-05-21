import React, {useState, useEffect} from 'react';
import LocationDataService from '../services/LocationService';
import {Link} from 'react-router-dom';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Icon from '@material-ui/core/Icon';
import ReactPlayer from 'react-player';
import FlickrLightbox from 'react-flickr-lightbox';
import {icon as leafletIcon} from 'leaflet';

const LocationsList = () => {
  const [locations, setLocations] = useState ([]);
  const [currentLocation, setCurrentLocation] = useState (null);
  const [currentIndex, setCurrentIndex] = useState (-1);
  const [searchTitle, setSearchTitle] = useState ('');

  useEffect (() => {
    retrieveLocations ();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle (searchTitle);
  };

  const retrieveLocations = () => {
    LocationDataService.getAll ()
      .then (response => {
        setLocations (response.data.reverse ());
        document.body.classList.add ('locations-loaded');
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  };

  const setActiveLocation = (location, index) => {
    setCurrentLocation (location);
    setCurrentIndex (index);
  };

  const findByTitle = () => {
    LocationDataService.findByTitle (searchTitle)
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
    popupAnchor: [0, -10],
  });

  return (
    <div id="location-list" className="module-view">
      <div className="search input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Hae otsikon perusteella"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Etsi
          </button>
        </div>
      </div>
      <ul id="places" className="list-group">
        {locations &&
          locations.map ((location, index) => (
            <li
              key={index}
              className={
                'list-group-item ' + (index === currentIndex ? 'active' : '')
              }
              onClick={() => setActiveLocation (location, index)}
            >
              {location.markedImportant
                ? <div class="float-right">
                    <Icon className="favorite">favorite</Icon>
                  </div>
                : ''}
              {location.title} <br />
              <div className="coordinates">
                <span className="material-icons">gps_fixed</span>
                {[location.coordinateN + ', ' + location.coordinateE]}
              </div>
            </li>
          ))}
      </ul>
      <div id="place">
        {currentLocation
          ? <div>
              <div id="details">
                <div className="innercontainer">
                  <h4>
                    {currentLocation.title}
                    {currentLocation.markedImportant
                      ? <Icon className="favorite">favorite</Icon>
                      : ''}
                  </h4>
                  <div className="coordinates">
                    <span className="material-icons">gps_fixed</span>
                    {currentLocation.coordinateN}
                    ,
                    {currentLocation.coordinateE}
                  </div>
                  <div class="place-innercontainer">
                    <div className="description white-space">
                      {currentLocation.description}
                    </div>
                    <div class="meta">
                      {currentLocation.url
                        ? <a className="link-to-out" href={currentLocation.url}>
                            <Icon className="material-icons">link</Icon>
                            {currentLocation.url}
                          </a>
                        : ''}
                      {currentLocation.flickrMore
                        ? <a
                            className="link-to-flickr"
                            href={currentLocation.flickrMore}
                          >
                            <Icon className="material-icons">link</Icon>
                            {currentLocation.flickrMore}
                          </a>
                        : ''}
                      {currentLocation.flickrTag
                        ? <div className="flickr-lightbox">
                            {' '}
                            <FlickrLightbox
                              api_key="b74826fa4ce3eeede6aa5bf2949d01a5"
                              searchTerm={currentLocation.flickrTag}
                              user_id="53573944@N00"
                              limit={153}
                            />
                          </div>
                        : ''}
                      {currentLocation.videoEmbed
                        ? <div className="player-wrapper">
                            <ReactPlayer
                              className="react-player"
                              width="100%"
                              height="100%"
                              url={currentLocation.videoEmbed}
                            />
                          </div>
                        : ''}
                      <div />
                    </div>
                  </div>
                  <div className="metadata flex">
                    <Link
                      to={'/view/' + currentLocation.id}
                      className="open-page button"
                    >
                      Avaa uudessa ikkunassa
                    </Link>
                    <Link
                      to={'/edit/' + currentLocation.id}
                      className="edit-page button"
                    >
                      Muokkaa
                    </Link>
                  </div>

                </div>
              </div>
              <LeafletMap
                center={[
                  currentLocation.coordinateN,
                  currentLocation.coordinateE,
                ]}
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
                    currentLocation.markedImportant
                      ? importantMarkerIcon
                      : customMarkerIcon
                  }
                  position={[
                    currentLocation.coordinateN,
                    currentLocation.coordinateE,
                  ]}
                >
                  <Popup>
                    {currentLocation.title}
                  </Popup>
                </Marker>
              </LeafletMap>
            </div>
          : <div className="innercontainer">
              <div className="welcome">
                <h1>Module view</h1>
              </div>
            </div>}
      </div>
    </div>
  );
};
export default LocationsList;

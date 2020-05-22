import React, {useState, useEffect} from 'react';
import LocationDataService from '../services/LocationService';
import {Link} from 'react-router-dom';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import ReactPlayer from 'react-player';
import FlickrLightbox from 'react-flickr-lightbox';
import Icon from '@material-ui/core/Icon';
import {icon as leafletIcon} from 'leaflet';

const Location = props => {
  const initialLocationState = {
    id: null,
    title: '',
    description: '',
    markedImportant: false,
    coordinateN: '',
    coordinateE: '',
    videoEmbed: '',
    url: '',
    flickrTag: '',
  };
  const [currentLocation, setCurrentLocation] = useState (initialLocationState);

  const getLocation = id => {
    LocationDataService.get (id)
      .then (response => {
        setCurrentLocation (response.data);
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  };

  useEffect (
    () => {
      getLocation (props.match.params.id);
    },
    [props.match.params.id]
  );

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
    <div>
      {currentLocation
        ? <div id="page" className="locationView-page">
            <div className="container">
              <div className="row">
                <div className="col-sm map">
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
                <div className="col-sm details">
                  <div className="innercontainer">
                    <button
                      type="button"
                      className="go-back"
                      onClick={() => props.history.goBack ()}
                    >
                      <span className="material-icons">arrow_back_ios</span>
                      {' '}
                      Takaisin edelliselle sivulle
                    </button>
                    <h4>
                      {currentLocation.title}
                      {currentLocation.markedImportant
                        ? <div className="float-right">
                            <Icon className="favorite">favorite</Icon>
                          </div>
                        : ''}
                    </h4>
                    <div className="coordinates">
                      <span className="material-icons">gps_fixed</span>
                      {' '}{' '}
                      {currentLocation.coordinateN}
                      ,
                      {currentLocation.coordinateE}
                    </div>
                    <div className="description white-space">
                      {currentLocation.description}
                      <div>
                        <div className="meta">
                          {currentLocation.url
                            ? <a
                                className="link-to-out"
                                href={currentLocation.url}
                              >
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
                                <FlickrLightbox
                                  api_key="b74826fa4ce3eeede6aa5bf2949d01a5"
                                  searchTerm={currentLocation.flickrTag}
                                  user_id="53573944@N00"
                                />
                              </div>
                            : ''}
                          <div>
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
                          </div>
                        </div>
                      </div>
                      <Link to={'/edit/' + currentLocation.id} className="edit">
                        Muokkaa
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : <div>
            <p>Error.</p>
          </div>}
    </div>
  );
};
export default Location;

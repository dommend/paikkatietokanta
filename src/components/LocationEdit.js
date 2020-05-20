import React, {useState, useEffect} from 'react';
import LocationDataService from '../services/LocationService';
import TextareaAutosize from 'react-textarea-autosize';
import CheckLocation from './getLocation';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure ({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

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
    flickrMore: '',
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

  const handleInputChange = event => {
    const {name, value} = event.target;
    setCurrentLocation ({...currentLocation, [name]: value});
  };

  const updateMarkedImportant = status => {
    var data = {
      id: currentLocation.id,
      title: currentLocation.title,
      description: currentLocation.description,
      coordinateN: currentLocation.coordinateN,
      coordinateE: currentLocation.coordinateE,
      markedImportant: status,
      videoEmbed: currentLocation.videoEmbed,
      url: currentLocation.url,
      flickrTag: currentLocation.flickrTag,
      flickrMore: currentLocation.flickrMore,
    };

    LocationDataService.update (currentLocation.id, data)
      .then (response => {
        toast ('Päivitetty');
        setCurrentLocation ({...currentLocation, markedImportant: status});
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  };

  const updateLocation = () => {
    LocationDataService.update (currentLocation.id, currentLocation)
      .then (response => {
        toast ('Päivitetty');
        console.log (response.data);
      })
      .catch (e => {
        console.log (e);
      });
  };

  const deleteLocation = () => {
    LocationDataService.remove (currentLocation.id)
      .then (response => {
        toast ('Paikka poistettu');
        console.log (response.data);
        props.history.push ('/locations');
      })
      .catch (e => {
        console.log (e);
      });
  };

  return (
    <div id="page" className="editlocation">
      {currentLocation
        ? <div className="innerwidth edit-form">
            <div className="innercontainer">
              <h3>Muokkaa sijaintia</h3>
              <p>
                Punaisella merkityt
                <span className="required">*</span>
                -kohdat ovat pakollisia täyttää.
              </p>
            </div>
            <form>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="title">
                      Otsikko<span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={currentLocation.title}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="description">
                      Kuvaus<span className="required">*</span>
                    </label>
                    <TextareaAutosize
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={currentLocation.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="coordinates">
                      Koordinaatit (N ja E)<span className="required">*</span>
                    </label>
                    <p>
                      <small>
                        Ilmoita koordinaatit muodossa: 62,603063 ja 29,754834. Voit halutessasi tarkistaa koordinaatit alla olevalta kartalta tai
                        {' '}
                        <a href="http://maps.google.com/">Google Mapsista.</a>
                      </small>
                    </p>
                    <div className="row">
                      <div className="col-sm">
                        <label>North</label>
                        <input
                          type="number"
                          className="form-control"
                          id="coordinateN"
                          value={currentLocation.coordinateN}
                          onChange={handleInputChange}
                          name="coordinateN"
                          required
                        />
                      </div>
                      <div className="col-sm">
                        <label>East</label>
                        <input
                          type="number"
                          className="form-control"
                          id="coordinateE"
                          value={currentLocation.coordinateE}
                          onChange={handleInputChange}
                          name="coordinateE"
                          required
                        />
                      </div>
                    </div>
                    <CheckLocation />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="description">URL</label> <br />
                    <small>Onko paikalla kotisivua?</small>
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      name="url"
                      value={currentLocation.url}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Upota video</label> <br />
                    <small>
                      Huom! Älä käytä upotus-koodia,
                      {' '}
                      <span class="required">pelkkä URL-osoite</span>
                      {' '}
                      riittää.
                    </small>
                    <input
                      type="text"
                      className="form-control"
                      id="videoEmbed"
                      name="videoEmbed"
                      value={currentLocation.videoEmbed}
                      onChange={handleInputChange}
                    />
                    <p>
                      <small className="even-smaller">
                        Tuetut palvelut: Youtube, Facebook, Soundblouc, Streamable videos use Player.js, Vimeo, Wistia, Twitch, Dailymotion, Vidyard.
                      </small>
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Flickr:n avainsana</label> <br />
                    <small>
                      Syöttämällä avainsanan voit hakea vastaavat kuvat Flickr-tililtä
                    </small>
                    <input
                      type="text"
                      className="form-control"
                      id="flickrTag"
                      value={currentLocation.flickrTag}
                      onChange={handleInputChange}
                      name="flickrTag"
                    />
                    <label>
                      Flickr-linkki
                    </label>
                    <p>
                      <small>
                        Lisää linkki Flickr albumiin, kuvaan tai avainsanaan.
                      </small>
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      id="flickrMore"
                      value={currentLocation.flickrMore}
                      onChange={handleInputChange}
                      name="flickrMore"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group subdetails">
                <div className="row">
                  <div className="col-sm-5">
                    <label>
                      <strong>Tärkeysaste:</strong>
                    </label>
                    {currentLocation.markedImportant
                      ? ' Tärkeä '
                      : ' Ei-tärkeä '}
                    {currentLocation.markedImportant
                      ? <button
                          className="badge badge-primary mr-2"
                          onClick={() => updateMarkedImportant (false)}
                        >
                          Merkkaa ei-tärkeäksi
                        </button>
                      : <button
                          className="badge badge-primary mr-2"
                          onClick={() => updateMarkedImportant (true)}
                        >
                          Merkkaa tärkeäksi
                        </button>}{' '}
                  </div>
                  <div className="col-sm text-right">
                    <button
                      type="button"
                      className="badge badge-danger mr-2"
                      onClick={e => {
                        if (
                          window.confirm ('Haluatko varmasti poistaa kohteen?')
                        )
                          deleteLocation (e);
                      }}
                    >
                      Poista
                    </button>
                    <button
                      type="button"
                      className="badge badge-success"
                      onClick={updateLocation}
                    >
                      Päivitä
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        : <div class="innerwidth text-center">
            <br />
            <p>Paikka poistettu kannasta.</p>
            <p><a href="./">Palaa etusivulle.</a></p>
          </div>}
    </div>
  );
};
export default Location;

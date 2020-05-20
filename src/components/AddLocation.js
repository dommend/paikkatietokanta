import React, {useState} from 'react';
import LocationDataService from '../services/LocationService';
import TextareaAutosize from 'react-textarea-autosize';
import Location from './getLocation';
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

const AddLocation = () => {
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
  const [location, setLocation] = useState (initialLocationState);
  const [submitted, setSubmitted] = useState (false);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setLocation ({...location, [name]: value});
  };

  const saveLocation = () => {
    var data = {
      title: location.title,
      description: location.description,
      coordinateN: location.coordinateN,
      coordinateE: location.coordinateE,
      markedImportant: location.markedImportant,
      videoEmbed: location.videoEmbed,
      url: location.url,
      flickrTag: location.flickrTag,
      flickrMore: location.flickrMore,
    };

    LocationDataService.create (data)
      .then (response => {
        setLocation ({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          markedImportant: response.data.markedImportant,
          coordinateN: response.data.coordinateN,
          coordinateE: response.data.coordinateE,
          videoEmbed: response.data.videoEmbed,
          url: response.data.url,
          flickrTag: response.data.flickrTag,
          flickrMore: response.data.flickrMore,
        });

        setSubmitted (true);
        toast ('Paikka lisätty tietokantaan!');
        console.log (response.data);
      })
      .catch (e => {
        toast (
          'Virhe! :( Ole hyvä ja tarkista ilmoittamasi tiedot kertaalleen.'
        );
        console.log (e);
      });
  };

  const newLocation = () => {
    setLocation (initialLocationState);
    setSubmitted (false);
  };

  return (
    <div id="page" className="addlocation">

      {submitted
        ? <div className="innercontainer text-center">
            <h4>Paikka lisätty onnistuneesti tietokantaan!</h4>
            <p>
              <span class="material-icons">
                thumb_up_alt
              </span>
            </p>
            <button
              type="button"
              className="btn btn-success"
              onClick={newLocation}
            >
              Lisää uusi paikka?
            </button>
          </div>
        : <form>
            <div className="innerwidth">

              <div className="innercontainer">
                <h2>Lisää paikka</h2>
                <p>
                  Punaisella merkityt
                  <span className="required">*</span>
                  -kohdat ovat pakollisia täyttää.
                </p>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div>
                    <div className="form-group together">
                      <label htmlFor="title">
                        Otsikko<span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={location.title}
                        onChange={handleInputChange}
                        name="title"
                        required
                      />

                      <label htmlFor="description">
                        Kuvaus<span className="required">*</span>
                      </label>
                      <TextareaAutosize
                        className="form-control"
                        id="description"
                        value={location.description}
                        onChange={handleInputChange}
                        name="description"
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
                            value={location.coordinateN}
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
                            value={location.coordinateE}
                            onChange={handleInputChange}
                            name="coordinateE"
                            required
                          />
                        </div>
                      </div>
                      <Location />
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="description">URL</label> <br />
                    <small>Onko paikalla kotisivua?</small>
                    <TextareaAutosize
                      type="text"
                      className="form-control"
                      id="url"
                      value={location.url}
                      onChange={handleInputChange}
                      name="url"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Upota video</label> <br />
                    <small>
                      Huom! Älä käytä upotus-koodia,
                      <span class="required">pelkkä URL-osoite</span>
                      riittää.
                    </small>
                    <input
                      type="text"
                      className="form-control"
                      id="videoEmbed"
                      value={location.videoEmbed}
                      onChange={handleInputChange}
                      name="videoEmbed"
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
                      value={location.flickrTag}
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
                      value={location.flickrMore}
                      onChange={handleInputChange}
                      name="flickrMore"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group subdetails">
                <div className="row">
                  <div className="col-sm-4">
                    <label>Tärkeysaste</label>
                    <p>
                      <small>
                        Tärkeysaste on default määritteenä "Ei-tärkeä".
                      </small>
                    </p>
                  </div>
                  <div className="col-sm import">
                    <label htmlFor="important">Tärkeä</label>
                    <input
                      type="radio"
                      className="form-control"
                      id="markedImportant_yes"
                      value="true"
                      onChange={handleInputChange}
                      name="markedImportant"
                    />
                  </div>
                  <div className="col-sm">
                    <label htmlFor="not-important">Ei-tärkeä</label>
                    <input
                      type="radio"
                      className="form-control"
                      id="markedImportant_no"
                      value="false"
                      onChange={handleInputChange}
                      name="markedImportant"
                    />
                  </div>
                  <div className="col-sm" />

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={e => {
                      if (
                        window.confirm ('Haluatko lisätä paikan tietokantaan?')
                      )
                        saveLocation (e);
                    }}
                  >
                    Tallenna
                  </button>
                </div>
              </div>
            </div>
          </form>}
    </div>
  );
};
export default AddLocation;

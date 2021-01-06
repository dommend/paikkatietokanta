import React from 'react';
import { Link } from 'react-router-dom';
import Diver from '../resources/diver.png'

class NotFoundPage extends React.Component {
  render() {
    return (
      <div id="page">
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p><img src={Diver} style={{width: '200px' }} alt="Diver" /></p>
          <h2>Sivua ei löydy</h2>
          <p><Link to="/" className="btn">Palaa takaisin etusivulle</Link></p>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;

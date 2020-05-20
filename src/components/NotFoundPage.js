import React from 'react';
import { Link } from 'react-router-dom';
class NotFoundPage extends React.Component {
  render() {
    return (
      <div id="page">
        <p style={{ textAlign: 'center' }}>
          <h1>Sivua ei löydy</h1>
          <Link to="/">Palaa takaisin etusivulle</Link>
        </p>
      </div>
    );
  }
}
export default NotFoundPage;

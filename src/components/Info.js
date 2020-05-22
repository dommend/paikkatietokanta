import React from 'react';

class Info extends React.Component {
  render () {
    return (
      <div id="page" className="content-page">
        <div className="innerwidth">
          <div className="innercontainer">
            <h2>Tietoa paikkatietokannasta</h2>
            <p>
              Paikkatietokanta on rakennettu käyttämällä seuraavia: <br />
              HTML5, SASS, MySQL, React, Node ja palju kohvi.
            </p>
            <p>
            <a href="https://github.com/dommend/paikkatietokanta">https://github.com/dommend/paikkatietokanta</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Info;

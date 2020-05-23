import React from 'react';
import ThinkerRobot from '../resources/ThinkerRobot.png'

class Info extends React.Component {
  render() {
    return (
      <div id="page" className="content-page">
        <div className="innerwidth">
          <div className="innercontainer">

            <div class="row"><div class="col-sm">
              <h2>Tietoa paikkatietokannasta</h2>
              <p>
                Paikkatietokanta on Jani Penttisen (<a href="http://penttinen.fi/">Penttinen.fi</a>) päättöprojektina syntynyt sivusto. Paikkatietokannan tarkoitus on yhdistää valokuvaharrastus, historiallinen dokumentointi ja ammatillinen focus kehittyä paremmaksi koodariksi.</p>

              <p>Sivusto on rakennettu käyttämällä: <br />
              HTML5, SASS, MySQL, React, Node ja palju kohvi.
            </p>
            <a href="https://github.com/dommend/paikkatietokanta" style={{ margin: '30px 0px' }}  className="btn btn-outline-info btn-block">
                Sivuston lähdekoodi on ladattavissa GitHubista. <br />
                <small>https://github.com/dommend/paikkatietokanta</small></a>
              
            </div>

              <div class="col-sm">
                <div class="text-center">
                  <img src={ThinkerRobot} style={{ width: '250px' }} alt="ThinkerRobot" />
                </div>
              </div>

            </div>
            <div class="row space">
              <div class="col-sm">
                <h4>Tiedostorakenne</h4>

                <p>Päivittyy.</p>

              </div>
              <div class="col-sm">
                <h4>Ohjeet sivuston ajamiseen</h4>

                <p>Ajaekseen sivua, sinulla tulee olla <a href="https://nodejs.org/en/">node.js</a> ja mysql-tietokanta.</p>

                <h6>Vaiheet:</h6>

                <ol>
                  <li>Aja <code>npm install</code></li>
                  <li>Muuta tietokanta-asetukset tiedostosta <code>db.config.</code> Tiedosto löytyy @ <code>app/config/db.config.js</code></li>
                  <li>Aja <code>node.server</code> -- Jos tietokantoja ei ole, ne luodaan. <code>Server.js</code> pyörii portissa 8080.</li>
                  <li>Aja <code>npm start</code> -- Käynnistää sivuston portissa 8081.</li>
                </ol>

                <h5>Huomautus porteista</h5>
                <p>Portien asetukset löytyvät seuraavista tiedostoista: <code>.env</code>, <code>server.js</code> ja <code>src/http-commons.</code></p>

                <h5>Ennen kuin ajat build-scriptin</h5>
                <p>Ennen kuin ajat build-scriptin, käy muuttamassa baseURL-osoite tiedostosta <code>src/http-commons.js.</code> Tarkista myös <code>'homepage address'</code> tiedostosta <code>package.json.</code></p>

                <h6>http-commons.js ja baseURL</h6>
                <p>Omalta koneelta ajaessa <code>baseURL</code>-osoite on oletusarvona <code>http://localhost:8080/api/.</code></p>

                <p>Verkossa ajattaessa osoitteen pitää olla sama kuin käytettävä verkkotunnus.</p>

                <h6>package.json ja homepage address</h6>
                <p>Ajattaessa lokaalisti <code>homepage address</code> voi olla <code>"./"</code>. Mikäli osoite on väärin, sivusto avautuu pelkkänä valkoisena näkymänä. Verkkoa varten tämän voi muuttaa vastaamaan verkkotunnusta.</p>

                <h5>Sivuston ajaminen verkossa ja htaccess</h5>
                <p>Jotta sivusto päivittyisi oikein, täytyy alla oleva <code>.htaccess</code>-tiedosto olla olemassa sivuston juuressa. Ilman htaccess-tiedostoa sivuston päivitys saattaa aiheuttaa valkoisen ruudun.</p>





                <blockquote>
                  <code>
                    &lt;IfModule mod_rewrite.c&gt; <br />
RewriteEngine On<br />
RewriteBase /<br />
RewriteRule ^index.html$ - [L]<br />
RewriteCond % &lbrace;REQUEST_FILENAME} !-f<br />
RewriteCond % &lbrace;REQUEST_FILENAME} !-d<br />
RewriteCond % &lbrace;REQUEST_FILENAME} !-l<br />
RewriteRule . /index.html [L]<br />
&lt;/IfModule&gt; </code>
                </blockquote>

                <h6>Lisää vielä tämä /api -kansion juureen</h6>
                <p>Tämä kytkee aikaisemmin määrittämät rewrite-arvot pois api-kansiosta.</p>
                <code>RewriteEngine Off</code>
              </div>

            </div>



          </div>
        </div>
      </div>
    );
  }
}
export default Info;

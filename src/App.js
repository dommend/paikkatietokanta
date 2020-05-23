import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { Preloader, Placeholder } from 'react-preloading-screen';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
/* Import components */
import LocationsView from "./components/LocationsView";
import ModuleView from './components/ModuleView';
import MapView from './components/MapView';
import GridView from './components/GridView';
import ListView from './components/ListView';
import InfoPage from './components/InfoPage';
import AddLocation from "./components/AddLocation";
import LocationView from "./components/LocationView";
import LocationEdit from "./components/LocationEdit";
import NotFoundPage from './components/NotFoundPage';

function App() {

  return (
    <Router>

      <Navbar expand="md" variant="dark">
        <Navbar.Brand href="/">Paikkatietokanta</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar-nav">
            <ul>
              <li className="nav-item">
                <NavLink to={"/locations"} className="nav-link frontpage" activeClassName="active">
                <span className="material-icons">home</span> Etusivu
              </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to={"/module"} className="nav-link module" activeClassName="active">
                <span className="material-icons">dashboard</span>  Moduuli
              </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to={"/map"} className="nav-link map" activeClassName="active">
                <span className="material-icons">map</span>  Map
              </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to={"/grid"} className="nav-link grid" activeClassName="active">
                <span className="material-icons">grid_on</span>   Gridi
              </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to={"/list"} className="nav-link list" activeClassName="active">
                <span className="material-icons">reorder</span>  Lista
              </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to={"/info"} className="nav-link info" activeClassName="active">
                <span className="material-icons">info</span>  Info
              </NavLink >
              </li>

              <li className="nav-item">
                <NavLink to={"/add"} className="nav-link add-new" activeClassName="active">
                <span className="material-icons">add_box</span> Lisää
              </NavLink >
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <main>
        { /* Switch / Route */}
        <Switch>
          <Redirect exact from="/" to="/locations" />
          <Route exact path={["/", "/locations"]} component={LocationsView} />
          <Route exact path="/module" component={ModuleView} />
          <Route exact path="/map" component={MapView} />
          <Route exact path="/grid" component={GridView} />
          <Route exact path="/list" component={ListView} />
          <Route exact path="/info" component={InfoPage} />
          <Route exact path="/add" component={AddLocation} />
          <Route exact path="/edit/:id" component={LocationEdit} />
          <Route exact path="/view/:id" component={LocationView} />
          { /* 404-sivu */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
      <Preloader>
        <Placeholder>
          <pre>{`
                     ₕₑₗₗₒ    ±
                          [ºuº]
                         └|___|┐
                           ┘ └
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                   

  Please wait... 
  Mr. Happy Robot is currently loading the database...

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`}</pre>
        </Placeholder>
      </Preloader>

    </Router>
  );
}
export default App;

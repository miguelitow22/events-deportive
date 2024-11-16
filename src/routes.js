import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import TorneosList from './components/Torneos';
import InscripcionesList from './components/InscripcionesList';

const Routes = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Registro} />
        <Route path="/torneos" component={TorneosList} />
        <Route path="/inscripciones/:userId" component={InscripcionesList} />
    </Switch>
);

export default Routes;

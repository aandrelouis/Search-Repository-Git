import React from 'react';
import  { BrowserRouter,Switch ,Route } from 'react-router-dom'


import Main from './pages/main';
import Repositories from './pages/repositories';

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/repositories/:repository" component={Repositories}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;
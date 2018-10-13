import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'

import React from 'react';
import { render } from 'react-dom';
import ReactRoute from './route.js';

import Menu from './menu/index.js';
import Module1 from './module1/index.js';

const routes = [
    new ReactRoute({key:'home',exactPath:true,path:'/',component:<Menu/>}).val(),
    new ReactRoute({key:'module1',exactPath:false,path:'/module1',component:<Module1/>}).val(),
]

render(
    <div>{routes}</div>, 
    document.getElementById('app')
);
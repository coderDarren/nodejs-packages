import React, { Component } from 'react';
import MenuButton from './menu-button.js';

export default class Menu extends Component {

    nav(_e, _dest)
    {
        _e.preventDefault();
        window.location = _dest;
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                    <div className='col'>
                        <MenuButton label='Module 1' dest='#/module1' />
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';

export default class MenuButton extends Component
{
    constructor(props)
    {
        super(props);

        this.dest = props.dest;
        this.label = props.label;

        this.goto = this.__goto__.bind(this);
    }

    __goto__()
    {
        window.location = this.dest;
    }

    render()
    {
        return (
            <button className='menu-button' onClick={this.goto}>{this.label}</button>
        )
    }
}
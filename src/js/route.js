import React from 'react';
import {
    HashRouter,
    Route
} from 'react-router-dom';

class ReactRoute 
{
    constructor(props)
    {
        this.exactPath = props.exactPath;
        this.key = props.key;
        this.path = props.path;
        this.component = props.component;
        this.route = this.__route__.bind(this);
    }

    __route__()
    {
        if (this.exactPath)
        {
            return <Route exact path={this.path} render={()=>this.component} />
        }
        return <Route path={this.path} render={()=>this.component} />
    }

    val()
    {
        return (
            <HashRouter key={this.key}>
                {this.route()}
            </HashRouter>
        )
    }
}

export default ReactRoute;
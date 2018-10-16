import React, { Component } from 'react';

export default class Module1 extends Component
{
    constructor(props)
    {
        super(props);

        this.createScene = this.__create_scene__.bind(this);
        this.createMaterials = this.__create_materials__.bind(this);
        this.createGeometry = this.__create_geometry__.bind(this);
        this.createObjects = this.__create_objects__.bind(this);
        this.createLights = this.__create_lights__.bind(this);
        this.renderScene = this.__render_scene__.bind(this);
        this.updateScene = this.__update_scene__.bind(this);
        this.onResize = this.__on_resize__.bind(this);

        this.lerp = this.__lerp__.bind(this);
        this.clamp = this.__clamp__.bind(this);
        this.randomInt = this.__random_int__.bind(this);

        this.colorTimer = 0;
        this.colorChangeTimer = 0;
        this.colorChangeFrequency = 4;  //seconds
        this.colorChangeSpeed = 0.25;    //seconds
        this.changingColor = false;
        this.colors = [
            {r:255/255, g:32/255, b:38/255},   //red
            {r:255/255, g:133/255, b:32/255},  //orange
            {r:255/255, g:218/255, b:32/255},  //yellow
            {r:193/255, g:255/255, b:32/255},  //lime
            {r:71/255, g:255/255, b:32/255},   //green
            {r:32/255, g:255/255, b:176/255},  //aqua
            {r:51/255, g:140/255, b:255/255},  //sky
            {r:55/255, g:24/255, b:252/255},   //blue
            {r:173/255, g:45/255, b:255/255},  //purple
            {r:255/255, g:32/255, b:158/255},  //pink
        ];  
        this.colorIndex = this.randomInt(0, this.colors.length);
        this.targetColor = this.colors[this.colorIndex];
        this.previousColor = this.targetColor;

        this.rotationSpeed = 1;
        this.rotationVec = new THREE.Vector3(0,1,0);
    }

    componentDidMount()
    {
        this.createScene();
        this.createMaterials();
        this.createGeometry();
        this.createObjects();
        this.createLights();
        this.renderScene();
    }

    componentWillUnmount()
    {
        window.cancelAnimationFrame(this.frameId);
        document.querySelector('.fullscreen-preview').removeChild(this.renderer.domElement);
        window.removeEventListener('resize', this.onResize);
    }

    __on_resize__()
    {
        this.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    __create_scene__()
    {
        this.aspect = window.innerWidth / window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, this.aspect, 0.01, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias:true,
        });
        this.renderer.setClearColor(0x333333,1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', this.onResize);
    }

    __create_materials__()
    {
        this.objColor = new THREE.Color('rgb('+(255 * this.previousColor.r)+','+(255 * this.previousColor.g)+','+(255 * this.previousColor.b)+')');
        this.objMat = new THREE.MeshStandardMaterial({
            color:this.objColor,
            emissive:0x009d87,
            roughness:0.5,
            metalness:0.1,
            wireframe:true,
        });
        this.objMat.wireframeLinewidth = 2;
        this.backgroundMat = new THREE.MeshStandardMaterial({
            color: 0x333333,
            side: THREE.BackSide
        });
    }

    __create_geometry__()
    {
        this.objGeometry = new THREE.IcosahedronGeometry(1, 0);
        this.backgroundGeometry = new THREE.IcosahedronGeometry(40, 0);
    }

    __create_objects__()
    {
        this.obj = new THREE.Mesh(this.objGeometry, this.objMat);
        this.obj.position.set(0,0,-5);
        this.obj.rotation.x -= 5;
        this.background = new THREE.Mesh(this.backgroundGeometry, this.backgroundMat);
        this.background.position.set(0,20,-5);
    }

    __create_lights__()
    {
        this.mainLight = new THREE.DirectionalLight(0xffffff, 0.2);
        this.ambientLight = new THREE.AmbientLight(0x404040, 4);
    }

    __render_scene__()
    {
        this.scene.add(this.camera);
        this.scene.add(this.obj);
        this.scene.add(this.background);
        
        this.scene.add(this.mainLight);
        this.scene.add(this.ambientLight);

        document.querySelector('.fullscreen-preview').appendChild(this.renderer.domElement);

        this.frameId = -1;
        this.now = Date.now();
        this.last = this.now;
        this.dt = this.now;

        this.updateScene();
    }

    __update_scene__()
    {
        this.last = this.now;
        this.now = Date.now();
        this.dt = (this.now - this.last) / 1000;
        
        this.obj.rotateOnAxis(this.rotationVec, -this.rotationSpeed * this.dt);
        this.background.rotation.x += 0.05 * this.dt;
        this.background.rotation.y -= 0.15 * this.dt;
        this.background.rotation.z += 0.1 * this.dt;

        this.colorChangeTimer += this.dt;

        if (this.colorChangeTimer >= this.colorChangeFrequency)
        {
            if (!this.changingColor)
            {
                // Get a new color
                var _newColorIndex = this.randomInt(0, this.colors.length);
                while (_newColorIndex === this.colorIndex)
                {
                    _newColorIndex = this.randomInt(0, this.colors.length);
                }
                this.colorIndex = _newColorIndex;
                this.targetColor = this.colors[this.colorIndex];
                this.changingColor = true;
                this.rotationSpeed = 6;
            }

            this.colorTimer += this.dt;
            this.objMat.color.r = this.lerp(this.previousColor.r, this.targetColor.r, this.colorTimer / this.colorChangeSpeed).toString();
            this.objMat.color.g = this.lerp(this.previousColor.g, this.targetColor.g, this.colorTimer / this.colorChangeSpeed).toString();
            this.objMat.color.b = this.lerp(this.previousColor.b, this.targetColor.b, this.colorTimer / this.colorChangeSpeed).toString();

            if (this.colorTimer >= this.colorChangeSpeed)
            {
                this.previousColor = this.targetColor;
                this.changingColor = false;
                this.colorTimer = 0;
                this.colorChangeTimer = 0;
                this.rotationSpeed = 1;
            }
        }
        
        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.updateScene);
    }

    __lerp__(_from, _to, _time)
    {
        _time = this.clamp(_time, 0, 1);
        return _from + (_to - _from) * _time;
    }

    __clamp__(_val, _min, _max)
    {
        return _val < _min ? _min : _val > _max ? _max : _val;
    }

    __random_int__(_min, _max)
    {
        return Math.floor(_min + Math.random() * _max);
    }

    render() {
        return (
            <div>
                <h3 style={{color:'#fff'}}>THREE.js Color Changer</h3>
                <ul>
                    <li style={{color:'#fff'}}><a href='#'>Back</a></li>
                </ul>
                <div className='fullscreen-preview'></div>
            </div>
        )
    }
}

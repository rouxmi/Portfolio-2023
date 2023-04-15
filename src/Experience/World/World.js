import * as THREE from 'three';
import { EventEmitter } from 'events';
import Experience from '../Experience';

import { Octree } from 'three/examples/jsm/math/Octree.js';

import SpawnIsland from './SpawnIsland/SpawnIsland.js';
import AboutMeIsland from './AboutMeIsland/AboutMeIsland.js';
import HobbiesIsland from './HobbiesIsland/HobbiesIsland.js';
import ProjectsIsland from './ProjectsIsland/ProjectsIsland.js';
import ContactIsland from './ContactIsland/ContactIsland.js';


export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;

        this.octree = new Octree();

        this.localStorage = this.experience.localStorage;
        this.state = this.localStorage.state;

        
        this.resources.determineLoad(this.state.location);
        
        this.resources.on("ready", () => {
                this.setWorld();
                this.light = new THREE.AmbientLight(0xffffff, 0.5);
                this.scene.add(this.light);
        });
    }

    setWorld() {
        
        this.SpawnIsland = new SpawnIsland();
    }

    update(){

    }
}

import * as THREE from 'three';
import { EventEmitter } from 'events';
import Experience from '../Experience';

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;

        this.localStorage = this.experience.localStorage;
        this.state = this.localStorage.state;

        this.resources.determineLoad(this.state.location);

        this.resources.on("ready", () => {

        });
    }

    update(){

    }
}

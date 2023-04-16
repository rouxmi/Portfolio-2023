import * as THREE from 'three';
import Experience from '../../../Experience';


export default class InteractiveObjects {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.initInteractive();

    }

    initInteractive() {
        this.interactiveObject = this.resources.items.spawnIsland.interactiveObject.scene;
        //this.scene.add(this.interactiveObject);

    }

}

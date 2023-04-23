import * as THREE from 'three';
import Experience from '../../../Experience';
import { Octree } from 'three/examples/jsm/math/Octree';


export default class InteractiveObjects {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.portals = {};

        this.initInteractive();

    }

    initInteractive() {
        this.interactiveObject = this.resources.items.contactIsland.interactiveObject.scene;
        this.interactiveObject.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
            }
            this.portals[child.name] = new Octree();
            this.portals[child.name].fromGraphNode(child);
        }
        );
        this.scene.add(this.interactiveObject);

    }

}

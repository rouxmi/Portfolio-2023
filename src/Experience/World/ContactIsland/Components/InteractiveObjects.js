import * as THREE from 'three';
import Experience from '../../../Experience';


export default class InteractiveObjects {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.octree = this.experience.world.octree;

        this.initInteractive();

    }

    initInteractive() {
        this.interactiveObject = this.resources.items.contactIsland.interactiveObject.scene;
        this.octree.fromGraphNode(this.interactiveObject);
        this.interactiveObject.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
            }
        }
        );
        this.scene.add(this.interactiveObject);

    }

}

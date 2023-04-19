import * as THREE from 'three';
import Experience from '../../../Experience';
import { Octree } from 'three/examples/jsm/math/Octree';


export default class InteractiveObjects {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.octree = this.experience.world.octree;
        this.trampoline = new Octree()

        this.initInteractive();

    }

    initInteractive() {
        this.interactiveObject = this.resources.items.projectsIsland.interactiveObject.scene;
        this.interactiveObject.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
            }
            if (child.name.includes("trampoline")){
                this.trampoline.fromGraphNode(child);
            } else {
                this.octree.fromGraphNode(child);
            }
        }
        );
        this.scene.add(this.interactiveObject);

    }

}

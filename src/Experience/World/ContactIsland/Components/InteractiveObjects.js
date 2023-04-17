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
            if (child.name.includes("transparent")) {
                const color = child.material.color;
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.side = THREE.DoubleSide;
                child.material.roughness = 0;
                child.material.color.set(color);
                child.material.ior = 3;
                child.material.transmission = 0.9;
                child.material.opacity = 0.05;
                child.material.depthWrite = false;
            }
        }
        );
        this.scene.add(this.interactiveObject);

    }

}

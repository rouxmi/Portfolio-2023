import * as THREE from 'three';
import Experience from '../../../Experience';

import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper.js';

export default class Island {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.octree = this.experience.world.octree;

        this.initIsland();
        this.setColiders();
    }

    initIsland() {
        this.island = this.resources.items.spawnIsland.Island.scene;
        this.scene.add(this.island);
    }

    setColiders() {
        const collider = this.resources.items.spawnIsland.colliderIsland.scene;
        this.octree.fromGraphNode(collider);
        collider.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.dispose();
                child.geometry.dispose();
            }
        }
        );

        const helper = new OctreeHelper(this.octree);
        helper.visible = true;
        //this.scene.add(helper);
    }
}

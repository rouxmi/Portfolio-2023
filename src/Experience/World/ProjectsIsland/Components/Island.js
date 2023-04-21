import * as THREE from 'three';
import Experience from '../../../Experience';


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
        this.island = this.resources.items.projectsIsland.Island.scene;
        this.islandTexture = this.resources.items.projectsIsland.Texture;
        this.islandTexture.flipY = false;
        this.islandTexture.encoding = THREE.sRGBEncoding;
        this.island.children[0].material = new THREE.MeshPhysicalMaterial({
            map : this.islandTexture
        });
        this.island.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            if (child instanceof THREE.Group) {
                child.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.receiveShadow = true;
                        child.castShadow = true;
                    }
                });
            }
            if (child.name.includes("island")) {
                this.experience.world.islandPosition.projetIsland = child.position;
            }
        });
        this.scene.add(this.island);

    }

    setColiders() {
        const collider = this.resources.items.projectsIsland.colliderIsland.scene;
        this.octree.fromGraphNode(collider);
        collider.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.dispose();
                child.geometry.dispose();
            }
        }
        );

    }
}

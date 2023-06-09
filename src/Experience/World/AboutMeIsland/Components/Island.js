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
        this.island = this.resources.items.aboutMeIsland.Island.scene;
        this.islandTexture = this.resources.items.aboutMeIsland.Texture;
        this.islandTexture.flipY = false;
        this.islandTexture.encoding = THREE.sRGBEncoding;
        this.island.children[0].material = new THREE.MeshPhysicalMaterial({
            map : this.islandTexture
        });
        this.computer = this.island.children.find((child) => child.name === "Computer");
        this.computer.children[1].material = new THREE.MeshBasicMaterial({
            map : this.resources.items.aboutMeIsland.Video
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
                this.experience.world.islandPosition.aboutMeIsland = child.position;
            }
        });
        this.scene.add(this.island);

    }

    setColiders() {
        const collider = this.resources.items.aboutMeIsland.colliderIsland.scene;
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

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
        this.island = this.resources.items.contactIsland.Island.scene;
        this.islandTexture = this.resources.items.contactIsland.Texture;
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
                        if (child.name.includes("contact")){
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
                });
            }
            if (child.name.includes("island")) {
                this.experience.world.islandPosition.contactIsland = child.position;
            }
        });
        this.scene.add(this.island);

    }

    setColiders() {
        const collider = this.resources.items.contactIsland.colliderIsland.scene;
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

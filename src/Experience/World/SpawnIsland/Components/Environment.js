import * as THREE from 'three';
import Experience from '../../../Experience.js';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setEnvironment();
    }

    setEnvironment() {
        this.SkyBox = this.resources.items.spawnIsland.SkyBox;
        this.SkyBox.encoding =  THREE.sRGBEncoding;

        this.scene.background = this.SkyBox;

        this.Landscape = this.resources.items.spawnIsland.Landscape.scene;

        this.water = this.Landscape.children[1]
        
        this.water.material = new THREE.MeshPhysicalMaterial();
        this.water.material.roughness = 0;
        this.water.material.color.set(0x77B5FF);
        this.water.material.ior = 3;
        this.water.material.transmission = 0.7;
        this.water.material.opacity = 0.8;
        this.water.material.depthWrite = false;
        this.scene.add(this.Landscape);

        this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
        this.sun.position.set(0, 100, 0);
        this.sun.castShadow = true;
        this.sun.shadow.mapSize.width = 2048;
        this.sun.shadow.mapSize.height = 2048;
        this.sun.shadow.camera.near = 0.5;
        this.sun.shadow.camera.far = 500;
        this.scene.add(this.sun);

        this.light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.light);
    }
}
import * as THREE from 'three';
import Experience from '../../../Experience.js';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setEnvironment();
        this.setSunLight();
        
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

        this.light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.light);
    }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunlight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
        } else {
            GSAP.to(this.sunlight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunlight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        }
    }

    setSunLight() {
        this.sunlight= new THREE.DirectionalLight(0xdddddd, 0.5);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 10000;
        this.sunlight.shadow.camera.near = 1;
        this.sunlight.shadow.camera.left = -25;
        this.sunlight.shadow.camera.right = 60;
        this.sunlight.shadow.camera.top = 35;
        this.sunlight.shadow.camera.bottom = -10;
        this.sunlight.shadow.mapSize.set(2000, 2000);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(-90, 150, 80);
        this.sunlight.target.position.set(this.experience.world.islandPosition.spawnIsland.x, this.experience.world.islandPosition.spawnIsland.y, this.experience.world.islandPosition.spawnIsland.z);
        this.sunlight.target.updateMatrixWorld();

        this.scene.add(this.sunlight);
        this.scene.add(new THREE.CameraHelper(this.sunlight.shadow.camera));

        this.ambientLight = new THREE.AmbientLight('#dddddd',0.1);
        this.scene.add(this.ambientLight);


    }
}
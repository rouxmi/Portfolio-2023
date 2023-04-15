import * as THREE from "three";

import Experience from "../Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.params = {
            fov: 75,
            near: 0.1,
            far: 1000,
            aspect: this.sizes.aspect,
        };

        this.setPerspectiveCamera();
        this.setOrbitControls();
    }

    setPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            this.params.fov,
            this.params.aspect,
            this.params.near,
            this.params.far
        );

        this.perspectiveCamera.position.set(0, 0, -5);
        this.scene.add(this.perspectiveCamera);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
    }

    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
    }
}

import * as THREE from "three"; 

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera/Camera.js";
import Renderer from "./Renderer/Renderer.js";
import LocalStorage from "./LocalStorage/LocalStrorage.js";

import World from "./World/World.js";



export default class Experience{
    static instance;

    constructor(canvas){
        if (Experience.instance){
            return Experience.instance;
        }

        Experience.instance = this;

        this.canvas=canvas;
        this.sizes= new Sizes();
        this.time = new Time();

        this.setScene();
        this.setCamera();
        this.setRenderer();
        this.setLocalStorage();
        this.setResources();
        this.setWorld();

        this.sizes.on("resize", () => {
            this.resize();
        });

        this.update();
    }

    setScene(){
        this.scene= new THREE.Scene();
    }

    setCamera(){
        this.camera = new Camera();
    }

    setRenderer(){
        this.renderer = new Renderer();
    }

    setLocalStorage(){
        this.localStorage = new LocalStorage();
    }

    setResources(){
        this.resources = new Resources(assets);
    }

    setWorld(){
        this.world = new World();
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
    }

    update(){
        if (this.camera) this.camera.update();
        if (this.renderer) this.renderer.update();
        if (this.time) this.time.update();

        const STEPS_PER_FRAME = 10;
        this.deltaTime = Math.min(0.1,this.time.delta) / STEPS_PER_FRAME;
        for (let i = 0; i < STEPS_PER_FRAME; i++) {
            if (this.world) this.world.update(this.deltaTime);
        }


        window.requestAnimationFrame(() => {
            this.update();
        });
    }

}
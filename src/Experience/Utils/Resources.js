import * as THREE from "three";

import Loaders  from "./Loaders.js";
import { EventEmitter } from "events";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        
        this.items = {};
        this.assets = assets;

        this.location = null;

        this.loaders = new Loaders().loaders;
    }

    determineLoad(location){
        this.location = location;
        
        if (!this.items.hasOwnProperty(this.location)){
            this.items[this.location] = {};
            this.startLoading();
        }else{
            this.emitReady(this.location);
        }
    }

    emitReady(location){
        this.emit(location+"ready");
    }

    startLoading(){
        this.loaded = 0;

        this.queue = this.assets[0][this.location].assets.length;


        for (const asset of this.assets[0][this.location].assets){
            if (asset.type === "glbModel"){
                this.loaders.gltfLoader.load(asset.url, (glbFile) => {
                    this.singleAssetLoaded(glbFile, asset.name);
                }
                );
            }else if (asset.type === "video"){
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name]= document.createElement("video");
                this.video[asset.name].src =asset.url;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;
                this.videoTexture[asset.name].matrixAutoUpdate = false;
                this.singleAssetLoaded(this.videoTexture[asset.name], asset.name);
            }
            else if (asset.type === "cubeTexture"){
                this.loaders.cubeTextureLoader.load(asset.url, (cubeTexture) => {
                    this.singleAssetLoaded(cubeTexture, asset.name);
                }
            );
            }
            else if (asset.type === "texture"){
                this.loaders.textureLoader.load(asset.url, (texture) => {
                    this.singleAssetLoaded(texture, asset.name);
                }
            );
            }
        }
        
    }

    singleAssetLoaded(asset, name){
        this.items[this.location][name] = asset;
        this.loaded++;

        if (this.loaded === this.queue ){
            this.emitReady(this.location);
        }
    }

}
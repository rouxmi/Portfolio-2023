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
            this.emitReady();
        }
    }

    emitReady(){
        this.emit("ready");
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
                this.loaders.videoLoader.load(asset.url, (video) => {
                    this.singleAssetLoaded(video, asset.name);
                }
                );
            }
            // else if (asset.type === "cubeTexture"){
            //     this.loaders.cubeTextureLoader.load(asset.url, (cubeTexture) => {
            //         this.singleAssetLoaded(cubeTexture, asset.name);
            //     }
            //     );
        }
        
    }

    singleAssetLoaded(asset, name){
        this.items[this.location][name] = asset;
        this.loaded++;

        if (this.loaded === this.queue ){
            this.emitReady();
        }
    }

}
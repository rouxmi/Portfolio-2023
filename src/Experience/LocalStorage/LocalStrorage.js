import Experience from "../Experience";
import { EventEmitter } from "events";

export default class LocalStorage extends EventEmitter {
    constructor(){
        super();
        this.experience = new Experience();
        this.camera = this.experience.camera;

        this.initPlayerState();
        this.setStateObject();


    }

    initPlayerState(){
        this.stringState = {
            playerPosition: "spawnIsland|0|0|0",
            playerRotation: "0|0|0",
        };

        localStorage.clear();

        if (localStorage.getItem("playerPosition") && 
            localStorage.getItem("playerRotation")){

            this.stringState.playerPosition = 
                localStorage.getItem("playerPosition");
            this.stringState.playerRotation = 
                localStorage.getItem("playerRotation");
        } else{
            localStorage.setItem("playerPosition", 
                this.stringState.playerPosition);
            localStorage.setItem("playerRotation", 
                this.stringState.playerRotation);
        }
    }

    updateLocalStorage(){
        localStorage.setItem(
            "playerPosition",
            this.stringState.location + 
            '|' + this.camera.perspectiveCamera.position.x +
            '|' + this.camera.perspectiveCamera.position.y +
            '|' + this.camera.perspectiveCamera.position.z  
            );
        localStorage.setItem(
            "playerRotation",
            this.camera.perspectiveCamera.rotation.x +
            '|' + this.camera.perspectiveCamera.rotation.y +
            '|' + this.camera.perspectiveCamera.rotation.z
            ); 

        this.stringState.playerPosition = 
            localStorage.getItem("playerPosition");
        this.stringState.playerRotation = 
            localStorage.getItem("playerRotation");
    }

    setLocation(location){
        if (location !== this.stringState.location){
            this.emit("locationChanged", location);
        }
        this.stringState.location = location;
        this.experience.world.player.player.island = location;
    }

    setStateObject(){

        this.state = {
            location: this.stringState.playerPosition.split("|")[0],

            posX: Number(this.stringState.playerPosition.split("|")[1]),
            posY: Number(this.stringState.playerPosition.split("|")[2]),
            posZ: Number(this.stringState.playerPosition.split("|")[3]),

            rotX: Number(this.stringState.playerRotation.split("|")[0]),
            rotY: Number(this.stringState.playerRotation.split("|")[1]),
            rotZ: Number(this.stringState.playerRotation.split("|")[2]),
        };
    }

    update(){
        this.updateLocalStorage();
        this.setStateObject();
    }
}

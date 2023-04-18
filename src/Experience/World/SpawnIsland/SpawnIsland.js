import * as THREE from "three";

import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";
import Environment from "./Components/Environment.js";
import Experience from "../../Experience.js";

import { EventEmitter } from "events";

export default class SpawnIsland extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.player = this.experience.world.player;


        this.setOtherIslandPosition();
    }

    setOtherIslandPosition() {
        this.aboutMeIslandPosition = new THREE.Vector3(
            15.750741583372259,  
            24.555918121337893, 
            -56.464962978968124,);
        this.aboutMeIslandRotation = new THREE.Euler(
            0.002000000000000038,
            4.847999999999994,
            0);

        this.hobbiesIslandPosition = new THREE.Vector3(
            -23.580914246915132,
            23.722435379028322,
            54.53173064229903);
        this.hobbiesIslandRotation = new THREE.Euler(
            -0.08399999999999919,
            2.354000000000017,
            0);

        this.projectsIslandPosition = new THREE.Vector3( 24.870571603277327, 
            18.903372192382815, 
            -3.67283760588);
        this.projectsIslandRotation = new THREE.Euler(
            -0.0339999999999997, 
            4.693999999999933, 
            0);

        this.contactIslandPosition = new THREE.Vector3(
            27.86532093928932,
            27.567198181152346,
            71.74424479499977);
        this.contactIslandRotation = new THREE.Euler(
            -0.017999999999999933,
            4.652000000000011,
            0);
    }

    launchInteractiveObjects(interactiveObject) {
        if (interactiveObject.includes("petit_panneau")) {
            this.handlePetitPanneau(interactiveObject);
        } else if (interactiveObject.includes("grand_panneau")) {
            this.handleGrandPanneau();
        }
    }

    handlePetitPanneau(interactiveObject) {
        if (interactiveObject.includes("about_me")) {
            this.islandName = "island About Me";
        } else if (interactiveObject.includes("hobbies")) {
            this.islandName = "Hobbies island";
        } else if (interactiveObject.includes("project")) {
            this.islandName = "Project's island";
        } else if (interactiveObject.includes("contact")) {
            this.islandName = "Contact's island";
        }
        const textIsland = "Left click to teleport to the "+ this.islandName;
        this.showTeleportMessage(textIsland);
    }

    interactiveActionExecute(interactiveObject){
        if (interactiveObject.includes("about_me")) {
            this.teleportToIsland(this.aboutMeIslandPosition, this.aboutMeIslandRotation);
        } else if (interactiveObject.includes("hobbies")) {
            this.teleportToIsland(this.hobbiesIslandPosition, this.hobbiesIslandRotation);
        } else if (interactiveObject.includes("project")) {
            this.teleportToIsland(this.projectsIslandPosition, this.projectsIslandRotation);
        } else if (interactiveObject.includes("contact")) {
            this.teleportToIsland(this.contactIslandPosition, this.contactIslandRotation);
        }
    }

    showTeleportMessage(textIsland) {
        const teleportMessage = document.querySelector(".teleport-message");
        teleportMessage.classList.remove("hidden");
        const teleportMessageText = document.querySelector(".teleport-message_text");
        teleportMessageText.innerHTML = textIsland;
        this.player.display = teleportMessage;
    }


    handleGrandPanneau() {
        console.log("grand panneau");
    }

    teleportToIsland(position, rotation) {
        this.player.player.collider.start.copy(position);
        this.player.player.collider.end.copy(position);
        this.player.player.collider.end.y += this.player.player.height;
        this.player.player.body.position.copy(position);
        this.player.player.body.rotation.copy(rotation);
        this.player.player.velocity.set(0, 0, 0);
    }


    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();
        this.Environment = new Environment();
        this.emit("IslandSpawnLoaded");
    }

    

    


    resize() {
    }

    update() {
    }
}
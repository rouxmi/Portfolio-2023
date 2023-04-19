import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";

import Experience from "../../Experience.js";

import { EventEmitter } from "events";

export default class ProjectsIsland extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.player = this.experience.world.player;
    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();

        this.emit("IslandProjectsLoaded");
    }

    launchInteractiveObjects(interactiveObject) {
        console.log(interactiveObject);
        if (interactiveObject.includes("trampoline")) {
            this.handleTrampoline();
        } else if (interactiveObject.includes("panneau")) {
            this.handlePanneau();
        } else if (interactiveObject.includes("tuile")) {
            this.handleTuile();
        }
    }

    handleTrampoline() {
        console.log("trampoline");
    }

    handlePanneau() {
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "Projects";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "Game";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "I like to create games. I have created a small games for you to play to discover some of my favourite projects. You can play it by clicking on the sign or by jumping on the trampoline. If you just want to see the projects, you can look at the tiles on the ground.";
        this.player.display = section;
    }

    handleTuile() {
        console.log("tuile");
    }

    interactiveActionExecute(interactiveObject){
        if (interactiveObject.includes("trampoline")) {
            this.handleTrampoline();
        } else if (interactiveObject.includes("panneau")) {
            this.handlePanneau();
        } else if (interactiveObject.includes("tuile")) {
            this.handleTuile();
        }
    }

    resize() {
    }

    update() {
    }
}
import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";

import { EventEmitter } from "events";

export default class ProjectsIsland extends EventEmitter {
    constructor() {
        super();
    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();

        this.emit("IslandProjectsLoaded");
    }

    launchInteractiveObjects(interactiveObject) {
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
        console.log("panneau");
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
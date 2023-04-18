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
            console.log("trampoline");
        }
    }

    

    interactiveActionExecute(interactiveObject){
        if (interactiveObject.includes("git")) {
            this.launchGit();
        } else if (interactiveObject.includes("linkedin")) {
            this.launchLinkedin();
        } else if (interactiveObject.includes("mail")) {
            this.launchMail();
        }
    }

    resize() {
    }

    update() {
    }
}
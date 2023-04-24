import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";
import Experience from "../../Experience.js";

import { EventEmitter } from "events";

export default class ContactIsland extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.SpawnIsland = this.experience.world.SpawnIsland;
        this.player = this.experience.world.player;

    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();
        this.emit("IslandContactLoaded");
    }

    launchInteractiveObjects(interactiveObject, intersect) {
        if (interactiveObject.includes("git")) {
                this.handleGit();
        } else if (interactiveObject.includes("linkedin")) {
            this.handleLinkedin();
        } else if (interactiveObject.includes("mail")) {
            this.handleMail();
        }
    }

    showPortailMessage(textPortail) {
        const portailMessage = document.querySelector(".teleport-message");
        portailMessage.classList.remove("hidden");
        const portailMessageText = document.querySelector(".teleport-message_text");
        portailMessageText.innerHTML = textPortail;
        this.player.display = portailMessage;
    }

    handleGit() {
        this.showPortailMessage("Click or go through the portal to open my Github!");
    }

    launchGit() {
        if (this.opened) {
            return;
        }
        this.opened = true;
        this.teleportBackPlayer();
        window.open("https://github.com/rouxmi", "_blank");
        window.focus();
    }

    handleLinkedin() {
        this.showPortailMessage("Click or go through the portal to open my Linkedin!");
    }

    launchLinkedin() {
        if (this.opened) {
            return;
        }
        this.opened = true;
        this.teleportBackPlayer();
        window.open("https://www.linkedin.com/in/remi-bourdais/", "_blank");
        window.focus();
    }

    handleMail() {
        this.showPortailMessage("Click or go through the portal to send me a email!");
    }

    launchMail(){
        if (this.opened) {
            return;
        }
        this.opened = true;
        this.teleportBackPlayer();
        window.open("contact-form.html", "_blank");
        window.focus();
    }

    teleportBackPlayer() {
        this.player.action = {};
        this.SpawnIsland.interactiveActionExecute("contact",false);
        this.opened = false;
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
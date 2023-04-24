import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";
import Experience from "../../Experience.js";

import { EventEmitter } from "events";

export default class HobbiesIsland extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.SpawnIsland = this.experience.world.SpawnIsland;

        this.player = this.experience.world.player;
    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();

        this.emit("IslandHobbiesLoaded");
    }

    launchInteractiveObjects(interactiveObject) {
        if (interactiveObject.includes("root_me")){
            this.handleRootMe();
        } else if (interactiveObject.includes("vélo")){
            this.handleVelo();
        } else if (interactiveObject.includes("surf")){
            this.handleSurf();
        }
    }

    handleVelo() {
        this.experience.theme.setTheme(1);
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "Hobbies";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "Bike";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "I like to ride my road bike, to go out on the road and to discover new places, that's why I travel a lot with my bike. I want to do the most beautiful climbs in France, i've started climbing in the Pyrenees. Some images of my bike rides are display in this portfolio.";
        this.player.display = section;
    }

    handleRootMe() {
        this.experience.theme.setTheme(1);
        const section = document.querySelector(".section-left");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-left");
        titreSection.innerHTML = "Hobbies";
        const sousTitreSection = document.querySelector(".section-subtitle-text-left");
        sousTitreSection.innerHTML = "Root-Me"
        const textSection = document.querySelector(".section-detail-left");
        textSection.innerHTML = "I enjoy solving challenges on the Root-Me platform. In particular, I like to solve the challenges related to the web and to steganography. If you didn't know, Root-Me is a french platform that allows you to learn about cybersecurity and to test your skills. You can visit my profile by clicking the sign.";
        this.player.display = section;
    }

    handleSurf() {
        this.experience.theme.setTheme(1);
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "Hobbies";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "Surf";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "I started surfing during my erasmus in Lisbon, Portugal. I really like to surf, it's a great way to relax and to enjoy the ocean. I also like to run on the beach, it's a great way to start a day.";
        this.player.display = section;
    }

    launchRootMe() {
        this.teleportBackPlayer();
        window.open("https://root-me.org/Rouxmi", "_blank");
    }

    teleportBackPlayer() {
        this.SpawnIsland.interactiveActionExecute("hobbies",false);
    }


    interactiveActionExecute(interactiveObject){
        if (interactiveObject.includes("root_me")){
            this.launchRootMe();
        }
    }

    resize() {
    }

    update() {
    }
}
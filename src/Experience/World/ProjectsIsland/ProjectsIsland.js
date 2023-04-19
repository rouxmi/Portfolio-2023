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
            this.handleTuile(interactiveObject);
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

    handleTuile(interactiveObject) {
        if (interactiveObject.includes("find_the_cat")) {
            this.handleFindTheCat();
        } else if (interactiveObject.includes("PBFT")) {
            this.handlePBFT();
        } else if (interactiveObject.includes("bird")) {
            this.handleBird();
        } else if (interactiveObject.includes("portfolio")) {
            this.handlePortfolio();
        } else if (interactiveObject.includes("échec")){
            this.handleEchec();
        } else if (interactiveObject.includes("compilateur")){
            this.handleCompiler();
        }
    }

    handleFindTheCat() {
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "Project";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "FindTheCat";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "This project is a clone of the find bash command. It allows you to find a file in a directory and its subdirectories base on multiple criteria. It is written in C to make it as fast as possible. You can find the source code by clicking this tile."; 
        this.player.display = section;
    }

    handlePBFT() {
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "Project";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "PBFT";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "This project is currently in progress. It is a open good market, supported by a blockchain with a PBFT protocol. It is written in Java and uses the Babel framework. The source code is not available for the moment, but you can click ^^.";
        this.player.display = section;
    }

    handleBird() {
        const section = document.querySelector(".section-left");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-left");
        titreSection.innerHTML = "Project";
        const sousTitreSection = document.querySelector(".section-subtitle-text-left");
        sousTitreSection.innerHTML = "BIRD"
        const textSection = document.querySelector(".section-detail-left");
        textSection.innerHTML = "Bird stand for Bird Is Really Democratic. It is my first project at Telecom Nancy. The goal of the project was to make a democratic WebApp. Our app allows you to create projects and to give update, discuss about them and to vote for them. You can find the source code by clicking this tile.";
        this.player.display = section;
    }

    handlePortfolio() {
        const section = document.querySelector(".section-right");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-right");
        titreSection.innerHTML = "Project";
        const sousTitreSection = document.querySelector(".section-subtitle-text-right");
        sousTitreSection.innerHTML = "Portfolio";
        const textSection = document.querySelector(".section-detail-right");
        textSection.innerHTML = "This portfolio is my first project big project with Three.js. I wanted to create a portfolio that would be different from the others. I wanted to create a portfolio that would be fun to use. I hope you enjoy it. You can find the source code of everything you see by clicking this tile.";
        this.player.display = section;
    }

    handleEchec() {
        const section = document.querySelector(".section-left");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-left");
        titreSection.innerHTML = "Project";
        const sousTitreSection = document.querySelector(".section-subtitle-text-left");
        sousTitreSection.innerHTML = "Chess"
        const textSection = document.querySelector(".section-detail-left");
        textSection.innerHTML = "During Covid-19, i decided to code a chess game. This chess game implemented from scratch has many fonctionnalities. You can play against a friend or against an IA and see stats of the game. You can find the source code by clicking this tile.";
        this.player.display = section;
    }

    handleCompiler() {
        const section = document.querySelector(".section-left");
        section.classList.remove("hidden");
        const titreSection = document.querySelector(".section-title-text-left");
        titreSection.innerHTML = "Project";
        const sousTitreSection = document.querySelector(".section-subtitle-text-left");
        sousTitreSection.innerHTML = "Compiler"
        const textSection = document.querySelector(".section-detail-left");
        textSection.classList.add("small-left-margin");
        textSection.innerHTML = "If you didn't know the compiler is a program that reads a source code and translate it into a binary code. This project is a compiler for a language called Tiger. It is written in Java and uses the ANTLR framework. You can find the source code by clicking this tile.";
        this.player.display = section;
    }



    // showGitMessage(textGit) {
    //     const teleportMessage = document.querySelector(".teleport-message");
    //     teleportMessage.classList.remove("hidden");
    //     const teleportMessageText = document.querySelector(".teleport-message_text");
    //     teleportMessageText.innerHTML = textGit;
    //     this.player.display = teleportMessage;
    // }

    interactiveActionExecute(interactiveObject){
        if (interactiveObject.includes("trampoline")) {
            this.handleTrampoline();
        } else if (interactiveObject.includes("panneau")) {
            this.handlePanneau();
        } else if (interactiveObject.includes("tuile")) {
            this.launchTuile(interactiveObject)
        }
    }

    launchTuile(interactiveObject){
        if (interactiveObject.includes("find_the_cat")) {
            window.open("https://github.com/rouxmi/FindBashCommandClone-findthecat-", "_blank");
        } else if (interactiveObject.includes("PBFT")) {
            window.open("https://github.com/rouxmi", "_blank");
        } else if (interactiveObject.includes("bird")) {
            window.open("https://github.com/rouxmi/Bird-D-mocratie-Participative", "_blank");
        } else if (interactiveObject.includes("portfolio")) {
            window.open("https://github.com/rouxmi/Portfolio-2023", "_blank");
        } else if (interactiveObject.includes("échec")){
            window.open("https://github.com/rouxmi/jeux-d-chec-tkinter-avec-IA-", "_blank");
        } else if (interactiveObject.includes("compilateur")){
            window.open("https://github.com/rouxmi/Back-End-Tiger-Compiler-with-Antlr", "_blank");
        }
    }

    resize() {
    }

    update() {
    }
}
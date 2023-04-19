import * as THREE from "three";

import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";
import Tiles from "./Components/Tiles.js";

import Experience from "../../Experience.js";

import { EventEmitter } from "events";

export default class ProjectsIsland extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.player = this.experience.world.player;
        this.inGame = false;
    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();

        this.getTiles();
        this.getTilesPosition();
        this.randomizeTilesPosition();

        
        

        this.emit("IslandProjectsLoaded");
    }

    getTiles() {
        this.tilesVisual = [];
        this.island.island.traverse((child) => {
            if (child instanceof THREE.Group) {
                if (child.name.includes("tuile")) {
                    this.tilesVisual.push(child);
                }
            }
        }
        );
        this.tilesCollider = [];
        this.interactiveObjects.interactiveObject.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.name.includes("tuile")) {
                    this.tilesCollider.push(child);
                }
            }
        }
        );
        this.tiles = [];
        for (let i = 0; i < this.tilesVisual.length; i++) {
            for (let j = 0; j < this.tilesCollider.length; j++) {
                if (this.tilesCollider[j].name.includes(this.tilesVisual[i].name)) {
                    this.tiles.push(new Tiles(this.tilesVisual[i], this.tilesCollider[j]));
                    break;
                }
            }
            this.tiles[i].visual.rotation.y=Math.PI;
        }
    }

    getTilesPosition() {
        this.tilesPosition = [];
        const Xposition = [3.5905189514160156, -5.409481048583984, 12.590518951416016]
        const Zposition = [-2.2945337295532227,-11.294533729553223,6.705466270446777, 15.705466270446777]
        for (let i = 0; i < this.tiles.length; i++) {
            this.tilesPosition.push(new THREE.Vector3(Xposition[i%Xposition.length], 16, Zposition[i%Zposition.length]));
        }
    }

    randomizeTilesPosition() {
        let randomArray = [];
        for (let i = 0; i < 12; i++) {
            randomArray.push(i);
        }
        randomArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].collider.position.set(this.tilesPosition[randomArray[i]].x, this.tilesPosition[randomArray[i]].y, this.tilesPosition[randomArray[i]].z);
            this.tiles[i].visual.position.set(this.tilesPosition[randomArray[i]].x, this.tilesPosition[randomArray[i]].y, this.tilesPosition[randomArray[i]].z);
        }
    }

    flipTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].flipAnimation();
        }
    }


    launchInteractiveObjects(interactiveObject) {
        if (!this.inGame) {
            if (interactiveObject.includes("trampoline")) {
                this.handleTrampoline();
            } else if (interactiveObject.includes("panneau")) {
                this.handlePanneau();
            } else if (interactiveObject.includes("tuile")) {
                this.handleTuile(interactiveObject);
            }
        } else {
            if (interactiveObject.includes("tuile")) {
                console.log("tuile"+interactiveObject);
            }
        }
    }

    handleTrampoline() {
        const teleportMessage = document.querySelector(".teleport-message");
        teleportMessage.classList.remove("hidden");
        const teleportMessageText = document.querySelector(".teleport-message_text");
        teleportMessageText.innerHTML = "To start the game, jump on the Trampoline";
        const image = document.querySelector(".teleport-message_image")
        image.classList.add("hidden")
        this.player.display = teleportMessage;
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
        if (!this.inGame) {
            if (interactiveObject.includes("trampoline")) {
                this.handleTrampoline();
            } else if (interactiveObject.includes("panneau")) {
                this.startGame();
            } else if (interactiveObject.includes("tuile")) {
                this.launchTuile(interactiveObject)
            }
        }
    }

    startGame() {
        this.inGame = true;
        this.player.display.classList.add("hidden");
        this.teleportPlayer();
        this.showQuitMessage();
        this.flipTiles();
    }

    teleportPlayer() {
        const SpawnPos = new THREE.Vector3( 5,  40,  -15);
        this.player.player.body.position.copy(SpawnPos);
        this.player.player.body.position.y += this.player.player.height;
        this.player.player.body.rotation.set(0,0,0);
        this.player.player.velocity = this.player.player.spawn.velocity;
        this.player.player.collider.start.copy(SpawnPos);
        this.player.player.collider.end.copy(SpawnPos);
        this.player.player.collider.end.y += this.player.player.height;
        this.player.player.body.lookAt(0,0,0);
        this.player.player.raycaster.far = 50;
    }

    showQuitMessage() {
        const teleportMessage = document.querySelector(".teleport-message");
        teleportMessage.classList.remove("hidden");
        const teleportMessageText = document.querySelector(".teleport-message_text");
        teleportMessageText.innerHTML = "To quit the game, Press the 'L' key";
        setTimeout(() => {
            teleportMessage.classList.add("hidden");
        }, 5000);
        //add the event listener to quit the game
        document.addEventListener("keydown", (event) => {
            if (event.code === "KeyL") {
                this.quitGame();
            }
        }
        );
    }

    quitGame() {
        this.inGame = false;
        this.player.display.classList.add("hidden");
        this.experience.world.SpawnIsland.interactiveActionExecute("project");
        this.setBackTiles();
    }

    setBackTiles() {
        this.tiles.forEach((tile) => {
            tile.animate = false;
            tile.visual.rotation.x = 0;
            tile.visual.position.y = 16;
            tile.collider.position.y = 16;
            tile.collider.rotation.y = 0;
        });
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
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].update();
        }
    }
}
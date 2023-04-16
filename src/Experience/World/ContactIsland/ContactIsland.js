import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";

import { EventEmitter } from "events";

export default class ContactIsland extends EventEmitter {
    constructor() {
        super();
        

    }

    init() {
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();
        this.emit("IslandContactLoaded");
    }


    resize() {
    }

    update() {
    }
}
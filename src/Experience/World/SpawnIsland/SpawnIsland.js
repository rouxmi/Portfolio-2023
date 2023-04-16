import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";
import Environment from "./Components/Environment.js";

import { EventEmitter } from "events";

export default class SpawnIsland extends EventEmitter {
    constructor() {
        super();
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();
        this.Environment = new Environment();

    }


    resize() {
    }

    update() {
    }
}
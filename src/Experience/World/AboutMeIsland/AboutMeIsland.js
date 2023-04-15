import Island from "./Components/Island.js";
import InteractiveObjects from "./Components/InteractiveObjects.js";

import { EventEmitter } from "events";

export default class AboutMeIsland extends EventEmitter {
    constructor() {
        super();
        this.island = new Island();
        this.interactiveObjects = new InteractiveObjects();


    }

    resize() {
    }

    update() {
    }
}
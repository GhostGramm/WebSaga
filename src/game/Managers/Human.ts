import { Scene } from "phaser";
import { Player } from "./Player";
import { PlayerType } from "../Constants";

export class Human extends Player{

    constructor(scene: Scene, x: number, y: number){
        super(scene,x,y);
    }

    init(): void {
        this.initialScale = 3;
        this.playerType = PlayerType.HUMAN;
        
        super.init();
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }

}
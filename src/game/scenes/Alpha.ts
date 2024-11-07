import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import { GameEvent } from "../Constants";
import { Player } from "../Managers/Player";
import { Human } from "../Managers/Human";

export class Alpha extends Scene
{
    title : GameObjects.Text;
    testPlayer : Player;
    testHuman : Player;

    players : Player[] = [];

    constructor(){
        super('Alpha');
    }

    create(){
        this.instancePlayer();
        this.instanceHuman();
        EventBus.emit(GameEvent.OnSceneLoaded);
    }

    update(time: number, delta: number): void {
        if(this.players.length <= 0) return;

        this.players.forEach(e => {
            e.update(time, delta)
        })
    }

    instancePlayer(){
        this.testPlayer = new Player(this, 500, 300);
        this.players.push(this.testPlayer);
    }

    instanceHuman(){
        this.testHuman = new Human(this, 700, 300);
        this.players.push(this.testHuman);
    }
}
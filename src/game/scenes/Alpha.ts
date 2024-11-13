import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import { GameEvent } from "../Constants";
import { Player } from "../Managers/Player";

export class Alpha extends Scene
{
    title : GameObjects.Text;
    playerOne : Player;

    constructor(){
        super('Alpha');
    }

    create(){
        this.registerKeys();

        this.instancePlayer();

        this.cameras.main.setZoom(1);

        EventBus.emit(GameEvent.OnSceneLoaded);
    }

    update(time: number, delta: number): void {
        this.playerOne?.update(time, delta);
    }

    instancePlayer(){
        this.playerOne = new Player(this, 500, 400, (p: Player) => {});
    }

    registerKeys(): void{
        const space = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        space?.on('down', () =>{
            console.log("Space Bar pressed");
        })
    }
}
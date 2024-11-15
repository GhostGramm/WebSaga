import { AnimationType, PlayerState } from "../Constants";
import { IPlayer } from "../Managers/Player";
import { State } from "../Managers/State";

export class VeteranState extends State{
    scale: number = 1;

    constructor(player: IPlayer){
        super(player);

        this.animations.push(AnimationType.IDLE);
    }

    public OnEnter(): void {
        console.log("Just entered Veteran State");
        
        this.owner.body = this.owner.mainScene.physics.add.sprite(this.owner.getCurrentPositionX(), this.owner.getCurrentPositionY(), "VeteranIdle");
        this.owner.alterScale(this.scale, this.scale);

        this.owner.animation.setCurrentPlaying(PlayerState.VETERAN, AnimationType.IDLE);
    }

    public OnUpdate(time: number, delta: number): void {
        
    }
    
    public OnExit(): void {
        console.log("Just exit Veteran State");
        super.OnExit();
    }
}
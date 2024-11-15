import { AnimationType, PlayerState } from "../Constants";
import { IPlayer, Player } from "./Player";

export abstract class State{
    owner: Player;
    animations: AnimationType[]
    
    constructor(player: IPlayer){
        this.owner = player as Player;
        this.animations = [];
    }

    public abstract OnUpdate(time: number, delta: number) : void;

    public OnEnter() : void {
        
    };
    
    public OnExit() : void {
        this.owner.body.destroy();
    };
}

export class StateMachine{
    
    states: Map<PlayerState, State>;

    public currentStateType: PlayerState;
    public currentState: State;

    constructor(){
        this.states = new Map<PlayerState, State>();
    }

    changeState(newState: PlayerState): void {
        console.log(this.currentState);
        this.currentState?.OnExit();

        if(this.states.has(newState)){
            const state = this.states.get(newState);
            state?.OnEnter();

            this.currentStateType = newState;
            this.currentState = state != null ? state : this.currentState
        }

    }


    update(time: number, delta: number){
        this.currentState?.OnUpdate(time, delta);
    }

}
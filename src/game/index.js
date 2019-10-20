import { GameObject } from "./engine/GameObject";
import { Level } from "./Level";
import { Player } from "./Player";
import { FieldOfVison } from "./FieldOfVison";
import { FPSView } from "./engine/FPSView";


export function init(){
  const root = new GameObject()
  root.addChild(new Level())
  root.addChild(new FPSView())
  const player = new Player()
    player.addChild(new FieldOfVison())
  root.addChild(player)
  return root
}

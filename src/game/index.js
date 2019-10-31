import { GameObject } from "./engine/GameObject";
import { Level } from "./Level";
import { Player } from "./Player";
import { FieldOfVison } from "./FieldOfVison";
import { FPSView } from "./engine/FPSView";
import { CacheView } from "./engine/debug/CacheView";
import { getCache } from "./engine/Images";


export function init(){
  const root = new GameObject()
  root.addChild(new Level())
  const player = new Player()
  player.addChild(new FieldOfVison())
  root.addChild(player)
  root.addChild(new FPSView())
  root.addChild(new CacheView(getCache()))
  return root
}

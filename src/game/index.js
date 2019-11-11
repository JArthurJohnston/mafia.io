import { GameObject } from "./engine/GameObject";
import { Level } from "./Level";
import { Player } from "./Player";
import { FieldOfVison } from "./FieldOfVison";
import { FPSView } from "./engine/FPSView";
import { Ammo } from "./Ammo";

// import { CacheView } from "./engine/debug/CacheView";
// import { getCache } from "./engine/Images";


export function init(){
  const root = new GameObject()
  const player = new Player()
  
  root.addChild(new Level())
  root.addChild(new FieldOfVison())
  root.addChild(player)
  root.addChild(new FPSView())
  root.addChild(new Ammo())
  // root.addChild(new CacheView(getCache()))
  return root
}

import { GameObject } from "./engine/GameObject";
import { Level } from "./Level";
import { Player } from "./Player";
import { FieldOfVison } from "./FieldOfVison";
import { FPSView } from "./engine/FPSView";
import { Ammo } from "./Ammo";
import { MiniMap } from "./MiniMap";
import { UIPanels } from "./UIPanels";

import { CacheView } from "./engine/debug/CacheView";
import { getCache } from "./engine/Images";
import OtherPlayers from "./OtherPlayers";
import { ScreenWipe } from "./ScreenWipe";


export function init(){
  const root = new GameObject()
  const player = new Player()
  const fpsView = new FPSView();
  const uiPanels = new UIPanels();
  const playerScreenWipe = new ScreenWipe()
  playerScreenWipe.layer = 'players'

  uiPanels.addChild(fpsView)
  uiPanels.addChild(new Ammo())
  uiPanels.addChild(new MiniMap())
  
  root.addChild(new Level())
  root.addChild(new FieldOfVison())
  root.addChild(playerScreenWipe)
  root.addChild(player)
  root.addChild(new OtherPlayers())
  root.addChild(uiPanels)
  // root.addChild(new CacheView(getCache()))
  return root
}

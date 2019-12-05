import { GameObject } from "./engine/GameObject";
import { Level } from "./Level";
import Player from "./Player";
import { FieldOfVison } from "./FieldOfVison";
import { FPSView } from "./debugging/FPSView";
import { Ammo } from "./Ammo";
import { MiniMap } from "./MiniMap";
import { UIPanels } from "./UIPanels";

// import { CacheView } from "./engine/debug/CacheView";
// import { getCache } from "./engine/Images";
import OtherPlayers from "./OtherPlayers";
import { ScreenWipe } from "./ScreenWipe";
import { ScreenInfoView } from "./debugging/ScreenInfoView";
import MousePosition from "./debugging/MousePosition";

export function init(){
  const root = new GameObject()
  const player = new Player()
  const uiPanels = new UIPanels();
  
  const debugTools = new GameObject()
  const debugScreenWipe = new ScreenWipe()
  debugScreenWipe.layer = 'debug'
  debugTools.addChild(debugScreenWipe)
  debugTools.addChild(new FPSView());
  debugTools.addChild(new ScreenInfoView())
  debugTools.addChild(new MousePosition())
  
  const playerScreenWipe = new ScreenWipe()
  playerScreenWipe.layer = 'players'

  uiPanels.addChild(new Ammo())
  uiPanels.addChild(new MiniMap())
  root.addChild(debugTools)
  
  const level = new Level();
  level.addChild(new OtherPlayers())

  root.addChild(playerScreenWipe)
  root.addChild(level)
  root.addChild(player)
  root.addChild(new FieldOfVison())
  root.addChild(uiPanels)
  // root.addChild(new CacheView(getCache()))
  return root
}

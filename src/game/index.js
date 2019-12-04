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
  const fpsView = new FPSView();
  const screenView = new ScreenInfoView()
  const uiPanels = new UIPanels();
  const playerScreenWipe = new ScreenWipe()
  playerScreenWipe.layer = 'players'
  const debugScreenWipe = new ScreenWipe()
  debugScreenWipe.layer = 'debug'

  uiPanels.addChild(fpsView)
  uiPanels.addChild(screenView)
  uiPanels.addChild(new MousePosition())
  uiPanels.addChild(new Ammo())
  uiPanels.addChild(new MiniMap())
  
  const level = new Level();
  level.addChild(new OtherPlayers())

  root.addChild(level)
  root.addChild(new FieldOfVison())
  root.addChild(playerScreenWipe)
  root.addChild(debugScreenWipe)
  root.addChild(player)
  root.addChild(uiPanels)
  // root.addChild(new CacheView(getCache()))
  return root
}

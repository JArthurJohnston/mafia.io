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
  const debugScreenWipe = new ScreenWipe()
  debugScreenWipe.layer = 'debug'

  const debugTools =
    new GameObject()
      .addChild(debugScreenWipe)
      .addChild(new FPSView())
      .addChild(new ScreenInfoView())
      .addChild(new MousePosition())
  
  const uiPanels = 
    new UIPanels()
      .addChild(new Ammo())
      .addChild(new MiniMap())
          
  const level = 
    new Level()
      .addChild(new OtherPlayers())
      
  const playerScreenWipe = new ScreenWipe()
  playerScreenWipe.layer = 'players'

  const root = 
    new GameObject()    
      .addChild(debugTools)
      .addChild(playerScreenWipe)
      .addChild(level)
      .addChild(new Player())
      .addChild(new FieldOfVison())
      .addChild(uiPanels)
  //    .addChild(new CacheView(getCache()))
  return root
}

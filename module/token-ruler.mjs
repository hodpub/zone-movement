import { calculateZoneCost, getPath, prepareZoneLabel } from "./zone-ruler.mjs";

export default class ZoneTokenRuler extends foundry.canvas.placeables.tokens.TokenRuler {
  _getWaypointLabelContext(waypoint, state) {
    const context = super._getWaypointLabelContext(waypoint, state);
    if (!context) return;

    const scene = game.scenes.current;
    if (scene.grid.units != "zone")
      return context;

    const executed = waypoint.stage == "passed";
    const paths = getPath(waypoint);
    const cost = calculateZoneCost(paths, scene, executed);
    const costLabel = prepareZoneLabel(cost, scene, paths);

    if (game.settings.get("zone-movement", "drawTokenPoints") && executed) {
      console.log("Zone Movement | Executed waypoint cost:", costLabel, "at waypoint:", waypoint, "with paths:", paths);

      const color = Math.floor(Math.random() * 0xFFFFFF);
      for (const p of paths) {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawCircle(0, 0, 4);
        g.endFill();
        g.position.set(p.x, p.y);
        canvas.stage.addChild(g);
      }
    }

    context.cost = costLabel;
    context.distance = costLabel;
    return context;
  }
}
import { calculateZoneCost, getPath, prepareZoneLabel } from "./zone-ruler.mjs";

export default class ZoneTokenRuler extends foundry.canvas.placeables.tokens.TokenRuler {
  _getWaypointLabelContext(waypoint, state) {
    const context = super._getWaypointLabelContext(waypoint, state);
    if (!context) return;

    const scene = game.scenes.current;
    if (scene.grid.units != game.i18n.localize("ZONE-MOVEMENT.zone"))
      return context;

    const paths = getPath(waypoint);
    const cost = calculateZoneCost(paths, scene);
    const costLabel = prepareZoneLabel(cost, scene, paths);

    context.cost = costLabel;
    context.distance = costLabel;
    return context;
  }
}
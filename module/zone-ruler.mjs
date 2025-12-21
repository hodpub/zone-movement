export function getPath(waypoint) {
  if (!waypoint.previous) return [];

  const grid = game.canvas.grid;
  const gridSize = game.settings.get("zone-movement", "gridlessStepSize") || grid.size;

  if (grid.type == CONST.GRID_TYPES.GRIDLESS)
    return getGridlessPath(waypoint, gridSize);

  let point = waypoint;
  const paths = [];

  while (point.previous) {
    const start = grid.getOffset({ x: point.previous.x, y: point.previous.y, elevation: point.previous.elevation });
    const end = grid.getOffset({ x: point.x, y: point.y, elevation: point.elevation });
    const coordinates = grid.getDirectPath([start, end]);

    for (const coord of coordinates.reverse()) {
      const p = grid.getCenterPoint(coord);
      paths.push({ x: p.x, y: p.y, elevation: waypoint.elevation });
    }
    point = point.previous;
  }
  return paths.reverse();
}

function getGridlessPath(waypoint, step) {
  if (!waypoint.previous) return [];
  const paths = [];
  let point = waypoint;

  while (point.previous) {
    const start = point.previous.center ?? point.previous;
    const end = point.center ?? point;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      paths.push({
        x: end.x,
        y: end.y,
        elevation: 0
      });
      point = point.previous;
      continue;
    }

    const ux = dx / distance;
    const uy = dy / distance;

    const steps = Math.floor(distance / step);

    for (let i = 0; i <= steps; i++) {
      paths.push({
        x: end.x - ux * step * i,
        y: end.y - uy * step * i,
        elevation: 0
      });
    }

    const last = paths[paths.length - 1];
    if (last.x !== start.x || last.y !== start.y) {
      paths.push({
        x: start.x,
        y: start.y,
        elevation: 0
      });
    }

    point = point.previous;
  }

  return paths.reverse();
}

export function calculateZoneCost(paths, scene, executed = false) {
  let cost = 0;
  let previousZone = null;
  let currentZone = null;
  let first = true;
  const countNoRegionAsZone = game.settings.get("zone-movement", "countNoRegionAsZone");
  const logDebugMessages = game.settings.get("zone-movement", "logDebugMessages");
  for (const path of paths) {
    currentZone = null;
    for (const region of scene.regions) {

      if (!region.behaviors.filter(it => it.type == "modifyMovementCost").length)
        continue;

      const coordinateInRegion = region.testPoint(path);

      if (!coordinateInRegion)
        continue;

      if (first || (!previousZone && !countNoRegionAsZone))
        previousZone = region.id;
      if (currentZone && logDebugMessages)
        console.warn("Zone Movement | Warning: Multiple regions detected at the same point:", path, "Regions:", currentZone, region.id);

      currentZone = region.id;
      break;
    }
    if (executed && first && logDebugMessages)
      console.log("Zone Movement | Starting point:", path, "From:", previousZone, "To:", currentZone);
    first = false;

    if (currentZone == null && !countNoRegionAsZone)
      continue;

    if (currentZone == previousZone)
      continue;

    if (previousZone == null && !countNoRegionAsZone)
      continue;

    if (executed && logDebugMessages)
      console.log("Zone Movement | Zone change detected at point:", path, "From:", previousZone, "To:", currentZone);
    cost += 1;
    previousZone = currentZone;
  }
  return cost;
}

export function prepareZoneLabel(cost, scene, paths) {
  let unit = game.i18n.localize("ZONE-MOVEMENT.zone.plural");
  if (cost == 1)
    unit = game.i18n.localize("ZONE-MOVEMENT.zone.singular");

  const showProximity = game.settings.get("zone-movement", "showLabels");
  if (!showProximity)
    return { total: cost, units: unit };

  const isEngaged = (cost == 0 && paths.length == 2 && (Math.abs(paths[0].x - paths[1].x) <= scene.grid.sizeX) && (Math.abs(paths[0].y - paths[1].y) <= scene.grid.sizeY));
  let delta = game.settings.get("zone-movement", "ShortText") || "ZONE-MOVEMENT.DistanceLabel.Short.Default";

  if (isEngaged)
    delta = game.settings.get("zone-movement", "EngagedText") || "ZONE-MOVEMENT.DistanceLabel.Engaged.Default";
  else if (cost >= (game.settings.get("zone-movement", "ExtremeRange") || 5))
    delta = game.settings.get("zone-movement", "ExtremeText") || "ZONE-MOVEMENT.DistanceLabel.Extreme.Default";
  else if (cost >= (game.settings.get("zone-movement", "LongRange") || 2))
    delta = game.settings.get("zone-movement", "LongText") || "ZONE-MOVEMENT.DistanceLabel.Long.Default";
  else if (cost >= (game.settings.get("zone-movement", "MediumRange") || 1))
    delta = game.settings.get("zone-movement", "MediumText") || "ZONE-MOVEMENT.DistanceLabel.Medium.Default";
  delta = game.i18n.localize(delta);

  return { total: cost, units: unit, delta };
}
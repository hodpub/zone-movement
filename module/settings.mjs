function allSettings() {
  const settingsToRegister = {};
  settingsToRegister.showLabels = {
    config: true,
    name: "ZONE-MOVEMENT.DistanceLabel.Name",
    hint: "ZONE-MOVEMENT.DistanceLabel.Hint",
    scope: 'world',
    type: Boolean,
    default: true,
  };

  ["Engaged", "Short", "Medium", "Long", "Extreme"].forEach(label => {
    settingsToRegister[`${label}Text`] = {
      config: true,
      name: `ZONE-MOVEMENT.DistanceLabel.${label}.Name`,
      hint: `ZONE-MOVEMENT.DistanceLabel.${label}.Hint`,
      scope: 'world',
      type: String,
      default: null,
    }
  });

  ["Extreme", "Long", "Medium"].forEach(label => {
    settingsToRegister[`${label}Range`] = {
      config: true,
      name: `ZONE-MOVEMENT.DistanceLabel.${label}.Zones.Name`,
      hint: `ZONE-MOVEMENT.DistanceLabel.${label}.Zones.Hint`,
      scope: 'world',
      type: String,
      default: null,
    }
  });

  settingsToRegister.countNoRegionAsZone = {
    config: true,
    name: "ZONE-MOVEMENT.CountNoRegionAsZone.Name",
    hint: "ZONE-MOVEMENT.CountNoRegionAsZone.Hint",
    scope: 'world',
    type: Boolean,
    default: true,
  };

  return settingsToRegister;
}

export function registerSettings() {
  const settings = allSettings();
  for (let k of Object.keys(settings)) {
    game.settings.register("zone-movement", k, settings[k]);
  }
}
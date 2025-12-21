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
      name: `ZONE-MOVEMENT.DistanceLabel.${label}.Ranges.Name`,
      hint: `ZONE-MOVEMENT.DistanceLabel.${label}.Ranges.Hint`,
      scope: 'world',
      type: Number,
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

  settingsToRegister.gridlessStepSize = {
    config: true,
    name: "ZONE-MOVEMENT.GridlessStepSize.Name",
    hint: "ZONE-MOVEMENT.GridlessStepSize.Hint",
    scope: 'world',
    type: Number,
    default: null,
    range: {
      min: 5,
      step: 5,
      max: 500,
    },
  };

  settingsToRegister.drawTokenPoints = {
    config: true,
    name: "ZONE-MOVEMENT.DrawTokenPoints.Name",
    hint: "ZONE-MOVEMENT.DrawTokenPoints.Hint",
    scope: 'world',
    type: Boolean,
    default: false,
  };

  settingsToRegister.logDebugMessages = {
    config: true,
    name: "ZONE-MOVEMENT.LogDebugMessages.Name",
    hint: "ZONE-MOVEMENT.LogDebugMessages.Hint",
    scope: 'world',
    type: Boolean,
    default: false,
  };

  return settingsToRegister;
}

export function registerSettings() {
  const settings = allSettings();
  for (let k of Object.keys(settings)) {
    game.settings.register("zone-movement", k, settings[k]);
  }
}
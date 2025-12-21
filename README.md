[![](https://img.shields.io/github/downloads/hodpub/zone-movement/module.zip?style=for-the-badge&logo=github)](#) [![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fzone-movement&colorB=448d34&style=for-the-badge)](https://forge-vtt.com/bazaar#package=zone-movement) [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F0VE26Y)

# Zone Movement
This module changes how the scene measure works, allowing you to measure that based on zones! It works for both the ruler and token drag.

| | | |
| ------------- | ------------- | ------------- |
| ![Example Screenshot](/docs/zone-movement-1.webp) | ![Example Screenshot](/docs/zone-movement-2.webp) | ![Example Screenshot](/docs/zone-movement-3.webp) |
| ![Example Screenshot](/docs/zone-movement-4.webp) | ![Example Screenshot](/docs/zone-movement-5.webp) | ![Example Screenshot](/docs/zone-movement-6.webp) | 

## Installation
1. Go to the setup page and choose Add-on Modules.
2. Click the Install Module button:
   1. Search for Zone Movement.
   2. Paste the following on the Manifest Link: [https://github.com/hodpub/zone-movement/releases/latest/download/module.json](https://github.com/hodpub/zone-movement/releases/latest/download/module.json)
3. In your world, enable the module on the module settings.

## How to configure a map to use zones
1. On the Grid configuration, change the unit to `zone`. Even if you use another language, use `zone` on the configuration. The label will be translated to the language (if a translation is available).
   - The module will only measure the distances in zones if you configure the unit to that
2. Create regions on the map to define your zones. You need to add a `Modify Movement Cost` *behaviour* on the region
   - You don't need to change the values of the movement cost
   - If a region does not have the `Modify Movement Cost` *behaviour*, it will not be considered a zone
      - This way you can still have regions to do any other behaviour you want

And that's it!

## Other Configurations
- Enable/Disable the distance labels, based on the **Coriolis: The Great Dark** system.
   - Adjacent space: Engaged
   - Same Region: Short
   - Adjacent Region: Medium
   - Up to 4 Regions: Long
   - More than 4 regions: Extreme
- Configure custom labels for the distances above
   - Accepts Translation keys
- Consider or skip areas without regions on the zone calculation

## Gridless maps
The module now fully supports gridless maps, with a small caveats: we recommend to disable the "Count No Region as Zone". For gridless maps, we generate the paths for zone calculation dynamically. Foundry APIs consider that a region boundary is not "inside" the region itself, which means that if a point of the movement hits the boundary of the region, it will wrongly calculate that point as a new region.

## Debug options
To make it easier to debug some edge cases, there are two configurations.

The first option, **Draw Token Points**, will draw dots on the map to show the points that were used for the zone calculations.

The second option, **Log Debug Messages**, will log messages with the path information.

If you are having some issues, please, enable these options so you can provide the debug data for us.

# Tested Systems
Systems do not need to do anything to use this module. It should be fairly simple to use it.
However, if the system does any change on the Canvas' Ruler or the Token's Ruler, it will not activate the module.
If you test a new system, open a PR with the new system on this list.
- [Coriolis: The Great Dark](https://foundryvtt.com/packages/coriolis-tgd), from Free League
- [Invincible](https://foundryvtt.com/packages/invincible), from Free League
- [Coriolis: The Third Horizon](https://foundryvtt.com/packages/yzecoriolis), from Free League

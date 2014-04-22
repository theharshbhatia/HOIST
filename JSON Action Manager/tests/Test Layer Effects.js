/*

<javascriptresource>
<name>Test Layer Effects...</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Layer Effects.js
// Version: 4.1
// Release Date: 2014-03-16
// Copyright: © 2011-2014 Michel MARIANI <http://www.tonton-pixel.com/blog/>
// Licence: GPL <http://www.gnu.org/licenses/gpl.html>
//------------------------------------------------------------------------------
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//------------------------------------------------------------------------------

//@includepath "~/JSON Action Manager/"
//@include "jamEngine.jsxinc"
//@include "jamHelpers.jsxinc"
//@include "jamStyles.jsxinc"
//@include "jamUtils.jsxinc"

//------------------------------------------------------------------------------

// Used to locate the preset files (custom shapes, styles...)
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

var operations =
[
    "Set Layer Effects",
    "Apply Layer Style"
];
var desiredOperation = operations[0];
var allOperations = "*All*";

//------------------------------------------------------------------------------

var docWidth = 800;
var docHeight = 800;
var docResolution = 300;
var text = "X";
var size = 1024;

//------------------------------------------------------------------------------

var layerStyleObj =
{
    "blendOptions":
    {
        "fillOpacity": 70,
        "blendInterior": true
    },
    "layerEffects":
    {
        "scale": docResolution / 72 * 100,
        "bevelEmboss":
        {
            "enabled": true,
            "bevelStyle": "innerBevel",
            "bevelTechnique": "softMatte",
            "strengthRatio": 80,
            "bevelDirection": "stampIn",
            "blur": 16,
            "softness": 0,
            "localLightingAngle": 90,
            "useGlobalAngle": false,
            "localLightingAltitude": 75,
            "transparencyShape":
            {
                "name": "Linear",
                "curve":
                [
                    { "horizontal": 0, "vertical": 0 },
                    { "horizontal": 255, "vertical": 255 }
                ]
            },
            "antialiasGloss": false,
            "highlightMode": "screen",
            "highlightColor": { "red": 255, "green": 255, "blue": 255 },
            "highlightOpacity": 100,
            "shadowMode": "multiply",
            "shadowColor": { "red": 0, "green": 0, "blue": 0 },
            "shadowOpacity": 100,
            "useShape": true,
            "mappingShape":
            {
                "name": "Half Round",
                "curve":
                [
                    { "horizontal": 0, "vertical": 0 },
                    { "horizontal": 29, "vertical": 71 },
                    { "horizontal": 87, "vertical": 167 },
                    { "horizontal": 195, "vertical": 240 },
                    { "horizontal": 255, "vertical": 255 }
                ]
            },
            "antiAlias": true,
            "inputRange": 70,
            "useTexture": false
        },
        "innerShadow":
        {
            "enabled": true,
            "mode": "multiply",
            "color": { "red": 0, "green": 0, "blue": 0 },
            "opacity": 70,
            "localLightingAngle": 90,
            "useGlobalAngle": false,
            "distance": 10,
            "chokeMatte": 15,
            "blur": 20,
            "transparencyShape":
            {
                "name": "Linear",
                "curve":
                [
                    { "horizontal": 0, "vertical": 0 },
                    { "horizontal": 255, "vertical": 255 }
                ]
            },
            "antiAlias": false,
            "noise": 0
        },
        "innerGlow":
        {
            "enabled": true,
            "mode": "linearDodge",
            "opacity": 31,
            "noise": 0,
            "color": { "red": 255, "green": 246, "blue": 168 },
            "glowTechnique": "preciseMatte",
            "innerGlowSource": "centerGlow",
            "chokeMatte": 0,
            "blur": 20,
            "transparencyShape":
            {
                "name": "Half Round",
                "curve":
                [
                    { "horizontal": 0, "vertical": 0 },
                    { "horizontal": 29, "vertical": 71 },
                    { "horizontal": 87, "vertical": 167 },
                    { "horizontal": 195, "vertical": 240 },
                    { "horizontal": 255, "vertical": 255 }
                ]
            },
            "antiAlias": true,
            "inputRange": 43,
            "shadingNoise": 0
        },
        "solidFill":
        {
            "enabled": true,
            "mode": "normal",
            "color": { "red": 0, "green": 102, "blue": 255 },
            "opacity": 100
        },
        "dropShadow":
        {
            "enabled": true,
            "mode": "multiply",
            "color": { "red": 0, "green": 0, "blue": 0 },
            "opacity": 70,
            "localLightingAngle": 90,
            "useGlobalAngle": false,
            "distance": 6,
            "chokeMatte": 0,
            "blur": 4,
            "transparencyShape":
            {
                "name": "Linear",
                "curve":
                [
                    { "horizontal": 0, "vertical": 0 },
                    { "horizontal": 255, "vertical": 255 }
                ]
            },
            "antiAlias": false,
            "noise": 0,
            "layerConceals": true
        }
    }
};

//------------------------------------------------------------------------------

function getParameters ()
{
    var dialogWidth = 200;
    var dialogHeight = 300; // Dynamically adjusted anyway
    var dialogPadding = [ 15, 15 ];
    var panelPadding = [ 15, 15 ];
    var buttonWidth = 80;
    var buttonHeight = 20;
    var buttonGap = 5;
    var extraGap = (appVersion > 8) ? 0 : 12;
    var dlg = new Window ('dialog', "Test Layer Effects", [ 0, 0, dialogWidth, dialogHeight ]);
    dlg.btnPnl = dlg.add ('panel', [ dialogPadding[0], dialogPadding[1], dialogWidth - dialogPadding[0], dialogHeight - dialogPadding[1] ], 'Operation');
    dlg.btnPnl.horizBtn = [ ];
    var y = panelPadding[1] + extraGap;
    var count = operations.length;
    for (var i = 0; i < count; i++)
    {
        dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], operations[i]));
        y += buttonHeight + buttonGap;
    }
    dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], allOperations));
    y += buttonHeight + buttonGap;
    var count = dlg.btnPnl.horizBtn.length;
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        radbut.value = (radbut.text === desiredOperation);
        radbut.onClick = function () { desiredOperation = this.text; };
    }
    dlg.btnPnl.bounds.bottom = dlg.btnPnl.bounds.top + y + panelPadding[1];
    dlg.bounds.bottom = dlg.bounds.top + dialogPadding[1] + (dlg.btnPnl.bounds.bottom - dlg.btnPnl.bounds.top) + dialogPadding[1] + buttonHeight + dialogPadding[1];
    dlg.cancelBtn = dlg.add ('button', [ dialogPadding[0], dlg.bounds.bottom - dialogPadding[1] - buttonHeight, dialogPadding[0] + buttonWidth, dlg.bounds.bottom - dialogPadding[1] ], 'Cancel', { name: "cancel" });
    dlg.cancelBtn.onClick = function () { this.parent.close (false); };
    dlg.OKBtn = dlg.add ('button', [ dlg.bounds.right - dialogPadding[0] - buttonWidth, dlg.bounds.bottom - dialogPadding[1] - buttonHeight, dlg.bounds.right - dialogPadding[0], dlg.bounds.bottom - dialogPadding[1] ], 'OK', { name: "ok" });
    dlg.OKBtn.onClick = function () { this.parent.close (true); };
    dlg.center ();
    return dlg.show ();
}

//------------------------------------------------------------------------------

function processOperation (desiredOperation)
{
    jamEngine.jsonPlay
    (
        "make",
        {
            "new":
            {
                "<object>":
                {
                    "document":
                    {
                        "name": { "<string>": "Test Layer Effects | " + desiredOperation },
                        "mode": { "<class>": "RGBColorMode" },
                        "width": { "<unitDouble>": { "distanceUnit": jamUtils.toDistanceUnit (docWidth, docResolution) } },
                        "height": { "<unitDouble>": { "distanceUnit": jamUtils.toDistanceUnit (docHeight, docResolution) } },
                        "resolution": { "<unitDouble>": { "densityUnit": docResolution } },
                        "depth": { "<integer>": 8 },
                        "fill": { "<enumerated>": { "fill": "white" } },
                        "profile": { "<string>": "sRGB IEC61966-2.1" }
                    }
                }
            }
        }
    );
    if (desiredOperation === "Apply Layer Style")
    {
        jamEngine.jsonPlay ("invert");
    }
    if ((desiredOperation !== "Apply Layer Style") && jamUtils.fontExists ("AppleGaramond-Light"))
    {
        jamEngine.jsonPlay
        (
            "make",
            {
                "target": { "<reference>": [ { "textLayer": { "<class>": null } } ] },
                "using":
                {
                    "<object>":
                    {
                        "textLayer":
                        {
                            "textKey": { "<string>": text },
                            "textClickPoint": jamHelpers.toPointObject ([ [ 50.75, 92.75 ], "percentUnit" ]),
                            "antiAlias": { "<enumerated>": { "antiAliasType": "antiAliasCrisp" } },
                            "textStyleRange":
                            {
                                "<list>":
                                [
                                    {
                                        "<object>":
                                        {
                                            "textStyleRange":
                                            {
                                                "from": { "<integer>": 0 },
                                                "to": { "<integer>": text.length },
                                                "textStyle":
                                                {
                                                    "<object>":
                                                    {
                                                        "textStyle":
                                                        {
                                                            "fontPostScriptName": { "<string>": "AppleGaramond-Light" },
                                                            "size": { "<unitDouble>": { "pixelsUnit": size } },
                                                            "color": jamHelpers.toColorObject ([ "grayscale", (desiredOperation === "Apply Layer Style") ? 0 : 100 ])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            "paragraphStyleRange":
                            {
                                "<list>":
                                [
                                    {
                                        "<object>":
                                        {
                                            "paragraphStyleRange":
                                            {
                                                "from": { "<integer>": 0 },
                                                "to": { "<integer>": text.length },
                                                "paragraphStyle":
                                                {
                                                    "<object>":
                                                    {
                                                        "paragraphStyle":
                                                        {
                                                            "alignment": { "<enumerated>": { "alignmentType": "center" } }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        );
    }
    else
    {
        var shapeName = "Logo X-Aqua in Apple Garamond Light";
        var shapePresetPath = "Logo-X-Aqua.csh";
        jamUtils.loadPreset ("customShape", shapeName, shapePresetPath);
        jamEngine.jsonPlay
        (
            "make",
            {
                "target": { "<reference>": [ { "contentLayer": { "<class>": null } } ] },
                "using":
                {
                    "<object>":
                    {
                        "contentLayer":
                        {
                            "type":
                            {
                                "<object>":
                                {
                                    "solidColorLayer":
                                    {
                                        "color": jamHelpers.toColorObject ([ "grayscale", (desiredOperation === "Apply Layer Style") ? 0 : 100 ])
                                    }
                                }
                            },
                            "shape": jamHelpers.toCustomShapeObject ([ [ shapeName, 136, 97, 675.5, 742 ], "pixelsUnit" ])
                        }
                    }
                }
            }
        );
    }
    switch (desiredOperation)
    {
        case "Set Layer Effects":
            jamStyles.setLayerStyle (layerStyleObj);
            break;
        case "Apply Layer Style":
            jamUtils.loadPreset ("style", "Logo X-Aqua in Blue Glass (Button)", "Logo-X-Aqua.asl");
            jamStyles.applyLayerStyle ("Logo X-Aqua in Blue Glass (Button)");
            jamStyles.scaleLayerEffects (72 / docResolution * 100);
            break;
    }
    jamEngine.jsonPlay
    (
        "make",
        {
            "target": { "<reference>": [ { "adjustmentLayer": { "<class>": null } } ] },
            "using":
            {
                "<object>":
                {
                    "adjustmentLayer":
                    {
                        "name": { "<string>": "Neutral Overlay" },
                        "mode": { "<enumerated>": { "blendMode": "overlay" } },
                        "type": { "<object>": { "brightnessContrast": null } }
                    }
                }
            }
        }
    );
    jamEngine.jsonPlay ("delete", { "target": { "<reference>": [ { "channel": { "<enumerated>": { "channel": "mask" } } } ] } });   // Delete layer mask
    jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "previous" } } } ] } });
}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);
if (getParameters ())
{
    if (desiredOperation === allOperations)
    {
        for (var i = 0; i < operations.length; i++)
        {
            processOperation (operations[i]);
        }
    }
    else
    {
        processOperation (desiredOperation);
    }
}

//------------------------------------------------------------------------------


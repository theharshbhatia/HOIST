/*

<javascriptresource>
<name>Test Adjustment Layers...</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Adjustment Layers.js
// Version: 4.0
// Release Date: 2014-02-12
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
//@include "jamLayers.jsxinc"
//@include "jamHelpers.jsxinc"

//------------------------------------------------------------------------------

// Current folder used to locate the test image and preset files:
// .blw, .cha, .acv, .eap, .ahu, .alv, .asv
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

var adjustments =
{
    "Black and White":
    {
        "minVersion": 10    // CS3
    },
    "Brightness/Contrast":
    {
        "minVersion": 6 // "Use Legacy" parameter only from CS3...
    },
    "Channel Mixer":
    {
        "minVersion": 6
    },
    "Color Balance":
    {
        "minVersion": 6
    },
    "Curves":
    {
        "minVersion": 6
    },
    "Exposure":
    {
        "minVersion": 9 // CS2
    },
    "Gradient Map":
    {
        "minVersion": 6
    },
    "Hue/Saturation":
    {
        "minVersion": 6
    },
    "Invert":
    {
        "minVersion": 6
    },
    "Levels":
    {
        "minVersion": 6
    },
    "Photo Filter":
    {
        "minVersion": 8 // CS
    },
    "Posterize":
    {
        "minVersion": 6
    },
    "Selective Color":
    {
        "minVersion": 6
    },
    "Threshold":
    {
        "minVersion": 6
    },
    "Vibrance":
    {
        "minVersion": 11    // CS4
    }
};
var desiredAdjustment = null;
var allAdjustments = "*All*";
var reverseAllDocs = false;

//------------------------------------------------------------------------------

function getParameters ()
{
    var dialogWidth = 225;
    var dialogHeight = 300; // Dynamically adjusted anyway
    var dialogPadding = [ 15, 15 ];
    var panelPadding = [ 15, 15 ];
    var buttonWidth = 80;
    var buttonHeight = 20;
    var buttonGap = 5;
    var extraGap = (appVersion > 8) ? 0 : 12;
    var dlg = new Window ('dialog', "Test Adjustment Layers", [ 0, 0, dialogWidth, dialogHeight ]);
    dlg.btnPnl = dlg.add ('panel', [ dialogPadding[0], dialogPadding[1], dialogWidth - dialogPadding[0], dialogHeight - dialogPadding[1] ], 'Adjustment Layer');
    dlg.btnPnl.horizBtn = [ ];
    var y = panelPadding[1] + extraGap;
    for (var k in adjustments)
    {
        if (adjustments.hasOwnProperty (k))
        {
            dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], k));
            y += buttonHeight + buttonGap;
        }
    }
    dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], allAdjustments));
    y += buttonHeight + buttonGap;
    var count = dlg.btnPnl.horizBtn.length;
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        radbut.enabled = (radbut.text === allAdjustments) || (appVersion >= adjustments[radbut.text]["minVersion"]);
        radbut.value = false;
        radbut.onClick = function () { desiredAdjustment = this.text; };
    }
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        if (radbut.enabled)
        {
            radbut.value = true;
            desiredAdjustment = radbut.text;
            break;
        }
    }
    dlg.btnPnl.bounds.bottom = dlg.btnPnl.bounds.top + y + panelPadding[1];
    dlg.bounds.bottom = dlg.bounds.top + dialogPadding[1] + (dlg.btnPnl.bounds.bottom - dlg.btnPnl.bounds.top) + dialogPadding[1] + buttonHeight + dialogPadding[1];
    dlg.cancelBtn = dlg.add ('button', [ dialogPadding[0], dlg.bounds.bottom - dialogPadding[1] - buttonHeight, dialogPadding[0] + buttonWidth, dlg.bounds.bottom - dialogPadding[1] ], 'Cancel', { name: "cancel" });
    dlg.cancelBtn.onClick = function () { this.parent.close (false); };
    dlg.OKBtn = dlg.add ('button', [ dlg.bounds.right - dialogPadding[0] - buttonWidth, dlg.bounds.bottom - dialogPadding[1] - buttonHeight, dlg.bounds.right - dialogPadding[0], dlg.bounds.bottom - dialogPadding[1] ], 'OK', { name: "ok" });
    dlg.OKBtn.enabled = (desiredAdjustment in adjustments);
    dlg.OKBtn.onClick = function () { this.parent.close (true); };
    dlg.center ();
    return dlg.show ();
}

//------------------------------------------------------------------------------

function blackAndWhiteAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Infrared Preset",
                "type":
                {
                    "blackAndWhite":
                    {
                        "using": "Infrared.blw"
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Black and White",
                "type":
                {
                    "blackAndWhite":
                    {
                        "red": 70,
                        "yellow": 128,
                        "green": 24,
                        "cyan": 0,
                        "blue": -7,
                        "magenta": 65,
                        "useTint": true,
                        "tintColor": { "hue": 40, "saturation": 15, "brightness": 70 }
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function brightnessContrastAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Brightness/Contrast | Soft Light",
                "mode": "softLight",
                "type": 
                {
                    "brightnessContrast": { }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Brightness/Contrast | Use Legacy",
                "type": 
                {
                    "brightnessContrast":
                    {
                        "brightness": 10,
                        "contrast": 20,
                        "useLegacy": true
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Brightness/Contrast | No Use Legacy",
                "type": 
                {
                    "brightnessContrast":
                    {
                        "brightness": 10,
                        "contrast": 20,
                        "useLegacy": false
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function channelMixerAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Color Shift Preset",
                "type": 
                {
                    "channelMixer":
                    {
                        "using": "Color-Shift.cha"
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Channel Mixer Monochrome",
                "type": 
                {
                    "channelMixer":
                    {
                        "monochromatic": true,
                        "gray":
                        { 
                            "red": 66,
                            "green": 33,
                            "blue": 19,
                            "constant": -18
                        }
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function colorBalanceAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Color Balance",
                "type": 
                {
                    "colorBalance":
                    {
                        "shadowLevels": [ 9, 29, 48 ],
                        "midtoneLevels": [ 42, 5, 19 ],
                        "highlightLevels": [ -15, 20, -25 ],
                        "preserveLuminosity": true
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function curvesAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Curves",
                "type": 
                {
                    "curves":
                    {
                        "adjustment":
                        [
                            {
                                "channel": "composite",
                                "curve":
                                [
                                    { "horizontal": 0, "vertical": 0 },
                                    { "horizontal": 77, "vertical": 51 },
                                    { "horizontal": 178, "vertical": 204 },
                                    { "horizontal": 255, "vertical": 255 }
                                ]
                            },
                            {
                                "channel": "red",
                                "mapping":
                                [
                                    120, 121, 121, 122, 122, 123, 124, 124, 125, 126, 126, 127, 128, 128, 129, 130,
                                    131, 131, 132, 133, 134, 135, 136, 136, 137, 138, 139, 140, 141, 142, 143, 143,
                                    144, 145, 146, 147, 148, 148, 149, 150, 151, 151, 152, 153, 154, 154, 155, 155,
                                    156, 157, 157, 158, 158, 159, 160, 160, 161, 162, 162, 163, 164, 164, 165, 165,
                                    166, 166, 167, 167, 167, 168, 168, 169, 169, 170, 171, 172, 172, 173, 173, 173,
                                    174, 175, 176, 177, 178, 179, 180, 180, 181, 182, 183, 183, 183, 184, 185, 185,
                                    186, 186, 186, 183, 182, 180, 177, 175, 171, 168, 163, 162, 160, 158, 156, 153,
                                    152, 149, 147, 144, 143, 140, 138, 135, 133, 130, 127, 124, 121, 117, 116, 114,
                                    112, 109, 105, 103, 101,  99,  97,  94,  93,  90,  87,  83,  81,  76,  74,  74,
                                     75,  76,  77,  78,  79,  80,  81,  82,  82,  83,  84,  85,  86,  87,  88,  90,
                                     91,  92,  93,  94,  95,  96,  96,  97,  98,  99,  99, 100, 101, 102, 103, 104,
                                    104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 114, 115, 115, 116, 116,
                                    117, 117, 118, 119, 119, 118, 116, 112, 111, 109, 107, 106, 103, 101,  99,  97,
                                     94,  91,  90,  87,  85,  83,  80,  77,  76,  74,  72,  71,  69,  66,  65,  63,
                                     60,  58,  56,  53,  52,  50,  49,  47,  45,  44,  41,  39,  37,  34,  31,  30,
                                     28,  26,  23,  22,  20,  17,  15,  15,  14,  12,  11,  10,   8,   8,   7,   6
                                ]
                            },
                            {
                                "channel": "green",
                                "curve":
                                [
                                    { "horizontal": 0, "vertical": 255 },
                                    { "horizontal": 77, "vertical": 51 },
                                    { "horizontal": 178, "vertical": 204 },
                                    { "horizontal": 255, "vertical": 0 }
                                ]
                            },
                            {
                                "channel": "blue",
                                "curve":
                                [
                                    { "horizontal": 0, "vertical": 255 },
                                    { "horizontal": 255, "vertical": 0 }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Light Contrast Preset",
                "type": 
                {
                    "curves":
                    {
                        "using": "Light-Contrast.acv"
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function exposureAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Exposure Preset",
                "type": 
                {
                    "exposure":
                    {
                        "using": "Plus-One.eap"
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Gamma",
                "type": 
                {
                    "exposure":
                    {
                        "gammaCorrection": 0.5
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function gradientMapAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Gradient Map | Darken",
                "mode": "darken",
                "type": 
                {
                    "gradientMapClass":
                    {
                        "reverse": false,
                        "dither": false,
                        "gradient":
                        {
                            "name": "Color Noise",
                            "gradientForm": "colorNoise",
                            "randomSeed": 345807450,
                            "showTransparency": false,
                            "vectorColor": true,
                            "smoothness": 1024,
                            "colorSpace": "RGBColor",
                            "minimum": [ 0, 18, 25, 0 ],
                            "maximum": [ 100, 60, 73, 100 ]
                        }
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Gradient Map | Difference",
                "mode": "difference",
                "type": 
                {
                    "gradientMapClass":
                    {
                        "reverse": true,
                        "dither": false,
                        "gradient":
                        {
                            "name": "Blue, Red, Yellow",
                            "gradientForm": "customStops",
                            "interpolation": 4096,
                            "colors":
                            [
                                {
                                    "location": 0, "midpoint": 50, "type": "userStop",
                                    "color" : { "red": 10, "green": 0, "blue": 178 }
                                },
                                {
                                    "location": 2048, "midpoint": 50, "type": "userStop",
                                    "color" : { "red": 255, "green": 0, "blue": 0 }
                                },
                                {
                                    "location": 4096, "midpoint": 50, "type": "userStop",
                                    "color" : { "red": 255, "green": 252, "blue": 0 }
                                }
                            ]
                        }
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function hueSaturationAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Color Ranges Saturation",
                "type": 
                {
                    "hueSaturation":
                    {
                        "adjustment":
                        [
                            {
                                "localRange": 1,
                                "beginRamp": 315, "beginSustain": 345, "endSustain": 15, "endRamp": 45,
                                "hue": 0, "saturation": 50, "lightness": 0
                            },
                            {
                                "localRange": 3,
                                "beginRamp": 75, "beginSustain": 105, "endSustain": 135, "endRamp": 165,
                                "hue": 0, "saturation": 60, "lightness": 0
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Hue Preset",
                "type": 
                {
                    "hueSaturation":
                    {
                        "using": "Eerie.ahu"
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Direct Hue",
                "type": 
                {
                    "hueSaturation":
                    {
                        "adjustment":
                        [
                            {
                                "hue": 130, "saturation": 0, "lightness": 0
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Cyanotype Colorize",
                "type": 
                {
                    "hueSaturation":
                    {
                        "colorize": true,
                        "adjustment":
                        [
                            {
                                "hue": 210, "saturation": 30, "lightness": 10
                            }
                        ]
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function invertAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Invert | Color",
                "mode": "color",
                "type": 
                {
                    "invert": null
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Invert | Luminosity",
                "mode": "luminosity",
                "type": 
                {
                    "invert": null
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function levelsAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Auto Contrast",
                "type": 
                {
                    "levels":
                    {
                        "adjustment":
                        [
                            {
                                "channel": "composite",
                                "autoContrast": true,
                                "blackClip": 0.1,
                                "whiteClip": 0.1
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Auto Levels / Auto Tone",
                "type": 
                {
                    "levels":
                    {
                        "adjustment":
                        [
                            {
                                "channel": "composite",
                                "auto": true,
                                "blackClip": 0.1,
                                "whiteClip": 0.1
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Auto Color",
                "type": 
                {
                    "levels":
                    {
                        "adjustment":
                        [
                            {
                                "channel": "composite",
                                "autoBlackWhite": true,
                                "autoNeutrals": true,
                                "blackClip": 0.1,
                                "whiteClip": 0.1
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Clip Green Preset",
                "type": 
                {
                    "levels":
                    {
                        "using": "Clip-Green.alv"
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Levels",
                "type": 
                {
                    "levels":
                    {
                        "adjustment":
                        [
                            {
                                "channel": "composite",
                                "input": [ 10, 245 ],
                                "gamma": 0.8,
                                "output": [ 20, 235 ]
                            }
                        ]
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function photoFilterAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Photo Filter",
                "type": 
                {
                    "photoFilter":
                    {
                        "color": { "red": 255, "green": 216, "blue": 0 },
                        "density": 80,
                        "preserveLuminosity": true
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function posterizeAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Posterize | Luminosity",
                "mode": "luminosity",
                "type": 
                {
                    "posterize":
                    {
                        "levels": 3
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function selectiveColorAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Selective Color",
                "type": 
                {
                    "selectiveColor":
                    {
                        "method": "absolute",
                        "colorCorrection":
                        [
                            {
                                "colors": "reds",
                                "cyan": 0, "magenta": 100, "yellowColor": 100, "black": 0
                            },
                            {
                                "colors": "neutrals",
                                "cyan": -20, "magenta": 50, "yellowColor": 20, "black": -8
                            },
                            {
                                "colors": "blacks",
                                "cyan": 100, "magenta": -31, "yellowColor": -67, "black": -40
                            }
                        ]
                    }
                }
            }
        }
    );
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Cooler Red Preset",
                "type": 
                {
                    "selectiveColor":
                    {
                        "using": "Cooler-Red.asv"
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function thresholdAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Threshold | Darken",
                "mode": "darken",
                "type": 
                {
                    "thresholdClassEvent":
                    {
                        "level": 108
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function vibranceAdjustment ()
{
    jamLayers.makeLayer
    (
        {
            "adjustmentLayer":
            {
                "name": "Vibrance",
                "type": 
                {
                    "vibrance":
                    {
                        "vibrance": 100,
                        "saturation": 20
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function processAdjustment (desiredAdjustment)
{
    jamEngine.jsonPlay
    (
        "duplicate",
        {
            "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
            "name": { "<string>": "Test Adjustment Layers | " + desiredAdjustment },
            "merged": { "<boolean>": true }
        }
    );
    switch (desiredAdjustment)
    {
        case "Black and White":
            blackAndWhiteAdjustment ();
            break;
        case "Brightness/Contrast":
            brightnessContrastAdjustment ();
            break;
        case "Channel Mixer":
            channelMixerAdjustment ();
            break;
        case "Color Balance":
            colorBalanceAdjustment ();
            break;
        case "Curves":
            curvesAdjustment ();
            break;
        case "Exposure":
            exposureAdjustment ();
            break;
        case "Gradient Map":
            gradientMapAdjustment ();
            break;
        case "Hue/Saturation":
            hueSaturationAdjustment ();
            break;
        case "Invert":
            invertAdjustment ();
            break;
        case "Levels":
            levelsAdjustment ();
            break;
        case "Photo Filter":
            photoFilterAdjustment ();
            break;
        case "Posterize":
            posterizeAdjustment ();
            break;
        case "Selective Color":
            selectiveColorAdjustment ();
            break;
        case "Threshold":
            thresholdAdjustment ();
            break;
        case "Vibrance":
            vibranceAdjustment ();
            break;
    }
}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);
if (getParameters ())
{
    jamEngine.meaningfulIds = true;
    jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
    if (desiredAdjustment === allAdjustments)
    {
        var resultDescriptorObj = jamEngine.jsonGet ([ { "property": { "<property>": "documentID" } }, { "document": { "<enumerated>": { "ordinal": "first" } } } ]);
        var docId = resultDescriptorObj["documentID"]["<integer>"];
        var docIds = [ ];
        for (var k in adjustments)
        {
            if (adjustments.hasOwnProperty (k))
            {
                if (appVersion >= adjustments[k]["minVersion"])
                {
                    jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "document": { "<identifier>": docId } } ] } });
                    processAdjustment (k);
                    resultDescriptorObj = jamEngine.jsonGet ([ { "property": { "<property>": "documentID" } }, { "document": { "<enumerated>": { "ordinal": "first" } } } ]);
                    docIds.unshift (resultDescriptorObj["documentID"]["<integer>"]);
                }
            }
        }
        if (reverseAllDocs)
        {
            docIds.reverse ();
        }
        for (var i = 0; i < docIds.length; i++)
        {
            jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "document": { "<identifier>": docIds[i] } } ] } });  
        }
    }
    else
    {
        processAdjustment (desiredAdjustment);
    }
}

//------------------------------------------------------------------------------


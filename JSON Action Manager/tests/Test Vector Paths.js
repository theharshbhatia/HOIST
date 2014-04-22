/*

<javascriptresource>
<name>Test Vector Paths...</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Vector Paths.js
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
//@include "jamHelpers.jsxinc"
//@include "jamJSON.jsxinc"
//@include "jamUtils.jsxinc"

//------------------------------------------------------------------------------

// Used to locate the test image, the custom shape and tool preset files, 
// and the vector path json file
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

var operations =
[
    "Fill Shapes",
    "Stroke Path",
    "Vector Mask"
];
var desiredOperation = operations[0];
var allOperations = "*All*";
var reverseAllDocs = true;

//------------------------------------------------------------------------------

var stars =
[
    [
        // pathComponent
        [
            "add",
            [
                // subpath (top star)
                [
                    [
                        // [ anchor ]
                        [ [ 949, 161 ] ],
                        // [ anchor ]
                        [ [ 1099, 161 ] ],
                        // [ anchor ]
                        [ [ 970, 250 ] ],
                        // [ anchor ]
                        [ [ 1024, 108 ] ],
                        // [ anchor ]
                        [ [ 1078, 250 ] ]
                    ],
                    true    // closedSubpath
                ]
            ]
        ],
        // pathComponent
        [
            "add",
            [
                // subpath (left star)
                [
                    [
                        // [ anchor ]
                        [ [ 1743, 750 ] ],
                        // [ anchor ]
                        [ [ 1593, 750 ] ],
                        // [ anchor ]
                        [ [ 1722, 839 ] ],
                        // [ anchor ]
                        [ [ 1668, 697 ] ],
                        // [ anchor ]
                        [ [ 1614, 839 ] ]
                    ],
                    true    // closedSubpath
                ],
                // subpath (right star)
                [
                    [
                        // [ anchor ]
                        [ [ 2048 - 1743, 750 ] ],
                        // [ anchor ]
                        [ [ 2048 - 1593, 750 ] ],
                        // [ anchor ]
                        [ [ 2048 - 1722, 839 ] ],
                        // [ anchor ]
                        [ [ 2048 - 1668, 697 ] ],
                        // [ anchor ]
                        [ [ 2048 - 1614, 839 ] ]
                    ],
                    true    // closedSubpath
                ]
            ],
            true    // windingFill
        ]
    ],
    "pixelsUnit"
];

//------------------------------------------------------------------------------

var smiley =
[
    [
        // pathComponent
        [
            "add",
            [
                // subpath (face contour)
                [
                    [
                        // [ anchor, forward, backward ]
                        [ [ 1026, 426 ], [ 1227, 290 ], [ 825, 290 ] ],
                        // [ anchor, forward, backward, smooth ]
                        [ [ 1390, 690 ], [ 1390, 891 ], [ 1390, 489 ], true ],
                        // [ anchor, forward, backward, smooth ]
                        [ [ 1026, 1054 ], [ 825, 1054 ], [ 1227, 1054 ], true ],
                        // [ anchor, forward, backward, smooth ]
                        [ [ 662, 690 ], [ 662, 489 ], [ 662, 892 ], true ]
                    ],
                    true    // closedSubpath
                ]
            ]
        ],
        // pathComponent
        [
            "subtract",
            [
                // subpath (left eye)
                [
                    [
                        // [ anchor ]
                        [ [ 844, 640 ] ],
                        // [ anchor ]
                        [ [ 894, 690 ] ],
                        // [ anchor ]
                        [ [ 844, 740 ] ],
                        // [ anchor ]
                        [ [ 794, 690 ] ]
                    ],
                    true    // closedSubpath
                ],
                // subpath (right eye)
                [
                    [
                        // [ anchor ]
                        [ [ 1208, 640 ] ],
                        // [ anchor ]
                        [ [ 1258, 690 ] ],
                        // [ anchor ]
                        [ [ 1208, 740 ] ],
                        // [ anchor ]
                        [ [ 1158, 690 ] ]
                    ],
                    true    // closedSubpath
                ],
                // subpath (mouth)
                [
                    [
                        // [ anchor, forward, backward ]
                        [ [ 1230, 852 ], [ 1181, 911 ], [ 1230, 852 ] ],
                        // [ anchor, forward, backward, smooth ]
                        [ [ 1026, 948 ], [ 944, 948 ], [ 1108, 948 ], true ],
                        // [ anchor, forward, backward ]
                        [ [ 823, 852 ], [ 823, 852 ], [ 871, 911 ] ]
                    ]
                ]
            ]
        ]
    ],
    "pixelsUnit"
];

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
    var dlg = new Window ('dialog', "Test Vector Paths", [ 0, 0, dialogWidth, dialogHeight ]);
    dlg.btnPnl = dlg.add ('panel', [ dialogPadding[0], dialogPadding[1], dialogWidth - dialogPadding[0], dialogHeight - dialogPadding[1] ], 'Path Operation');
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
        "duplicate",
        {
            "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
            "name": { "<string>": "Test Vector Paths | " + desiredOperation },
            "merged": { "<boolean>": true }
        }
    );
    switch (desiredOperation)
    {
        case "Fill Shapes":
            jamEngine.jsonPlay
            (
                "make",
                {
                    "target": { "<reference>": [ { "layer": { "<class>": null } } ] },
                    "using": { "<object>": { "layer": { "mode": { "<enumerated>": { "blendMode": "color" } } } } }
                }
            );
            jamEngine.jsonPlay
            (
                "set",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "to": jamHelpers.toPathComponentList (stars)
                }
            );
            jamEngine.jsonPlay
            (
                "addTo",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "to": jamHelpers.toRectangleObject ([ [ 660, 326, 1388, 1054, 100 ], "pixelsUnit" ])
                }
            );
            jamEngine.jsonPlay
            (
                "subtractFrom",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "to": jamHelpers.toEllipseObject ([ [ 660, 326, 1388, 1054 ], "pixelsUnit" ])
                }
            );
            var shapeName = "Logo X-Aqua in Apple Garamond Light";
            var shapePresetPath = "Logo-X-Aqua.csh";
            jamUtils.loadPreset ("customShape", shapeName, shapePresetPath);
            jamEngine.jsonPlay
            (
                "addTo",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "to": jamHelpers.toCustomShapeObject ([ [ shapeName, 860, 526, 1188, 854 ], "pixelsUnit" ])
                }
            );
            jamEngine.jsonPlay
            (
                "fill",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "wholePath": { "<boolean>": true },
                    "using": { "<enumerated>": { "fillContents": "color" } },
                    "color": jamHelpers.toColorObject ([ "RGBColor", [ 255, 0, 255 ] ]),    // Magenta
                    "opacity": { "<unitDouble>": { "percentUnit": 100 } },
                    "mode": { "<enumerated>": { "blendMode": "normal" } },
                    "radius": { "<unitDouble>": { "pixelsUnit": 0.0 } },
                    "antiAlias": { "<boolean>": true }
                }
            );
            break;
        case "Stroke Path":
            jamEngine.jsonPlay
            (
                "make",
                {
                    "target": { "<reference>": [ { "layer": { "<class>": null } } ] }
                }
            );
            jamEngine.jsonPlay
            (
                "set",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "to": jamHelpers.toPathComponentList (smiley)
                }
            );
            jamEngine.jsonPlay
            (
                "transform",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "freeTransformCenterState": { "<enumerated>": { "quadCenterState": "QCSAverage" } },
                    "offset": jamHelpers.toOffsetObject ([ [ -40, -200 ], "pixelsUnit" ])
                }
            );
            // The two following steps should not be necessary, but...
            jamEngine.jsonPlay
            (
                "select",
                {
                    "target": { "<reference>": [ { "paintbrushTool": { "<class>": null } } ] }
                }
            );
            jamEngine.jsonPlay
            (
                "reset",
                {
                    "target":
                    {
                        "<reference>":
                        [
                            { "property": { "<property>": "currentToolOptions" } },
                            { "application": { "<enumerated>": { "ordinal": "targetEnum" } } }
                        ]
                    }
                }
            );
            jamUtils.loadPreset ("toolPreset", "Brush Tool Soft Round 35 Red", "Brush-35-Red.tpl");
            jamEngine.jsonPlay
            (
                "select",
                {
                    "target": { "<reference>": [ { "toolPreset": { "<name>": "Brush Tool Soft Round 35 Red" } } ] }
                }
            );
            jamEngine.jsonPlay  // Occasional error on next stroke otherwise...
            (
                "select",
                {
                    "target": { "<reference>": [ { "eyedropperTool": { "<class>": null } } ] },
                    "dontRecord": { "<boolean>": true },
                    "forceNotify": { "<boolean>": true }
                }
            );
            jamEngine.jsonPlay
            (
                "stroke",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "using": { "<class>": "paintbrushTool" },
                    "pressure": { "<boolean>": true }
                }
            );
            break;
        case "Vector Mask":
            jamEngine.jsonPlay
            (
                "set",
                {
                    "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
                    "to": jamHelpers.toPathComponentList (jamUtils.readJsonFile ("Factory-Vector-Mask.json"))
                }
            );
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
                                "type": { "<object>": { "brightnessContrast": { "brightness": { "<integer>": -67 } } } }
                            }
                        }
                    }
                }
            );
            break;
    }
    jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "backgroundLayer": { "<property>": "background" } } ] } });
    jamEngine.jsonPlay ("delete", { "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] } });
}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);
if (getParameters ())
{
    jamEngine.meaningfulIds = true;
    jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
    if (desiredOperation === allOperations)
    {
        var resultDescriptorObj = jamEngine.jsonGet ([ { "property": { "<property>": "documentID" } }, { "document": { "<enumerated>": { "ordinal": "first" } } } ]);
        var docId = resultDescriptorObj["documentID"]["<integer>"];
        var docIds = [ ];
        for (var i = 0; i < operations.length; i++)
        {
            jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "document": { "<identifier>": docId } } ] } });
            processOperation (operations[i]);
            resultDescriptorObj = jamEngine.jsonGet ([ { "property": { "<property>": "documentID" } }, { "document": { "<enumerated>": { "ordinal": "first" } } } ]);
            docIds.unshift (resultDescriptorObj["documentID"]["<integer>"]);
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
        processOperation (desiredOperation);
    }
}

//------------------------------------------------------------------------------


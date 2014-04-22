/*

<javascriptresource>
<name>Test Transform...</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Transform.js
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

//------------------------------------------------------------------------------

// Used to locate the test image
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

var operations =
{
    "Custom Warp":
    {
        "minVersion": 9 // CS2
    },
    "Fisheye Warp":
    {
        "minVersion": 9 // CS2
    },
    "Content-Aware Scale":
    {
        "minVersion": 11    // CS4
    }
};
var desiredOperation = null;
var allOperations = "*All*";
var reverseAllDocs = true;

//------------------------------------------------------------------------------

function getParameters ()
{
    var dialogWidth = 220;
    var dialogHeight = 300; // Dynamically adjusted anyway
    var dialogPadding = [ 15, 15 ];
    var panelPadding = [ 15, 15 ];
    var buttonWidth = 80;
    var buttonHeight = 20;
    var buttonGap = 5;
    var extraGap = (appVersion > 8) ? 0 : 12;
    var dlg = new Window ('dialog', "Test Transform", [ 0, 0, dialogWidth, dialogHeight ]);
    dlg.btnPnl = dlg.add ('panel', [ dialogPadding[0], dialogPadding[1], dialogWidth - dialogPadding[0], dialogHeight - dialogPadding[1] ], 'Transform Operation');
    dlg.btnPnl.horizBtn = [ ];
    var y = panelPadding[1] + extraGap;
    for (var k in operations)
    {
        if (operations.hasOwnProperty (k))
        {
            dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], k));
            y += buttonHeight + buttonGap;
        }
    }
    dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], allOperations));
    y += buttonHeight + buttonGap;
    var count = dlg.btnPnl.horizBtn.length;
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        radbut.enabled = (radbut.text === allOperations) || (appVersion >= operations[radbut.text]["minVersion"]);
        radbut.value = false;
        radbut.onClick = function () { desiredOperation = this.text; };
    }
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        if (radbut.enabled)
        {
            radbut.value = true;
            desiredOperation = radbut.text;
            break;
        }
    }
    dlg.btnPnl.horizBtn[count - 1].enabled = (desiredOperation in operations);
    dlg.btnPnl.bounds.bottom = dlg.btnPnl.bounds.top + y + panelPadding[1];
    dlg.bounds.bottom = dlg.bounds.top + dialogPadding[1] + (dlg.btnPnl.bounds.bottom - dlg.btnPnl.bounds.top) + dialogPadding[1] + buttonHeight + dialogPadding[1];
    dlg.cancelBtn = dlg.add ('button', [ dialogPadding[0], dlg.bounds.bottom - dialogPadding[1] - buttonHeight, dialogPadding[0] + buttonWidth, dlg.bounds.bottom - dialogPadding[1] ], 'Cancel', { name: "cancel" });
    dlg.cancelBtn.onClick = function () { this.parent.close (false); };
    dlg.OKBtn = dlg.add ('button', [ dlg.bounds.right - dialogPadding[0] - buttonWidth, dlg.bounds.bottom - dialogPadding[1] - buttonHeight, dlg.bounds.right - dialogPadding[0], dlg.bounds.bottom - dialogPadding[1] ], 'OK', { name: "ok" });
    dlg.OKBtn.enabled = (desiredOperation in operations);
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
            "name": { "<string>": "Test Transform | " + desiredOperation },
            "merged": { "<boolean>": true }
        }
    );
    var doc = app.activeDocument;
    var isOpaque = doc.artLayers[0].isBackgroundLayer;
    if (isOpaque)
    {
        // New layer from background
        jamEngine.jsonPlay
        (
            "set",
            {
                "target": { "<reference>": [ { "layer": { "<property>": "background" } } ] },
                "to": { "<object>": { "layer": { "name": { "<string>": "Transform" } } } }
            }
        );
    }
    switch (desiredOperation)
    {
        case "Custom Warp":
            var bounds = [ [ 0, 0, 100, 100 ], "percentUnit" ];
            var meshPoints =
            [
                [
                    [ 0, 0 ], [ 50, 0 ], [ 50, 0 ], [ 100, 0 ],
                    [ 0, 50 ], [ 100 / 3, 100 / 3 ], [ 100 - (100 / 3), 100 / 3 ], [ 100, 50 ],
                    [ 0, 50 ], [ 100 / 3, 100 - (100 / 3) ], [ 100 - (100 / 3), 100 - (100 / 3) ], [ 100, 50 ],
                    [ 0, 100 ], [ 50, 100 ], [ 50, 100 ], [ 100, 100 ]
                ],
                "percentUnit"
            ];
            jamEngine.jsonPlay
            (
                "transform",
                {
                    "target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
                    "freeTransformCenterState": { "<enumerated>": { "quadCenterState": "QCSAverage" } },
                    "warp":
                    {
                        "<object>":
                        {
                            "warp":
                            {
                                "warpStyle": { "<enumerated>": { "warpStyle": "warpCustom" } },
                                "bounds": jamHelpers.toRectangleObject (bounds),
                                "uOrder": { "<integer>": 4 },
                                "vOrder": { "<integer>": 4 },
                                "customEnvelopeWarp":
                                {
                                    "<object>":
                                    {
                                        "customEnvelopeWarp":
                                        {
                                            "meshPoints": jamHelpers.toRationalPointList (meshPoints)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            );
            break;
        case "Fisheye Warp":
            jamEngine.jsonPlay
            (
                "transform",
                {
                    "target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
                    "freeTransformCenterState": { "<enumerated>": { "quadCenterState": "QCSAverage" } },
                    "warp":
                    {
                        "<object>":
                        {
                            "warp":
                            {
                                "warpStyle": { "<enumerated>": { "warpStyle": "warpFisheye" } },
                                "warpValue": { "<double>": -25 }
                            }
                        }
                    }
                }
            );
            break;
        case "Content-Aware Scale":
            jamEngine.jsonPlay
            (
                "transform",
                {
                    "target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
                    "freeTransformCenterState": { "<enumerated>": { "quadCenterState": "QCSAverage" } },
                    "width": { "<unitDouble>": { "percentUnit": 75 } },
                    "contentAware": { "<boolean>": true },
                    "skinTone": { "<boolean>": false },
                    "amount": { "<double>": 90 }
                }
            );
/*
            jamEngine.jsonPlay
            (
                "trim",
                {
                    "trimBasedOn": { "<enumerated>": { "trimBasedOn": "transparency" } },
                    "top": { "<boolean>": false },
                    "left": { "<boolean>": true },
                    "bottom": { "<boolean>": false },
                    "right": { "<boolean>": true }
                }
            );
            jamEngine.jsonPlay
            (
                "3caa3434-cb67-11d1-bc43-0060b0a13dc4", // Fit Image
                {
                    "width": { "<unitDouble>": { "pixelsUnit": 1024 } },
                    "height": { "<unitDouble>": { "pixelsUnit": 1024 } }
                }
            );
*/
            break;
    }
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
        for (var k in operations)
        {
            if (operations.hasOwnProperty (k))
            {
                if (appVersion >= operations[k]["minVersion"])
                {
                    jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "document": { "<identifier>": docId } } ] } });
                    processOperation (k);
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
        processOperation (desiredOperation);
    }
}

//------------------------------------------------------------------------------


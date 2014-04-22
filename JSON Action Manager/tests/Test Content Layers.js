/*

<javascriptresource>
<name>Test Content Layers...</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Content Layers.js
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
//@include "jamLayers.jsxinc"
//@include "jamUtils.jsxinc"

//------------------------------------------------------------------------------

// Used to locate the test image and the patterns file
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

var contents =
[
    "Gradient",
    "Pattern",
    "Solid Color"
];
var desiredContent = contents[0];
var allContents = "*All*";
var reverseAllDocs = false;

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
    var dlg = new Window ('dialog', "Test Content Layers", [ 0, 0, dialogWidth, dialogHeight ]);
    dlg.btnPnl = dlg.add ('panel', [ dialogPadding[0], dialogPadding[1], dialogWidth - dialogPadding[0], dialogHeight - dialogPadding[1] ], 'Content Layer');
    dlg.btnPnl.horizBtn = [ ];
    var y = panelPadding[1] + extraGap;
    var count = contents.length;
    for (var i = 0; i < count; i++)
    {
        dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], contents[i]));
        y += buttonHeight + buttonGap;
    }
    dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], allContents));
    y += buttonHeight + buttonGap;
    var count = dlg.btnPnl.horizBtn.length;
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        radbut.value = (radbut.text === desiredContent);
        radbut.onClick = function () { desiredContent = this.text; };
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

function gradientContent ()
{
    jamLayers.makeLayer
    (
        {
            "contentLayer":
            {
                "name": "Gradient | Hardlight",
                "mode": "hardLight",
                "type":
                {
                    "gradientLayer":
                    {
                        "type": "radial",
                        "angle": 90,
                        "scale": 150,
                        "offset": { "horizontal": 0, "vertical": -25 },
                        "reverse": true,
                        "dither": false,
                        "gradient":
                        {
                            "name": "Solid Pink to Half-Transparent Yellow",
                            "gradientForm": "customStops",
                            "interpolation": 4096,
                            "colors":
                            [
                                {
                                    "location": 0, "midpoint": 50, "type": "userStop",
                                    "color": { "red": 255, "green": 0, "blue": 255 }
                                },
                                {
                                    "location": 4096, "midpoint": 50, "type": "userStop",
                                    "color": { "red": 255, "green": 255, "blue": 0 }
                                }
                            ],
                            "transparency":
                            [
                                { "location": 0, "midpoint": 50, "opacity": 100 },
                                { "location": 4096, "midpoint": 50, "opacity": 50 }
                            ]
                        }
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function patternContent ()
{
    jamUtils.loadPreset ("pattern", "Square pattern 10 cm centered RGB (half)", "Square-Pattern-10.pat");
    jamLayers.makeLayer
    (
        {
            "contentLayer":
            {
                "name": "Pattern | Screen",
                "mode": "screen",
                "type":
                {
                    "patternLayer":
                    {
                        "scale": 100,
                        "phase": { "horizontal": 23, "vertical": 17 },
                        "pattern":
                        {
                            "name": "Square pattern 10 cm centered RGB (half)",
                            "ID": "bf01312b-32d1-11da-adc1-900252bc0c9a"
                        }
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function solidColorContent ()
{
    jamLayers.makeLayer
    (
        {
            "contentLayer":
            {
                "name": "Solid Color | Hue",
                "mode": "hue",
                "type":
                {
                    "solidColorLayer":
                    {
                        "color": { "hue": 180, "saturation": 100, "brightness": 100 }
                    }
                }
            }
        }
    );
}

//------------------------------------------------------------------------------

function processContent (desiredContent)
{
    jamEngine.jsonPlay
    (
        "duplicate",
        {
            "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
            "name": { "<string>": "Test Content Layers | " + desiredContent },
            "merged": { "<boolean>": true }
        }
    );
    switch (desiredContent)
    {
        case "Gradient":
            gradientContent ();
            break;
        case "Pattern":
            patternContent ();
            break;
        case "Solid Color":
            solidColorContent ();
            break;
    }
}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);
if (getParameters ())
{
    jamEngine.meaningfulIds = true;
    jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
    if (desiredContent === allContents)
    {
        var resultDescriptorObj = jamEngine.jsonGet ([ { "property": { "<property>": "documentID" } }, { "document": { "<enumerated>": { "ordinal": "first" } } } ]);
        var docId = resultDescriptorObj["documentID"]["<integer>"];
        var docIds = [ ];
        for (var i = 0; i < contents.length; i++)
        {
            jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "document": { "<identifier>": docId } } ] } });
            processContent (contents[i]);
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
        processContent (desiredContent);
    }
}

//------------------------------------------------------------------------------


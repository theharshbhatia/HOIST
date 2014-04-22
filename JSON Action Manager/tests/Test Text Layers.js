/*

<javascriptresource>
<name>Test Text Layers...</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Text Layers.js
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
//@include "jamText.jsxinc"
//@include "jamUtils.jsxinc"

//------------------------------------------------------------------------------

// Used to locate the test image
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

var texts =
[
    "Point Type",
    "Paragraph Type",
    "Type Along a Path",
    "Type Inside a Path"
];
var desiredText = texts[0];
var allTexts = "*All*";
var reverseAllDocs = true;

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
    var dlg = new Window ('dialog', "Test Text Layers", [ 0, 0, dialogWidth, dialogHeight ]);
    dlg.btnPnl = dlg.add ('panel', [ dialogPadding[0], dialogPadding[1], dialogWidth - dialogPadding[0], dialogHeight - dialogPadding[1] ], 'Text Layer');
    dlg.btnPnl.horizBtn = [ ];
    var y = panelPadding[1] + extraGap;
    var count = texts.length;
    for (var i = 0; i < count; i++)
    {
        dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], texts[i]));
        y += buttonHeight + buttonGap;
    }
    dlg.btnPnl.horizBtn.push (dlg.btnPnl.add ('radiobutton', [ panelPadding[0], y, (dlg.btnPnl.bounds.right - dlg.btnPnl.bounds.left) - panelPadding[0], y + buttonHeight ], allTexts));
    y += buttonHeight + buttonGap;
    var count = dlg.btnPnl.horizBtn.length;
    for (var i = 0; i < count; i++)
    {
        var radbut = dlg.btnPnl.horizBtn[i];
        radbut.value = (radbut.text === desiredText);
        radbut.onClick = function () { desiredText = this.text; };
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

var circlePath =
{
    "pathComponents":
    [
        {
            "shapeOperation": "add",
            "subpathListKey":
            [
                {
                    "closedSubpath": true,
                    "points":
                    [
                        {
                            "anchor": { "horizontal": 1026, "vertical": 326 },
                            "forward": { "horizontal": 1227, "vertical": 326 },
                            "backward": { "horizontal": 825, "vertical": 326 },
                            "smooth": true
                        },
                        {
                            "anchor": { "horizontal": 1390, "vertical": 690 },
                            "forward": { "horizontal": 1390, "vertical": 891 },
                            "backward": { "horizontal": 1390, "vertical": 489 },
                            "smooth": true
                        },
                        {
                            "anchor": { "horizontal": 1026, "vertical": 1054 },
                            "forward": { "horizontal": 825, "vertical": 1054 },
                            "backward": { "horizontal": 1227, "vertical": 1054 },
                            "smooth": true
                        },
                        {
                            "anchor": { "horizontal": 662, "vertical": 690 },
                            "forward": { "horizontal": 662, "vertical": 489 },
                            "backward": { "horizontal": 662, "vertical": 892 },
                            "smooth": true
                        }
                    ]
                }
            ]
        }
    ],
    "unit": "pixelsUnit"
};

//------------------------------------------------------------------------------

function processText (desiredText)
{
    jamEngine.jsonPlay
    (
        "duplicate",
        {
            "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
            "name": { "<string>": "Test Text Layers | " + desiredText },
            "merged": { "<boolean>": true }
        }
    );
    switch (desiredText)
    {
        case "Point Type":
            var pointText = "Once upon a time...";
            jamText.setLayerText
            (
                {
                    "layerText":
                    {
                        "textKey": pointText,
                        "warp":
                        {
                            "warpStyle": "warpRise",
                            "warpValue": 33.3333
                        },
                        "textClickPoint": { "horizontal": 30, "vertical": 45 },
                        "antiAlias": "antiAliasSmooth",
                        "textShape":
                        [
                            {
                                "textType": "point",
                                "orientation": "horizontal"
                            }
                        ],
                        "textStyleRange":
                        [
                            {
                                "from": 0,
                                "to": 5,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Minion-Italic",
                                    "size": 144,
                                    "color": { "red": 204, "green": 0, "blue": 0 }
                                }
                            },
                            {
                                "from": 5,
                                "to": 10,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Minion-Regular",
                                    "size": 96,
                                    "color": { "red": 255, "green": 255, "blue": 51 }
                                }
                            },
                            {
                                "from": 10,
                                "to": 11,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Myriad-BoldItalic",
                                    "size": 96,
                                    "color": { "red": 51, "green": 255, "blue": 255 },
                                    "underline": "underlineOnLeftInVertical"
                                }
                            },
                            {
                                "from": 11,
                                "to": pointText.length,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Minion-Regular",
                                    "size": 96,
                                    "color": { "red": 51, "green": 255, "blue": 255 }
                                }
                            }
                        ],
                        "paragraphStyleRange":
                        [
                            {
                                "from": 0,
                                "to": pointText.length,
                                "paragraphStyle":
                                {
                                    "alignment": "left"
                                }
                            }
                        ]
                    },
                    "typeUnit": "pointsUnit"
                }
            );
            break;
        case "Paragraph Type":
            var paragraphText =
            "Le petit Chaperon rouge\r" +
            "Il était une fois une petite fille de village, la plus jolie qu’on eût su voir\u00A0: sa mère en était folle, " +
            "et sa mère-grand plus folle encore. Cette bonne femme lui fit faire un petit chaperon rouge, " +
            "qui lui seyait si bien, que partout on l’appelait le petit Chaperon rouge.";
            var nextParagraphIndex = paragraphText.indexOf ("\r") + 1;
            jamText.setLayerText
            (
                {
                    "layerText":
                    {
                        "textKey": paragraphText,
                        "textClickPoint": { "horizontal": 30, "vertical": 30 },
                        "antiAlias": "antiAliasCrisp",
                        "textShape":
                        [
                            {
                                "textType": "box",
                                "transform": { "xx": 1, "xy": 0, "yx": 0, "yy": 1, "tx": 0, "ty": 0 },
                                "orientation": "horizontal",
                                "bounds": { "left": 0, "top": 0, "right": 840, "bottom": 840 }
                            }
                        ],
                        "textStyleRange":
                        [
                            {
                                "from": 0,
                                "to": nextParagraphIndex,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Minion-BoldItalic",
                                    "size": 72,
                                    "color": { "red": 255, "green": 255, "blue": 255 },
                                    "autoLeading": false,
                                    "leading": 60,
                                    "autoKern": "opticalKern",
                                    "fontCaps": "smallCaps",
                                    "textLanguage": "standardFrenchLanguage"
                                }
                            },
                            {
                                "from": nextParagraphIndex,
                                "to": paragraphText.length,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Minion-Bold",
                                    "size": 48,
                                    "color": { "red": 255, "green": 255, "blue": 255 },
                                    "autoLeading": false,
                                    "leading": 52,
                                    "autoKern": "metricsKern",
                                    "textLanguage": "standardFrenchLanguage"
                                }
                            }
                        ],
                        "paragraphStyleRange":
                        [
                            {
                                "from": 0,
                                "to": nextParagraphIndex,
                                "paragraphStyle":
                                {
                                    "alignment": "center",
                                    "spaceAfter": 40
                                }
                            },
                            {
                                "from": nextParagraphIndex,
                                "to": paragraphText.length,
                                "paragraphStyle":
                                {
                                    "alignment": "justifyLeft",
                                    "firstLineIndent": 40
                                }
                            }
                        ]
                    },
                    "typeUnit": "pointsUnit"
                }
            );
            break;
        case "Type Along a Path":
            var alongText = "No Man's Land";
            jamText.setLayerText
            (
                {
                    "layerText":
                    {
                        "textKey": alongText,
                        "textClickPoint": { "horizontal": 30.371075, "vertical": 21.224 },
                        "antiAlias": "antiAliasCrisp",
                        "textShape":
                        [
                            {
                                "textType": "onACurve",
                                "path": circlePath,
                                "tRange": { "start": -1.5, "end": 1.5 },
                                "transform":
                                {
                                    "xx": 1,
                                    "xy": 0,
                                    "yx": 0,
                                    "yy": 1,
                                    "tx": -662,
                                    "ty": -326
                                },
                                "pathTypeEffect": "rainbowEffect",
                                "pathTypeAlignment": "baselineAlignment",
                                "pathTypeAlignTo": "toPathTop",
                                "pathTypeSpacing": 0
                            }
                        ],
                        "textStyleRange":
                        [
                            {
                                "from": 0,
                                "to": alongText.length,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Minion-Bold",
                                    "size": 144,
                                    "color": { "red": 255, "green": 0, "blue": 255 }
                                }
                            }
                        ],
                        "paragraphStyleRange":
                        [
                            {
                                "from": 0,
                                "to": alongText.length,
                                "paragraphStyle":
                                {
                                    "alignment": "center"
                                }
                            }
                        ]
                    },
                    "typeUnit": "pointsUnit"
                }
            );
            break;
        case "Type Inside a Path":
            var insideText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam vehicula est ornare ullamcorper. Donec eleifend pellentesque egestas. In ante lorem, accumsan nec venenatis eu, auctor pharetra purus. Pellentesque varius posuere eros, id lobortis lectus aliquet vitae. Phasellus elementum, sem egestas congue fringilla, sapien sem gravida metus, eu ullamcorper urna tellus non ante. Integer iaculis velit eget enim pharetra accumsan. Aenean et magna vehicula mauris tincidunt dignissim in vel elit. Vestibulum faucibus pharetra nibh, molestie vehicula ipsum ultricies vel. In vehicula auctor nisl venenatis auctor. In magna velit, viverra a molestie sit amet, interdum in velit. In fringilla posuere diam, ut fermentum dolor mollis in. Sed gravida metus nec sapien mattis imperdiet. Suspendisse potenti. Morbi posuere adipiscing pretium. Aenean varius rhoncus dolor ac congue. Vivamus tortor libero, pharetra sed rutrum sit amet, ultricies non lorem. In tempus pretium blandit. Integer feugiat aliquam orci eu rhoncus. Nunc commodo bibendum commodo. Nullam tellus risus, sodales sed imperdiet eu, semper ut sapien. Curabitur sodales viverra tempus. Curabitur dapibus mi leo, id pellentesque diam. Nullam lacinia arcu sit amet erat fringilla facilisis. Mauris at tristique nulla. Morbi mi purus, facilisis vitae rutrum sodales, eleifend sit amet purus. Phasellus egestas ligula sit amet nisi semper commodo. Vivamus tristique accumsan turpis. Donec quis malesuada tortor. Nam at risus et turpis lacinia pellentesque. Cras viverra bibendum diam sed viverra. Duis posuere consectetur quam ut eleifend. Aliquam a libero non quam interdum tristique scelerisque ut velit. Nunc id orci sed dolor accumsan dapibus. Vivamus sed orci diam, et tincidunt felis. Mauris faucibus leo vitae massa mattis ac dapibus quam accumsan. Nunc fermentum dui ut metus tincidunt eu imperdiet risus auctor. Proin mi libero, vulputate eget lacinia vel, lacinia ullamcorper erat. Morbi nulla justo, sodales eget interdum sit amet, aliquet vitae lectus. Maecenas vel accumsan odio."
            jamText.setLayerText
            (
                {
                    "layerText":
                    {
                        "textKey": insideText,
                        "textClickPoint": { "horizontal": 30, "vertical": 30 },
                        "textGridding": "round",
                        "antiAlias": "antiAliasCrisp",
                        "textShape":
                        [
                            {
                                "textType": "box",
                                "path": circlePath,
                                "transform":
                                {
                                    "xx": 1,
                                    "xy": 0,
                                    "yx": 0,
                                    "yy": 1,
                                    "tx": -652,
                                    "ty": -336
                                },
                                "bounds":
                                {
                                    "top": 326,
                                    "left": 662,
                                    "bottom": 1054,
                                    "right": 1390
                                }
                            }
                        ],
                        "textStyleRange":
                        [
                            {
                                "from": 0,
                                "to": insideText.length,
                                "textStyle":
                                {
                                    "fontPostScriptName": "Myriad-BoldItalic",
                                    "size": 20,
                                    "color": { "red": 255, "green": 255, "blue": 255 },
                                    "autoKern": "opticalKern",
                                    "textLanguage": "italianLanguage"
                                }
                            }
                        ],
                        "paragraphStyleRange":
                        [
                            {
                                "from": 0,
                                "to": insideText.length,
                                "paragraphStyle":
                                {
                                    "alignment": "justifyCenter",
                                }
                            }
                        ]
                    },
                    "typeUnit": "pointsUnit"
                }
            );
            break;
    }
    jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "layer": { "<property>": "background" } } ] } });
    jamEngine.jsonPlay ("wait", { "state": { "<enumerated>": { "state": "redrawComplete" } } });
}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);
if (getParameters ())
{
    jamEngine.meaningfulIds = true;
    jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
    if (desiredText === allTexts)
    {
        var resultDescriptorObj = jamEngine.jsonGet ([ { "property": { "<property>": "documentID" } }, { "document": { "<enumerated>": { "ordinal": "first" } } } ]);
        var docId = resultDescriptorObj["documentID"]["<integer>"];
        var docIds = [ ];
        for (var i = 0; i < texts.length; i++)
        {
            jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "document": { "<identifier>": docId } } ] } });
            processText (texts[i]);
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
        processText (desiredText);
    }
}

//------------------------------------------------------------------------------


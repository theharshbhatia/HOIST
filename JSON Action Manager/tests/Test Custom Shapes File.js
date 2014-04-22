/*

<javascriptresource>
<name>Test Custom Shapes File</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Custom Shapes File.js
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
//@include "jamShapes.jsxinc"
//@include "jamUtils.jsxinc"

//------------------------------------------------------------------------------

// Used to locate the test image and the custom shapes file
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------

function drawShape (customShape, bounds, constrainProportions)
{
    jamShapes.debugMode = false;
    pathComponents = jamShapes.pathComponentsFromCustomShape (customShape, "add", bounds, constrainProportions);
    jamEngine.jsonPlay
    (
        "set",
        {
            "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
            "to": jamHelpers.toPathComponentList (pathComponents)
        }
    );
    jamEngine.jsonPlay
    (
        "fill",
        {
            "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
            "wholePath": { "<boolean>": true },
            "using": { "<enumerated>": { "fillContents": "color" } },
            "color": jamHelpers.nameToColorObject ("W3C", "Fuchsia"),
            "opacity": { "<unitDouble>": { "percentUnit": 100 } },
            "mode": { "<enumerated>": { "blendMode": "normal" } },
            "radius": { "<unitDouble>": { "pixelsUnit": 0.0 } },
            "antiAlias": { "<boolean>": true }
        }
    );
    //
    jamShapes.debugMode = true;
    pathComponents = jamShapes.pathComponentsFromCustomShape (customShape, "add", bounds, constrainProportions);
    jamEngine.jsonPlay
    (
        "set",
        {
            "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] },
            "to": jamHelpers.toPathComponentList (pathComponents)
        }
    );
    jamEngine.jsonPlay
    (
        "set",
        {
            "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
            "to": { "<reference>": [ { "path": { "<property>": "workPath" } } ] }
        }
    );
    jamEngine.jsonPlay
    (
        "stroke",
        {
            "width": { "<integer>": 2 },
            "location": { "<enumerated>": { "strokeLocation": "center" } },
            "opacity": { "<unitDouble>": { "percentUnit": 100 } },
            "mode": { "<enumerated>": { "blendMode": "normal" } },
            "color": jamHelpers.nameToColorObject ("W3C", "Red")
        }
    );
    jamEngine.jsonPlay
    (
        "set",
        {
            "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
            "to": { "<enumerated>": { "ordinal": "none" } }
        }
    );
    //
    jamEngine.jsonPlay ("delete", { "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] } });
}

//------------------------------------------------------------------------------

var customShapesFilePath = "Logo-X-Aqua.csh";
var fileData = jamShapes.dataFromCustomShapesFile (customShapesFilePath);
if (typeof fileData === 'string')
{
    alert (fileData + "\n" + "Custom shapes file: “" + customShapesFilePath + "”");
}
else
{
    var bounds;
    var pathComponents;
    jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
    jamEngine.jsonPlay
    (
        "duplicate",
        {
            "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
            "name": { "<string>": "Test Custom Shapes File" },
            "merged": { "<boolean>": true }
        }
    );
    var customShape = fileData["customShapes"][0];
    drawShape (customShape, [ [ 0 + 128, 0 + 128, 1024 - 128, 1536 - 128 ], "pixelsUnit" ]);
    drawShape (customShape, [ [ 1024 + 128, 0 + 128, 2048 - 128, 1536 - 128 ], "pixelsUnit" ], true);
}

//------------------------------------------------------------------------------


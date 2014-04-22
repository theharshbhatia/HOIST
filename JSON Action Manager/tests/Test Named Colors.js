/*

<javascriptresource>
<name>Test Named Colors</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Named Colors.js
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

var setName = "W3C";    // "CSS", "SVG", "W3C" or "X11"
var excludeVariants = true;
var reverseOrder = true;
var horizontalUnit = 512;
var verticalUnit = 6;

//------------------------------------------------------------------------------

function drawColorRectangle (rectangle, color)
{
    jamEngine.jsonPlay
    (
        "set",
        {
            "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
            "to": jamHelpers.toRectangleObject (rectangle),
        }
    );
    jamEngine.jsonPlay
    (
        "fill",
        {
            "using": { "<enumerated>": { "fillContents": "color" } },
            "color": jamHelpers.nameToColorObject (setName, color)
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
}

//------------------------------------------------------------------------------

var names = jamHelpers.enumerateNamedColors (setName, excludeVariants);
if (reverseOrder)
{
    names.reverse ();
}

var rows = names.length;

var width = horizontalUnit;
var height = rows * verticalUnit;
var resolution = 72;

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
                    "name": { "<string>": "Test Named Colors - " + setName },
                    "mode": { "<class>": "RGBColorMode" },
                    "width": { "<unitDouble>": { "distanceUnit": jamUtils.toDistanceUnit (width, resolution) } },
                    "height": { "<unitDouble>": { "distanceUnit": jamUtils.toDistanceUnit (height, resolution) } },
                    "resolution": { "<unitDouble>": { "densityUnit": resolution } },
                    "depth": { "<integer>": 8 },
                    "fill": { "<enumerated>": { "fill": "transparent" } },
                    "profile": { "<string>": "sRGB IEC61966-2.1" }
                }
            }
        }
    }
);

drawColorRectangle ([ [ 0, 0, width, height ], "pixelsUnit" ], "Unknown Color Name -> Fallback Color");

jamEngine.jsonPlay ("wait", { "state": { "<enumerated>": { "state": "redrawComplete" } } });

for (var row = 0; row < rows; row++)
{
    drawColorRectangle ([ [ 0, row * verticalUnit, horizontalUnit, (row + 1) * verticalUnit ], "pixelsUnit" ], names[row]);
}

//------------------------------------------------------------------------------


/*

<javascriptresource>
<name>Test Colors</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Colors.js
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

var colors =
[
    [ "bookColor", [ "PANTONE® solid coated", "PANTONE 265 C" ] ],
    [ "CMYKColorClass", [ 17, 92, 0, 0 ] ],
    [ "grayscale", [ 50 ] ],
    [ "HSBColorClass", [ 0, 50, 100 ] ],
    [ "labColor", [ 90, -10, 80 ] ],
    [ "RGBColor", [ 0, 128, 128 ] ]
];

var unit = 150;
var rows = 2;
var columns = 3;

var width = columns * unit;
var height = rows * unit;
var resolution = 72;

//------------------------------------------------------------------------------

function drawColorRectangle (color, rectangle)
{
    jamEngine.jsonPlay
    (
        "make",
        {
            "target": { "<reference>": [ { "layer": { "<class>": null } } ] },
            "using": { "<object>": { "layer": { "name": { "<string>": jamJSON.stringify (color) } } } }
        }
    );
    jamEngine.jsonPlay
    (
        "set",
        {
            "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
            "to": jamHelpers.toRectangleObject ([ rectangle, "pixelsUnit" ]),
        }
    );
    jamEngine.jsonPlay
    (
        "fill",
        {
            "using": { "<enumerated>": { "fillContents": "color" } },
            "color": jamHelpers.toColorObject (color)
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
                    "name": { "<string>": "Test Colors" },
                    "mode": { "<class>": "RGBColorMode" },
                    "width": { "<unitDouble>": { "distanceUnit": jamUtils.toDistanceUnit (width, resolution) } },
                    "height": { "<unitDouble>": { "distanceUnit": jamUtils.toDistanceUnit (height, resolution) } },
                    "resolution": { "<unitDouble>": { "densityUnit": resolution } },
                    "depth": { "<integer>": 8 },
                    "fill": { "<enumerated>": { "fill": "white" } },
                    "profile": { "<string>": "sRGB IEC61966-2.1" }
                }
            }
        }
    }
);
var colorIndex = 0;
for (var row = 0; row < rows; row++)
{
    for (var column = 0; column < columns; column++)
    {
        drawColorRectangle (colors[colorIndex++], [ column * unit, row * unit, (column + 1) * unit, (row + 1) * unit ])
    }
}

//------------------------------------------------------------------------------


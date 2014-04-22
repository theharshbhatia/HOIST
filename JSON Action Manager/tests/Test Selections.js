/*

<javascriptresource>
<name>Test Selections</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Selections.js
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

// Used to locate the test image and the selection polygon points json file
Folder.current = new Folder ("~/JSON Action Manager/tests/resources/");

//------------------------------------------------------------------------------------------------

jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
jamEngine.jsonPlay
(
    "duplicate",
    {
        "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
        "name": { "<string>": "Test Selections" },
        "merged": { "<boolean>": true }
    }
);
jamEngine.jsonPlay
(
    "make",
    {
        "target": { "<reference>": [ { "layer": { "<class>": null } } ] },
        "using": { "<object>": { "layer": { "mode": { "<enumerated>": { "blendMode": "vividLight" } } } } }
    }
);
var star = [ [ [ 12.5, 41 ], [ 87.5, 41 ], [ 23, 85.5 ], [ 50, 14.5 ], [ 77, 85.5 ] ], "percentUnit" ];
jamEngine.jsonPlay
(
    "set",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<object>": { "polygon": { "points": jamHelpers.toPointList (star) } } },
        "antiAlias": { "<boolean>": true }
    }
);
jamEngine.jsonPlay
(
    "intersectWith",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": jamHelpers.toEllipseObject ([ [ 400, 300, 2048 - 400, 1536 - 300 ], "pixelsUnit" ]),
        "antiAlias": { "<boolean>": true }
    }
);
jamEngine.jsonPlay
(
    "addTo",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": jamHelpers.toRectangleObject ([ [ 300, 832, 2048 - 300, 1536 - 632 ], "pixelsUnit" ])
    }
);
jamEngine.jsonPlay
(
    "subtractFrom",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<object>": { "polygon": { "points": jamHelpers.toPointList (jamUtils.readJsonFile ("Thingy-Selection-Points.json")) } } },
        "antiAlias": { "<boolean>": true }
    }
);
jamEngine.jsonPlay
(
    "addTo",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<object>": { "singleRow": { "top": { "<unitDouble>": { "pixelsUnit": 150 } } } } }
    }
);
jamEngine.jsonPlay
(
    "addTo",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<object>": { "singleRow": { "top": { "<unitDouble>": { "pixelsUnit": 1536 - 150 } } } } }
    }
);
jamEngine.jsonPlay
(
    "addTo",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<object>": { "singleColumn": { "left": { "<unitDouble>": { "pixelsUnit": 200 } } } } }
    }
);
jamEngine.jsonPlay
(
    "addTo",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<object>": { "singleColumn": { "left": { "<unitDouble>": { "pixelsUnit": 2048 - 200 } } } } }
    }
);
jamEngine.jsonPlay
(
    "fill",
    {
        "using": { "<enumerated>": { "fillContents": "color" } },
        "color": jamHelpers.toColorObject ([ "CMYKColorClass", [ 0, 100, 100, 0 ] ])
    }
);
jamEngine.jsonPlay  // Deselect
(
    "set",
    {
        "target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
        "to": { "<enumerated>": { "ordinal": "none" } }
    }
);

//------------------------------------------------------------------------------------------------


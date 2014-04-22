/*

<javascriptresource>
<name>Test Lighting Effects</name>
<category>JSON Action Manager Tests</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Test Lighting Effects.js
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

jamEngine.jsonPlay ("open", { "target": { "<path>": "Factory.jpg" } });
jamEngine.jsonPlay
(
    "duplicate",
    {
        "target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
        "name": { "<string>": "Test Lighting Effects" },
        "merged": { "<boolean>": true }
    }
);
jamEngine.jsonPlay
(
    "lightingEffects",
    {
        "lightSource":
        {
            "<list>":
            [
                {
                    "<object>":
                    {
                        "lightSource":
                        {
                            "color": jamHelpers.toColorObject ([ "RGBColor", [ 255, 255, 0 ] ]),    // Yellow
                            "on": { "<boolean>": true },
                            "lightType": { "<enumerated>": { "lightType": "lightSpot" } },
                            "intensity": { "<integer>": 35 },
                            "focus": { "<integer>": 69 },
                            "position": jamHelpers.toPointObject ([ [ 0, 50 ] ]),
                            "vector0": jamHelpers.toPointObject ([ [ 84, 92 ] ]),
                            "vector1": jamHelpers.toPointObject ([ [ 28, 68 ] ]),
                            "radius": { "<double>": 15 }
                        }
                    }
                },
                {
                    "<object>":
                    {
                        "lightSource":
                        {
                            "color": jamHelpers.toColorObject ([ "RGBColor", [ 255, 0, 0 ] ]),  // Red
                            "on": { "<boolean>": true },
                            "lightType": { "<enumerated>": { "lightType": "lightSpot" } },
                            "intensity": { "<integer>": 35 },
                            "focus": { "<integer>": 69 },
                            "position": jamHelpers.toPointObject ([ [ 50, 50 ] ]),
                            "vector0": jamHelpers.toPointObject ([ [ 84, 92 ] ]),
                            "vector1": jamHelpers.toPointObject ([ [ 28, 68 ] ]),
                            "radius": { "<double>": 15 }
                        }
                    }
                },
                {
                    "<object>":
                    {
                        "lightSource":
                        {
                            "color": jamHelpers.toColorObject ([ "RGBColor", [ 0, 0, 255 ] ]),  // Blue
                            "on": { "<boolean>": true },
                            "lightType": { "<enumerated>": { "lightType": "lightSpot" } },
                            "intensity": { "<integer>": 35 },
                            "focus": { "<integer>": 69 },
                            "position": jamHelpers.toPointObject ([ [ 100, 50 ] ]),
                            "vector0": jamHelpers.toPointObject ([ [ 60, 10 ] ]),
                            "vector1": jamHelpers.toPointObject ([ [ 10, 30 ] ]),
                            "radius": { "<double>": 20 }
                        }
                    }
                }
            ]
        },
        "currentLight": { "<integer>": 3 },
        "gloss": { "<integer>": 0 },
        "material": { "<integer>": 69 },
        "exposure": { "<integer>": 0 },
        "ambientBrightness": { "<integer>": 10 },
        "ambientColor": jamHelpers.toColorObject ([ "RGBColor", [ 255, 255, 255 ] ]),   // White
        "frameWidth": { "<double>": 100 },
        "bumpChannel": { "<reference>": [ { "channel": { "<enumerated>": { "channel": "red" } } } ] },
        "whiteIsHigh": { "<boolean>": false },
        "bumpAmplitude": { "<integer>": 20 }
    }
);

//------------------------------------------------------------------------------


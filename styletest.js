///@includepath "~/JSON Action Manager/"
//@include "JSON Action Manager/jamEngine.jsxinc"
//@include "JSON Action Manager/jamActions.jsxinc"
//@include "JSON Action Manager/jamHelpers.jsxinc"
//@include "JSON Action Manager/jamJSON.jsxinc"
//@include "JSON Action Manager/jamLayers.jsxinc"
//@include "JSON Action Manager/jamShapes.jsxinc"
//@include "JSON Action Manager/jamStyles.jsxinc"
//@include "JSON Action Manager/jamText.jsxinc"
//@include "JSON Action Manager/jamUtils.jsxinc"

var layerStyleObj = jamStyles.getLayerStyle ();
if (layerStyleObj)
{
    if ("layerEffects" in layerStyleObj)
    {
        var layerEffectsObj = layerStyleObj["layerEffects"];
        if ("dropShadow" in layerEffectsObj)
        {
            var dropShadowObj = layerEffectsObj["dropShadow"];
            alert ("Drop shadow distance: " + dropShadowObj["distance"]);
        }
        else
        {
            alert ("No drop shadow");
        }
    }
    else
    {
        alert ("No layer effects");
    }
}
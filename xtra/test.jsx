var data = [];
var dataFile = new File(app.activeDocument.path + '/data.csv');
dataFile.open('r');
dataFile.readln(); // Skip first line
while (!dataFile.eof) {
  var dataFileLine = dataFile.readln();
  var dataFilePieces = dataFileLine.split(',');
  data.push({
    art: dataFilePieces[0],
    tileNumber: dataFilePieces[1],
    tileName: dataFilePieces[2],
    spaces: dataFilePieces[7],
    permanent: dataFilePieces[3] == 'Permanent'
  });
}
dataFile.close();


for (var tileIndex = 0; tileIndex < data.length; tileIndex++) {
  var tileData = data[tileIndex];

  app.activeDocument.artLayers.getByName('Tile number').textItem.contents = tileData.tileNumber;

  app.activeDocument.artLayers.getByName('Tile name').textItem.contents = (tileData.tileName ? tileData.tileName : ' ');

  app.activeDocument.layerSets.getByName(tileData.art).visible = true;
  
  var spaceSet = tileData.spaces + ' Space' + (tileData.spaces == 1 ? '' : 's');
  app.activeDocument.layerSets.getByName(spaceSet).visible = true;
  
  app.activeDocument.artLayers.getByName('Permanent').visible = tileData.permanent;
  
  file = new File(app.activeDocument.path + '/' + tileData.tileNumber + '.png');
  opts = new ExportOptionsSaveForWeb();
  opts.format = SaveDocumentType.PNG;
  opts.PNG8 = false;
  opts.quality = 100;
  app.activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);

  app.activeDocument.layerSets.getByName(tileData.art).visible = false;
  app.activeDocument.layerSets.getByName(spaceSet).visible = false;
}
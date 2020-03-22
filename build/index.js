const { readContentFromFile, writeContentToFile } = require('./fileUtils');
const { extractImportPaths } = require('./parseUtils');
const { getOrderedListOfFiles } = require('./sortUtils');
const { buildToHtml } = require('./build');

buildToHtml();

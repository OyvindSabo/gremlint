const fs = require('fs');

const readContentFromFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const writeContentToFile = (content, filename) => {
  // create folder path if not exists
  filename
    .split('/')
    .slice(0, -1)
    .reduce((last, folder) => {
      let folderPath = last ? last + '/' + folder : folder;
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
      return folderPath;
    });

  fs.writeFileSync(filename, content, 'utf8');
};

module.exports = {
  readContentFromFile,
  writeContentToFile,
};

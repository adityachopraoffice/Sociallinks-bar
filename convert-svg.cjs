const sharp = require('sharp');
const path = require('path');

const inputSvg = path.join(__dirname, 'public', 'favicon.svg');
const outputJpg = path.join(__dirname, 'public', 'logo.jpg');

sharp(inputSvg)
  .resize(1200, 1200)
  .jpeg({ quality: 100 })
  .toFile(outputJpg)
  .then(info => {
    console.log("Successfully created logo.jpg");
    console.log(info);
  })
  .catch(err => {
    console.error("Error generating jpeg:", err);
  });

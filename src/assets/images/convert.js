const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const files = [
  'cheddar.jpg',
  'hot-fire.jpg',
  'lantico-caps.jpg',
  'lantico-caps-gold.jpg',
  'lantico-caps-orange.jpg',
  'lantico-caps-red.jpg',
  'lantico-grains-gold.jpg',
  'sweet-pepper.jpg'
];

async function convertAll() {
  for (const file of files) {
    if (fs.existsSync(file)) {
      const output = path.parse(file).name + '.webp';
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(output);
      console.log(`Converti : ${file} -> ${output}`);
    } else {
      console.log(`Introuvable : ${file}`);
    }
  }
}

convertAll();
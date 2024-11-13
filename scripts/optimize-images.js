// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/optimized-images');

const convertImages = async () => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        const filePath = path.join(inputDir, file);
        const fileName = path.parse(file).name;

        // Convert to WebP
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(path.join(outputDir, `${fileName}.webp`));

        // Convert to AVIF
        await sharp(filePath)
            .avif({ quality: 50 })
            .toFile(path.join(outputDir, `${fileName}.avif`));
    }

    console.log('Image conversion completed.');
};

convertImages().catch(err => {
    console.error('Error converting images:', err);
});

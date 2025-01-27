const { spawn } = require('child_process');
const path = require('path');

const translations = [
    { locale: 'fr_FR' },
    { locale: 'ja_JP' },
    { locale: 'nl' },
    { locale: 'ru_RU' },
    { locale: 'zh_CN' }
];

async function buildTranslation(locale) {
    const baseDir = path.join('nbclassic', 'i18n', locale, 'LC_MESSAGES');
    const poFile = path.join(baseDir, 'nbjs.po');
    const jsonFile = path.join(baseDir, 'nbjs.json');

    return new Promise((resolve, reject) => {
        const process = spawn('po2json', [
            '-p',          // pretty print
            '-F',         // force overwrite
            '-f', 'jed1.x', // format
            '-d', 'nbjs',   // domain
            poFile,
            jsonFile
        ]);

        process.stdout.on('data', (data) => {
            console.log(`${locale}: ${data}`);
        });

        process.stderr.on('data', (data) => {
            console.error(`${locale} error: ${data}`);
        });

        process.on('close', (code) => {
            if (code === 0) {
                console.log(`✓ Built translation for ${locale}`);
                resolve();
            } else {
                reject(new Error(`Failed to build translation for ${locale}`));
            }
        });
    });
}

async function buildAllTranslations() {
    try {
        await Promise.all(translations.map(({ locale }) => buildTranslation(locale)));
        console.log('All translations built successfully!');
    } catch (error) {
        console.error('Error building translations:', error);
        process.exit(1);
    }
}

buildAllTranslations();

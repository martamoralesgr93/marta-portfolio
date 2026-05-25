const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join('c:', 'Users', 'mmora', 'Desktop', 'Marta Morales — Product Designer_files');

function convertToWebp(srcPath, destDir) {
    const src = path.resolve(srcPath);
    const destName = path.basename(src, path.extname(src)) + '.webp';
    const dest = path.join(destDir, destName);
    
    if (fs.existsSync(src)) {
        try {
            console.log(`Converting ${src} to ${dest}...`);
            // Run sharp-cli via npx to convert image
            execSync(`npx -y sharp-cli@latest -i "${src}" -o "${dest}"`, { stdio: 'inherit' });
            // Delete original file
            fs.unlinkSync(src);
            return true;
        } catch (e) {
            console.error(`Error converting ${src}:`, e.message);
            return false;
        }
    } else {
        console.warn(`Warning: ${src} not found.`);
        return false;
    }
}

function createStructure(basePath, folders, withContent = true) {
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }
    
    fs.writeFileSync(path.join(basePath, 'metadata.json'), '{\n  "title": "",\n  "description": ""\n}', 'utf-8');
    fs.writeFileSync(path.join(basePath, 'case-study.md'), '# Case Study\n', 'utf-8');
    
    for (const f of folders) {
        const folderPath = path.join(basePath, f);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        if (withContent) {
            const title = f.split('-').slice(1).join('-').replace(/^\w/, c => c.toUpperCase());
            fs.writeFileSync(path.join(folderPath, 'content.md'), `# ${title || f}\n`, 'utf-8');
        }
    }
}

function main() {
    // --- 1. Offer Component Redesign ---
    const offerPath = path.join(root, 'projects', 'ilunion', 'offer-component-redesign');
    const offerFolders = [
        '01-context', '02-problem', '03-research', '04-hypothesis', 
        '05-design', '06-responsive', '07-results', '08-business-impact'
    ];
    createStructure(offerPath, offerFolders);
    
    // Ensure images folders
    for (const f of offerFolders) {
        const imgPath = path.join(offerPath, f, 'images');
        if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath, { recursive: true });
    }
    
    const oldCompo = path.join(root, 'ILUNION', 'COMPONENTE');
    convertToWebp(path.join(oldCompo, 'auditoria-compo-ilunion-1.png'), path.join(offerPath, '02-problem', 'images'));
    convertToWebp(path.join(oldCompo, 'auditoria-compo-ilunion-2.png'), path.join(offerPath, '02-problem', 'images'));
    convertToWebp(path.join(oldCompo, 'WIREFRAMES', 'wire-home-desk.png'), path.join(offerPath, '05-design', 'images'));
    convertToWebp(path.join(oldCompo, 'WIREFRAMES', 'wire-home-mobile.png'), path.join(offerPath, '05-design', 'images'));
    convertToWebp(path.join(oldCompo, 'Compo-desk.png'), path.join(offerPath, '05-design', 'images'));
    convertToWebp(path.join(oldCompo, 'Compo-mobile.png'), path.join(offerPath, '05-design', 'images'));

    // --- 2. Motor Destino ---
    const motorPath = path.join(root, 'projects', 'ilunion', 'cro-optimization', 'motor-destino');
    createStructure(motorPath, offerFolders, true);
    
    // Ensure images folders
    for (const f of offerFolders) {
        const imgPath = path.join(motorPath, f, 'images');
        if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath, { recursive: true });
    }
    
    const oldMotor = path.join(root, 'ILUNION', 'CRO', 'MOTOR-DESTINO');
    convertToWebp(path.join(oldMotor, 'antes-desk-motor.png'), path.join(motorPath, '02-problem', 'images'));
    convertToWebp(path.join(oldMotor, 'antes-exp-motor-movil.png'), path.join(motorPath, '02-problem', 'images'));
    convertToWebp(path.join(oldMotor, 'compo-result-desk.png'), path.join(motorPath, '05-design', 'images'));
    convertToWebp(path.join(oldMotor, 'compo-result-mobile.png'), path.join(motorPath, '05-design', 'images'));

    // Clean up
    if (fs.existsSync(oldCompo)) {
        fs.rmSync(oldCompo, { recursive: true, force: true });
        console.log(`Removed ${oldCompo}`);
    }
    if (fs.existsSync(oldMotor)) {
        fs.rmSync(oldMotor, { recursive: true, force: true });
        console.log(`Removed ${oldMotor}`);
    }
    
    console.log("Migration finished successfully.");
}

main();

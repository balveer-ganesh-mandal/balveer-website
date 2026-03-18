const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let files = [];
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            files = files.concat(walkDir(dirPath));
        } else if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx')) {
            files.push(dirPath);
        }
    });
    return files;
}

const files = walkDir(path.join(__dirname, 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace fallback localhost to ensure it has /api
    content = content.replace(/'http:\/\/localhost:5000'/g, "'http://localhost:5001/api'");
    content = content.replace(/'http:\/\/localhost:5001'/g, "'http://localhost:5001/api'");
    content = content.replace(/'http:\/\/localhost:5001\/api'/g, "'http://localhost:5001/api'"); // in case it ran multiple times

    // Fix committee/page.js explicitly replacing ${API_URL}/api/ with ${API_URL}/
    content = content.replace(/\$\{API_URL\}\/api\//g, '${API_URL}/');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
});
console.log('Done!');

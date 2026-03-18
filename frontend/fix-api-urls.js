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
files.push(path.join(__dirname, '.env.local'));
files.push(path.join(__dirname, '.env'));

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Remove /api from fallback URLs in JS files and env files
    content = content.replace(/'http:\/\/localhost:5001\/api'/g, "'http://localhost:5001'");
    content = content.replace(/NEXT_PUBLIC_API_URL=.*\/api/g, "NEXT_PUBLIC_API_URL=http://localhost:5001");

    // 2. Add /api/ to fetch paths automatically
    const endpoints = ['auth', 'donations', 'core-committee', 'events', 'gallery', 'sub-committee', 'live-status'];
    endpoints.forEach(ep => {
        // Find `${API_URL}/endpoint` and replace with `${API_URL}/api/endpoint`
        let regex = new RegExp(`\\$\\{API_URL\\}\\/${ep}`, 'g');
        content = content.replace(regex, `\${API_URL}/api/${ep}`);
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
});
console.log('Done rewriting URLs!');

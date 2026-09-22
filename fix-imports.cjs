const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('next/image')) {
    content = content.replace(/import Image from ['"]next\/image['"];?\n?/g, '');
    content = content.replace(/<Image/g, '<img');
    changed = true;
  }

  if (content.includes('next/link')) {
    content = content.replace(/import Link from ['"]next\/link['"];?\n?/g, 'import { Link } from "react-router-dom";\n');
    content = content.replace(/<Link/g, '<Link'); // Keep as Link for react-router-dom
    content = content.replace(/href=/g, 'to='); // Next.js uses href, react-router uses to
    changed = true;
  }

  if (content.includes('next/navigation')) {
    content = content.replace(/import \{ usePathname \} from ['"]next\/navigation['"];?\n?/g, 'import { useLocation } from "react-router-dom";\n');
    content = content.replace(/usePathname\(\)/g, 'useLocation().pathname');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src/components');
walkDir('./src/pages');

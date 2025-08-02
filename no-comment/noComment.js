const fs = require('fs');
const path = require('path');
function removeComments(content, fileExtension) {
  switch (fileExtension.toLowerCase()) {
    case '.js':
    case '.ts':
    case '.jsx':
    case '.tsx':
    case '.c':
    case '.cpp':
    case '.h':
    case '.hpp':
    case '.java':
    case '.cs':
      return removeJSStyleComments(content);
    case '.py':
      return removePythonComments(content);
    case '.html':
    case '.xml':
      return removeHTMLComments(content);
    case '.css':
    case '.scss':
    case '.less':
      return removeCSSComments(content);
    case '.sh':
    case '.bash':
    case '.zsh':
      return removeShellComments(content);
    default:
      console.log(`Unsupported file type: ${fileExtension}`);
      return content;
  }
}
function removeJSStyleComments(content) {
  let result = '';
  let i = 0;
  while (i < content.length) {
    const char = content[i];
    const nextChar = content[i + 1] || '';
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      result += char;
      i++;
      while (i < content.length) {
        const c = content[i];
        result += c;
        if (c === '\\' && i + 1 < content.length) {
          i++;
          if (i < content.length) {
            result += content[i];
          }
        } else if (c === quote) {
          break;
        }
        i++;
      }
    }
    else if (char === '/' && nextChar === '*') {
      i += 2;
      let commentContent = '';
      while (i < content.length - 1) {
        if (content[i] === '*' && content[i + 1] === '/') {
          i += 2;
          break;
        }
        const c = content[i];
        if (c === '\n') {
          commentContent += '\n';
        }
        i++;
      }
      result += commentContent.replace(/[^\n]/g, '');
      continue;
    }
    else if (char === '/' && nextChar === '/') {
      while (i < content.length && content[i] !== '\n') {
        i++;
      }
      continue;
    }
    else if (char === '/' && isRegexContext(content, i)) {
      result += char;
      i++;
      while (i < content.length) {
        const c = content[i];
        result += c;
        if (c === '\\' && i + 1 < content.length) {
          i++;
          if (i < content.length) {
            result += content[i];
          }
        } else if (c === '/') {
          break;
        }
        i++;
      }
    }
    else {
      result += char;
    }
    i++;
  }
  return result.split('\n').map(line => {
    const trimmed = line.trimEnd();
    return trimmed.length === 0 ? null : trimmed;
  }).filter(line => line !== null).join('\n');
}
function isRegexContext(content, slashIndex) {
  let i = slashIndex - 1;
  while (i >= 0 && /\s/.test(content[i])) {
    i--;
  }
  if (i < 0) return true;
  const prevChar = content[i];
  const regexPrecedingChars = [
    '=', '(', '[', ',', ';', ':', '!', '&', '|', '?', '+', '{', '}', '\n'
  ];
  if (regexPrecedingChars.includes(prevChar)) {
    return true;
  }
  const precedingText = content.slice(Math.max(0, i - 10), i + 1);
  const regexKeywords = ['return', 'match', 'replace', 'test', 'search', 'split'];
  return regexKeywords.some(keyword =>
    new RegExp(keyword + '\\s*$').test(precedingText)
  );
}
function removePythonComments(content) {
  const lines = content.split('\n');
  const cleanedLines = lines.map(line => {
    let inString = false;
    let stringChar = null;
    let result = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!inString && (char === '"' || char === "'")) {
        if (line.slice(i, i + 3) === char.repeat(3)) {
          result += line.slice(i, i + 3);
          i += 2;
          inString = true;
          stringChar = char.repeat(3);
          continue;
        } else {
          inString = true;
          stringChar = char;
          result += char;
        }
      } else if (inString && line.slice(i, i + stringChar.length) === stringChar && line[i - 1] !== '\\') {
        inString = false;
        result += stringChar;
        i += stringChar.length - 1;
        stringChar = null;
      } else if (!inString && char === '#') {
        break;
      } else {
        result += char;
      }
    }
    const trimmed = result.trimEnd();
    return trimmed.trim().length === 0 ? null : trimmed;
  }).filter(line => line !== null);
  return cleanedLines.join('\n');
}
function removeHTMLComments(content) {
  const lines = content.split('\n');
  const cleanedLines = lines.map(line => {
    let cleaned = line.replace(/<!--[\s\S]*?-->/g, '');
    return cleaned.trim().length === 0 ? null : cleaned;
  }).filter(line => line !== null);
  return cleanedLines.join('\n');
}
function removeCSSComments(content) {
  const lines = content.split('\n');
  const cleanedLines = lines.map(line => {
    let cleaned = line.replace(/\/\*[\s\S]*?\*\//g, '');
    return cleaned.trim().length === 0 ? null : cleaned;
  }).filter(line => line !== null);
  return cleanedLines.join('\n');
}
function removeShellComments(content) {
  const lines = content.split('\n');
  const cleanedLines = lines.map(line => {
    const hashIndex = line.indexOf('#');
    if (hashIndex !== -1) {
      const beforeHash = line.substring(0, hashIndex);
      const singleQuotes = (beforeHash.match(/'/g) || []).length;
      const doubleQuotes = (beforeHash.match(/"/g) || []).length;
      if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
        const trimmed = line.substring(0, hashIndex).trimEnd();
        return trimmed.trim().length === 0 ? null : trimmed;
      }
    }
    return line;
  }).filter(line => line !== null);
  return cleanedLines.join('\n');
}
function cleanEmptyLines(content) {
  return content
    .split('\n')
    .filter(line => line.trim().length > 0)
    .join('\n');
}
function main() {
  const filePath = process.argv[2];
  const useCompactMode = process.argv.includes('--compact');
  if (!filePath || filePath === '--help' || filePath === '-h') {
    console.log("NoComment - Remove comments from code files");
    console.log("");
    console.log("Usage: nc <file-path> [options]");
    console.log("");
    console.log("Options:");
    console.log("  --compact    Remove ALL empty lines (very compact output)");
    console.log("  --help, -h   Show this help message");
    console.log("");
    console.log("Supported file types:");
    console.log("  JavaScript/TypeScript: .js, .ts, .jsx, .tsx");
    console.log("  C/C++/Java/C#: .c, .cpp, .h, .java, .cs");
    console.log("  Python: .py (preserves docstrings)");
    console.log("  HTML/XML: .html, .xml");
    console.log("  CSS/SCSS: .css, .scss, .less");
    console.log("  Shell: .sh, .bash, .zsh");
    console.log("");
    console.log("Examples:");
    console.log("  nc file.js           # Remove comments from JavaScript");
    console.log("  nc script.py         # Remove comments from Python");
    console.log("  nc styles.css        # Remove comments from CSS");
    console.log("  nc file.js --compact # Remove comments + empty lines");
    if (!filePath) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const extension = path.extname(filePath);
    let cleaned = removeComments(content, extension);
    if (useCompactMode) {
      cleaned = cleaned
        .split('\n')
        .filter(line => line.trim().length > 0)
        .join('\n');
    }
    fs.writeFileSync(filePath, cleaned, 'utf-8');
    console.log(`Comments removed from ${filePath}`);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}
main();
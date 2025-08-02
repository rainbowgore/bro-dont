const fs = require('fs');

function removeEmojis(text) {
  const emojiPattern = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2B00}-\u{2BFF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]|[\u{FE0F}]|[\u{FE0E}]/gu;
  return text.replace(emojiPattern, "");
}

const filePath = process.argv[2];

if (!filePath) {
  console.error("Please provide a file path");
  process.exit(1);
}

try {
  const contents = fs.readFileSync(filePath, 'utf-8');
  const cleaned = removeEmojis(contents);
  fs.writeFileSync(filePath, cleaned, 'utf-8');
  console.log(`Emojis removed from ${filePath}`);
} catch (error) {
  console.error("Error:", error);
}

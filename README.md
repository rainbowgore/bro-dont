# The Bro, Don't Tool Suite 🧹

██████╗ ██████╗ ██████╗ ██████╗ ██████╗ ███╗ ██╗████████╗
██╔══██╗██╔══██╗██╔═══██╗ ██╔══██╗██╔═══██╗████╗ ██║╚══██╔══╝
██████╔╝██████╔╝██║ ██║ ██║ ██║██║ ██║██╔██╗ ██║ ██║  
██╔══██╗██╔══██╗██║ ██║ ██║ ██║██║ ██║██║╚██╗██║ ██║  
██████╔╝██║ ██║╚██████╔╝ ██████╔╝╚██████╔╝██║ ╚████║ ██║  
╚═════╝ ╚═╝ ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚═╝ ╚═══╝ ╚═╝

A brutally simple set of zero-dependency tools to clean up LLM pollution and restore sanity to your code. Because you literally begged GPT “Bro, don’t…”—and it did anyway.

## Quick Start

```bash
# 1. Clone the repo
git clone git@github.com:rainbowgore/bro-dont.git
cd bro-dont

# 2. Run setup (adds aliases to bash)
./setup.sh

# 3. Reload bash OR open new bash terminal
source ~/.bashrc

# 4. Use the tools!
nocm file.js     # Removes comments
bye file.js      # Removes emojis
```

**Manual Setup (if setup.sh doesn't work):**

```bash
alias nocm="node /path/to/bro-dont/no-comment/noComment.js"
alias bye="node /path/to/bro-dont/bye-emoji/byeEmoji.js"
```

> **Note**: This tool suite is designed for **bash** users. The setup script configures bash aliases in `.bashrc` and `.bash_profile`.

## The Problem

Modern Large Language Models have developed some irritating habits that pollute our code:

### 1. Emoji Spam (a wild grumpy emoji appears)

LLMs inject emojis everywhere, turning professional code into emoji-fest:

```javascript
// Before cleaning
console.log("Success! {woohoo} Everything works perfectly!");
```

### 2. Comment Overdose (an emoji to emphasize my point would appear here)

LLMs love to over-comment everything, stating the obvious:

```javascript
// This function calculates the sum
function add(a, b) {
  // Take parameter a and parameter b
  const result = a + b; // Add them together
  return result; // Return the sum
} // End of function
```

**The traditional solution?** Ask the LLM to "clean this up" - but that costs you tokens, time, and sometimes changes your code.

**Our solution?** Local, instant, free tools that fix LLM pollution without burning tokens.

## The Solution

The **Bro Don't Suite** provides two specialized tools:

### (warning sign emoj, of course) ByeEmoji - Emoji Removal Tool

Instantly removes all emojis from any text file:

```javascript
// Before: console.log("Success! {all the confetti in the world} Everything works! ");
// After:  console.log("Success!  Everything works! ");
```

### NoComment - Comment Removal Tool

Removes excessive comments while preserving code structure:

```javascript
// Before: Over-commented LLM code
function add(a, b) {
  // Take parameter a and parameter b
  const result = a + b; // Add them together
  return result; // Return the sum
}

// After: Clean, professional code
function add(a, b) {
  const result = a + b;
  return result;
}
```

## Tool Capabilities

### ByeEmoji - Universal Emoji Removal

- **File Support**: Any text file (`.js`, `.py`, `.md`, `.txt`, `.css`, etc.)
- **Emoji Coverage**: Faces, symbols, objects, food, animals, travel, flags, and more
- **Smart Processing**: Preserves code structure while removing emoji pollution
- **Speed**: Process files instantly, no matter the size

### NoComment - Smart Comment Removal

| Language                  | Extensions                         | Comment Types    | Notes                        |
| ------------------------- | ---------------------------------- | ---------------- | ---------------------------- |
| **JavaScript/TypeScript** | `.js`, `.ts`, `.jsx`, `.tsx`       | `//` and `/* */` |                              |
| **C/C++/Java/C#**         | `.c`, `.cpp`, `.h`, `.java`, `.cs` | `//` and `/* */` |                              |
| **Python**                | `.py`                              | `#`              | Preserves `"""docstrings"""` |
| **HTML/XML**              | `.html`, `.xml`                    | `<!-- -->`       |                              |
| **CSS/SCSS**              | `.css`, `.scss`, `.less`           | `/* */`          |                              |
| **Shell**                 | `.sh`, `.bash`, `.zsh`             | `#`              |                              |

## Manual Installation

### ByeEmoji (Direct Usage)

No installation needed - works immediately:

```bash
# From anywhere
node /path/to/bro-dont/bye-emoji/byeEmoji.js file.txt

# Or create an alias
alias bye='node /path/to/bro-dont/bye-emoji/byeEmoji.js'
```

### NoComment (Manual Setup)

If the setup script doesn't work, add this alias to your `.bashrc`:

```bash
alias nocm='node /path/to/bro-dont/no-comment/noComment.js'
```

**Direct Usage (without aliases):**

```bash
# From the no-comment directory
node noComment.js path/to/your/file.js

# From anywhere (using full path)
node /path/to/bro-dont/no-comment/noComment.js path/to/your/file.js
```

## Why Use the Bro Don't suite?

### Cost Savings

- **Traditional approach**: Ask your LLM to "clean this code" — burn tokens on every file, over and over.
- **Bro, Don't**: Runs locally. Costs nothing. Feels correct.

**Example: Cleaning 50 AI-generated files**

- **LLM method**: $5–25 in API charges just to remove glitter and commentary
- **Bro, Don't**: $0.00 — save your Claude tokens for the actual hard problems

Because honestly? You shouldn’t be paying a language model to delete emojis it added in the first place - you're feeding the monster, bro.

### ⚡ Speed

- **Traditional**: API calls + waiting → 5-15 seconds per file
- **Bro Don't**: Local execution → <1 second per file

### Privacy

- **Traditional**: Send your code to LLM APIs (security risk)
- **Bro Don't**: Everything stays on your machine

### Reliability

- **Traditional**: LLM might accidentally change your logic
- **Bro Don't**: Only remove pollution, code logic stays identical

### Professional Quality

- **Traditional**: Inconsistent cleanup, might miss edge cases
- **Bro Don't**: Comprehensive, consistent results every time

## Requirements

**System Requirements:**

- **Node.js** (any version with `fs` and `path` modules)
- **No npm dependencies** - both tools use only Node.js built-ins
- **Cross-platform** - works on Windows, macOS, Linux

**File Compatibility:**

- **ByeEmoji**: Any text file format
- **NoComment**: Programming language files (see supported languages table)

## File Safety

**Both tools modify files in-place.** Always backup important files first:

```bash
# Create backups before cleaning
cp important-file.js important-file.js.backup

# Run cleanup
node bye-emoji/byeEmoji.js important-file.js
nc important-file.js

# Or use Git to track changes
git add important-file.js
git commit -m "Before LLM cleanup"
# ... run tools ...
git diff  # Review changes
```

## Technical Details

### ByeEmoji

- **Size**: ~800 bytes
- **Dependencies**: None (uses Node.js `fs` module only), no emotional codependency with GPT or Claude. Promise.
- **Performance**: Processes files instantly
- **Coverage**: Comprehensive Unicode emoji ranges

### NoComment

- **Size**: ~7KB
- **Dependencies**: None (uses Node.js built-ins only)
- **Performance**: Processes files instantly
- **Languages**: 6 programming language families supported

### Combined Suite

- **Total Size**: <10KB for both tools
- **Memory**: Minimal footprint, minimal headache
- **Platform**: Works on any OS with Node.js

**For NoComment:**

- Found a language that isn't supported?
- Comments not being removed correctly?

## License

MIT - Use it, improve it, share it.

**Made with 🖤 (I swear, just this once) for developers who value clean code.**

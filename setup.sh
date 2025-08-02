#!/bin/bash

# Bro, Don't Tool Suite - Quick Setup
# Adds 'nocm' and 'bye' commands to your bash configuration

set -e  # Exit on any error

echo "Setting up Bro, Don't Tool Suite for bash..."

# Get the absolute path to this script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Verify the required JavaScript files exist
NOCM_JS="$SCRIPT_DIR/no-comment/noComment.js"
BYE_JS="$SCRIPT_DIR/bye-emoji/byeEmoji.js"

if [ ! -f "$NOCM_JS" ]; then
    echo "ERROR: noComment.js not found at $NOCM_JS"
    echo "Make sure you're running this from the bro-dont directory"
    exit 1
fi

if [ ! -f "$BYE_JS" ]; then
    echo "ERROR: byeEmoji.js not found at $BYE_JS"
    echo "Make sure you're running this from the bro-dont directory"
    exit 1
fi

NOCM_ALIAS="alias nocm=\"node $NOCM_JS\""
BYE_ALIAS="alias bye=\"node $BYE_JS\""

BASHRC="$HOME/.bashrc"
BASH_PROFILE="$HOME/.bash_profile"

if grep -q "alias nocm=" "$BASHRC" 2>/dev/null; then
    echo "Warning: 'nocm' alias already exists in .bashrc"
    echo "Remove existing alias or manually update if needed"
else
    echo "Adding aliases to bash configuration..."
    
    echo "" >> "$BASHRC"
    echo "# Bro, Don't Tool Suite" >> "$BASHRC"
    echo "$NOCM_ALIAS" >> "$BASHRC"
    echo "$BYE_ALIAS" >> "$BASHRC"
    
    echo "Added aliases to .bashrc"
fi

if [ -f "$BASH_PROFILE" ]; then
    if grep -q "alias nocm=" "$BASH_PROFILE" 2>/dev/null; then
        echo "Note: 'nocm' alias already exists in .bash_profile"
    else
        echo "" >> "$BASH_PROFILE"
        echo "# Bro, Don't Tool Suite" >> "$BASH_PROFILE"
        echo "$NOCM_ALIAS" >> "$BASH_PROFILE"
        echo "$BYE_ALIAS" >> "$BASH_PROFILE"
        echo "Added aliases to .bash_profile"
    fi
fi

echo ""
echo "✓ Setup complete!"
echo ""
echo "To use the tools right now, run:"
echo "   source ~/.bashrc"
echo ""
echo "Or open a new bash terminal and use:"
echo "   nocm file.js     # Remove comments"
echo "   bye file.js      # Remove emojis"
echo ""
echo "Test your setup:"
echo "   echo 'console.log(\"hello\"); // test comment' > test.js"
echo "   nocm test.js && cat test.js"
echo ""
echo "Manual setup (if needed):"
echo "   $NOCM_ALIAS"
echo "   $BYE_ALIAS"
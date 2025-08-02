#!/bin/bash
# Shell script with various comment types

# Script configuration
SCRIPT_NAME="sample.sh"
VERSION="1.0.0"  # Version number

# Function to print messages
print_message() {
    local message="$1"  # Get the message parameter
    echo "[$SCRIPT_NAME]: $message"  # Print with script name prefix
}
# Main execution starts here
main() {
    # Print welcome message
    print_message "Starting script execution"
    
    # Check if user provided arguments
    if [ $# -eq 0 ]; then
        # No arguments provided
        print_message "No arguments provided"
        exit 1  # Exit with error
    fi
    
    # Process each argument
    for arg in "$@"; do
        # Print each argument
        print_message "Processing: $arg"
    done
    
    # Script completed successfully
    print_message "Script execution completed"
}

# Call main function with all arguments
main "$@"

# End of script
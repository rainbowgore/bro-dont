// C program with various comment styles

#include <stdio.h>  // Standard input/output library
#include <stdlib.h> // Standard library functions

/*
 * Function prototypes
 * Declare functions before main
 */
int add(int a, int b);
void print_result(int result);

// Main function entry point
int main() {
    // Declare variables
    int num1 = 10; // First number
    int num2 = 20; // Second number
    
    /* 
     * Perform calculation
     * Call add function
     */
    int sum = add(num1, num2); // Calculate sum
    
    // Display the result
    print_result(sum);
    
    return 0; // Exit successfully
}

// Addition function implementation
int add(int a, int b) {
    /* Simple addition operation */
    return a + b; // Return the sum
}

// Function to print the result
void print_result(int result) {
    // Print with formatting
    printf("The result is: %d\n", result); // Display result
}

/* End of program */
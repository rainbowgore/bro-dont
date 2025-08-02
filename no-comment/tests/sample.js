// Main greeting function for users
function greetUser(name) {
    if (!name) {
        return "Hello, stranger!";
    }
    /* 
     * Return personalized greeting
     * Uses template literal for string interpolation
     */
    return `Hello, ${name}!`;
}
module.exports = greetUser;
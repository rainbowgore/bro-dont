// Define a User interface with basic user information
interface User {
  // Unique identifier for the user
  id: number;

  // Name of the user
  name: string;

  // Email address of the user
  email: string;
}

// Create a class to manage users
class UserService {
  // Declare a private array to store User objects
  private users: User[] = [];

  // Method to add a new user to the list
  addUser(user: User): void {
    // Check if the user is valid before adding
    if (this.validateUser(user)) {
      // Add the valid user to the users array
      this.users.push(user);
    }
  }

  // Private method to validate the user's email
  private validateUser(user: User): boolean {
    // Check if the email contains an "@" symbol
    return user.email.includes("@");
  }
}

// Export the UserService class and User interface for use in other modules
export { UserService, User };
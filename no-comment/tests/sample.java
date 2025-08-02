// Define a public class named Sample
public class Sample {

    // Declare a private variable to store the name
    private String name;

    // Declare a private variable to store the age
    private int age;

    // Default constructor
    public Sample() {
        // Set the default name to "Unknown"
        this.name = "Unknown";

        // Set the default age to 0
        this.age = 0;
    }

    // Parameterized constructor
    public Sample(String name, int age) {
        // Assign the provided name to the instance variable
        this.name = name;

        // Assign the provided age to the instance variable
        this.age = age;
    }

    // Getter method for the name
    public String getName() {
        // Return the name of the object
        return this.name;
    }

    // Setter method for the name
    public void setName(String name) {
        // Check if the provided name is not null and not empty
        if (name != null && !name.trim().isEmpty()) {
            // If valid, assign the new name to the instance variable
            this.name = name;
        }
    }

    // Main method - the entry point of the program
    public static void main(String[] args) {
        // Create a new Sample object using the parameterized constructor
        Sample person = new Sample("John", 25);

        // Print the name of the person to the console
        System.out.println("Name: " + person.getName());
    }
}
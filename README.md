🏦 Banking Management System (OOP)
A dynamic and interactive web application for managing bank clients and their financial accounts, built with Vanilla JavaScript and Bootstrap 5.

🚀 Key Features
Client Management: Create, view, and delete client profiles (Firstname, Lastname, DNI).

Multi-Account Support: Open multiple bank accounts for a single client with unique account numbers.

Financial Transactions: Perform Deposits and Withdrawals with real-time balance updates.

Validation Logic: Built-in checks for insufficient funds and invalid inputs.

Dynamic UI: A responsive dashboard that re-renders automatically after every data change.

🛠 Technical Architecture (OOP Focus)
Encapsulation: Extensive use of Private Fields (#balance, #accountList) to ensure data integrity and prevent direct external manipulation.

Class Composition: Implemented a one-to-many relationship where a Client object manages a collection of Account objects.

Modern JS (ES6+): Utilizes find(), filter(), some(), and arrow functions for clean and efficient data handling.

Strict Mode: Development adheres to "use strict"; to enforce high coding standards and prevent silent errors.

📂 File Structure
Client.js: Defines the Client class and manages the account array logic.

Account.js: Defines the Account class with transaction methods (deposit/withdraw).

Main.js: Acts as the controller, handling DOM events and modal interactions.

index.html: The user interface styled with Bootstrap and Bi-Icons.

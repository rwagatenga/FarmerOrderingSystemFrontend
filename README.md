# Farmer Ordering System

This project implements a simple farmer ordering system where farmers can order fertilizers and seeds from an agro-input store. The system automates the calculation of fertilizer and seed quantities based on the size of the land owned by farmers. It also allows the agro-input store to view orders, approve them when fully paid in cash, or reject them.

## System Process Flow

1. **Farmer Registration**: Farmers register on the platform providing necessary details such as name, contact information, and land size.

2. **Order Placement**: Farmers place orders for fertilizers and seeds specifying the land size and the type of seeds required.

3. **Auto Calculation**: Upon order placement, the system automatically calculates the required quantities of fertilizers and seeds based on the size of the land and the type of seeds chosen.

4. **Order Approval**: The agro-input store receives the orders and has the option to approve them when fully paid in cash or reject them.

## Technologies Used

### Frontend

- **Framework**: React.js
- **State Management**: React Query
- **UI Library**: Shadcn

### Backend

- **Running Environment**: Node.js
- **Language**: TypeScript
- **Database**: MongoDB or PostgreSQL
- **Framework**: Express.js

## Running the Application

1. Clone the repository from [GitHub Repo](https://github.com/yourusername/FarmerOrderingSystemFrontend.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up the environment variables such as database connection details and server port in a `.env` file (for backend).
5. Start the development server for the frontend using:
   ```bash
   npm run dev
   ```
6. Start the backend server (if applicable) using:
   ```bash
   npm run dev
   ```
7. Access the application through the specified port in the browser.

## Additional Notes

- Ensure that Node.js and the chosen database (MongoDB or PostgreSQL) are installed on your system before running the application.
- Regularly back up the database to prevent data loss in case of system failures.
- The provided scripts help to manage the development, build, and linting processes efficiently.

## Contributors

- [Fred Rwagatenga](https://github.com/rwagatenga)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

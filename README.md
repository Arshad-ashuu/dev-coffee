

# Dev-Coffee CLI ☕️

`dev-coffee` is a command-line interface (CLI) tool for managing and placing coffee orders. Built with Node.js, Inquirer, Mongoose, and Nodemailer, it allows users to register, browse available coffee products, place orders, and receive order confirmation emails—all from the terminal.

## Features

- **User Registration**: Register new users with their name, phone number, and email.
- **Product Browsing**: View a list of available coffee products with names and prices.
- **Order Placement**: Place orders directly through the CLI.
- **Order Confirmation**: Receive email confirmation of each order, including order details.
- **Order History**: View previous orders with timestamps.

## Installation

To install `dev-coffee`, ensure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
npm install -g dev-coffee-cli
```

## Usage

After installation, you can start using the `dev-coffee` CLI by typing the following command:

```bash
dev-coffee
```

Follow the prompts to register, browse products, place orders, and view order history.

## Commands

- **Start CLI**: `dev-coffee` - Launches the interactive CLI menu.


## Dependencies

- [chalk](https://www.npmjs.com/package/chalk) - For styled terminal output.
- [cli-table3](https://www.npmjs.com/package/cli-table3) - For displaying tables in the terminal.
- [dotenv](https://www.npmjs.com/package/dotenv) - For managing environment variables.
- [inquirer](https://www.npmjs.com/package/inquirer) - For creating interactive CLI prompts.
- [mongoose](https://www.npmjs.com/package/mongoose) - For database interactions.
- [nodemailer](https://www.npmjs.com/package/nodemailer) - For sending email notifications.

## Example Usage

1. **Register a New User**
   ```bash
   dev-coffee
   ```
   Follow the prompt to enter your name, phone number, and email.

2. **Browse Available Products**
   - Choose "Browse Products" from the menu to view the coffee options.

3. **Place an Order**
   - Choose "Place Order" and select the product and quantity. The order will be saved, and a confirmation email will be sent to you.

4. **View Orders**
   - Choose "View Orders" to see your previous orders.

---
## Development

To work on this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dev-coffee-cli.git
   cd dev-coffee-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the CLI:
   ```bash
   node index.js
   ```

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

## Contact

For questions or support, please contact [mohammad arshad](mailto:mohammadarshad01474@gmail.com).

---

This README provides a solid foundation. Replace placeholders like `your-username` in the GitHub link and `your-email@example.com` with your actual details, and adjust as needed for your package!
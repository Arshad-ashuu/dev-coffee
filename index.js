#!/usr/bin/env node
import fs from 'fs';
import inquirer from 'inquirer';
import mongoose from 'mongoose';
import User from './models/user.js';
import Order from './models/order.js';
import chalk from 'chalk';  // For adding color
import Table from 'cli-table3';  // For displaying tables
import { configDotenv } from 'dotenv';
import nodemailer from 'nodemailer';  // Import nodemailer

configDotenv();

mongoose.connect(process.env.MONGODB_URI);
const products=[
    { name: 'Espresso', price: 2.50 },
    { name: 'Americano', price: 3.00 },
    { name: 'Cappuccino', price: 3.50 },
    { name: 'Latte', price: 4.00 },
    { name: 'Mocha', price: 4.50 },
    { name: 'Flat White', price: 4.00 },
    { name: 'Macchiato', price: 3.25 },
    { name: 'Caramel Macchiato', price: 4.75 },
    { name: 'Iced Coffee', price: 3.75 },
    { name: 'Cold Brew', price: 4.25 }
  ];


async function registerUser() {
  console.log(chalk.cyan('\t\t\t\n☕ Hey! Welcome to Coffee-Order! 🍵 \n'));
  console.log(chalk.white('Made with 💖 by Arshad\n'));

  const { name, phone, email ,address} = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter your name:' },
    { type: 'input', name: 'phone', message: 'Enter your phone number:' },
    { type: 'input', name: 'email', message: 'Enter your email:' },
    { type: 'input', name: 'address', message: 'Enter your current delivery address:' },

  ]);

  const user = new User({ name, phone, email, address });
  await user.save();
 
  console.log(chalk.green('User registered successfully! 🥳'));
  return user;
}

// Main Menu
async function mainMenu(user) {
  console.log(chalk.yellow('\n\thello👋, ' + user.name+'\n' ));

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an option:',
      choices: ['Browse Products', 'Place Order', 'View Orders', 'Exit'],
    },
  ]);

  switch (action) {
    case 'Browse Products':
      await browseProducts();
      break;
    case 'Place Order':
      await placeOrder(user);
      break;
    case 'View Orders':
      await viewOrders(user);
      break;
    case 'Exit':
      console.log(chalk.yellow('\n\t\tGoodbye! See you again soon 👋'));
      process.exit();
  }
}

// Browse Products
async function browseProducts() {
  // Create a table instance with customized styles
  const table = new Table({
    head: [chalk.bold('No.'), chalk.bold('Product Name'), chalk.bold('Price')],
    colWidths: [5, 20, 15],
    style: {
      head: [chalk.blue],
      border: ['grey'],
      'padding-left': 1,
      'padding-right': 1
    }
  });

  // Populate the table with product data
  products.forEach((product, index) => {
    table.push([chalk.green(index + 1), chalk.green(product.name), chalk.magenta(`$${product.price.toFixed(2)}`)]);
  });

  // Display the table with a header
  console.log(chalk.cyan('\nAvailable Products: ☕🍩'));
  console.log(table.toString());
}

// Place Order
// Place Order
async function placeOrder(user) {
    const productChoices = products.map(p => p.name);
  
    const { productName } = await inquirer.prompt([ 
      { type: 'list', name: 'productName', message: 'Choose a product:', choices: productChoices },
    ]);
    const { quantity } = await inquirer.prompt([{ type: 'number', name: 'quantity', message: 'Enter quantity:' }]);
  
    const order = new Order({ userId: user._id, productName, quantity });
    await order.save();
  
    // Order placed successfully message
    console.log(chalk.green('\nOrder placed successfully! 🎉'));
  
    // Show Order Details in Table
    showOrderDetails(productName, quantity);
  
    // Send Email Notification
    sendOrderEmail(user.email, productName, quantity);
  
    // Proceed to main menu after email is sent
    await mainMenu(user);  // This ensures the menu appears after email confirmation
  }
  

// Show Order Details in Table
function showOrderDetails(productName, quantity) {
    const table = new Table({
      head: [chalk.bold('Product Name'), chalk.bold('Quantity'), chalk.bold('Total Price')],
      colWidths: [20, 10, 15],
      style: { head: [chalk.blue], border: ['grey'], 'padding-left': 1, 'padding-right': 1 }
    });

    // Find the price for the product from the products array
    const product = products.find(p => p.name === productName);
    if (!product) {
      console.log(chalk.red('Error: Product not found.'));
      return;
    }

    const totalPrice = product.price * quantity;

    // Add order details to the table
    table.push([chalk.green(productName), chalk.yellow(quantity), chalk.magenta(`$${totalPrice.toFixed(2)}`)]);
    console.log(table.toString());

    
}

// View Orders
async function viewOrders(user) {
  const orders = await Order.find({ userId: user._id });
  if (orders.length === 0) {
    console.log(chalk.red('\nYou have no orders yet. 😢'));
    return;
  }

  console.log(chalk.cyan('\nYour Orders: 📦'));
  const table = new Table({
    head: [chalk.bold('Product Name'), chalk.bold('Quantity'), chalk.bold('Date')],
    colWidths: [20, 10, 20],
    style: { head: [chalk.blue], border: ['grey'], 'padding-left': 1, 'padding-right': 1 }
  });

  orders.forEach(order => {
    table.push([chalk.green(order.productName), chalk.yellow(order.quantity), chalk.magenta(new Date(order.date).toLocaleDateString())]);
  });

  console.log(table.toString());
}

// Send Email Notification
function sendOrderEmail(userEmail, productName, quantity) {
    // Find the product price from the products array
    const product = products.find(p => p.name === productName);
    if (!product) {
      console.log(chalk.red('Error: Product not found.'));
      return;
    }
  
    const totalPrice = product.price * quantity;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Use correct env variable
        pass: process.env.EMAIL_PASS   // Use correct env variable
      }
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender email
      to: userEmail,                 // Recipient email (user's email)
      subject: 'Order Confirmation – Thank You for Choosing Coffee-Order!',
      text: `
        Dear Customer,
  
        Thank you for your order with Coffee-Order! We are delighted to confirm that we've received your order for ${quantity} x ${productName} with a total bill of $${totalPrice.toFixed(2)}. can be payed with card or cash on delivery.
  
        Your order will be processed shortly, and we’ll notify you once it's ready for pickup or delivery. We appreciate your business and look forward to serving you again soon!
  
        Enjoy your coffee, and have a wonderful day! ☕
  
        Best regards,
        The Coffee-Order Team
      `
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(chalk.red('Error sending email:', error));
      } else {
        console.log(chalk.green('\nEmail sent with order details! Yeyyyy 🎉'));
      }
    });
  }
  

// Start the Application
async function startApp() {
  const user = await registerUser();
  while (true) {
    await mainMenu(user);
  }
}

startApp();

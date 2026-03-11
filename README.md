# Add to Cart React Application

## Project Overview

This project is a simple **ReactJS e-commerce interface** that fetches product data from the **Fake Store API** and allows users to add items to a shopping cart using a modal/side cart interface.

Users can browse products, add them to the cart, view cart items, and remove items from the cart.

The application is designed with a **responsive layout** and follows good component-based architecture practices.

---

## Features

* Fetches product data from the **Fake Store API**
* Displays products in a responsive grid layout
* Shows product image, title, and price
* Add products to cart
* Prevents duplicate items from being added to the cart
* Displays alert message when an item is already added
* Dynamic **cart item counter in the Navbar**
* Cart sidebar/modal to view added products
* Remove items from cart
* Automatically updates cart total
* Clean and reusable React component structure
* Responsive design for both **desktop and mobile devices**

---

## Tech Stack

* **ReactJS**
* **JavaScript (ES6+)**
* **HTML5**
* **Tailwind CSS**
* **Fake Store API**

---

## API Used

Fake Store API

https://fakestoreapi.com/products

This API provides product data such as:

* Product title
* Product price
* Product image
* Product category
* Product description

---

## Project Structure

```
src
 ┣ components
 ┃ ┣ Navbar.jsx
 ┃ ┣ ProductCard.jsx
 ┃ ┗ CartSidebar.jsx
 ┣ App.jsx
 ┣ main.jsx
 ┗ index.css
```

### Component Description

**Navbar.jsx**

* Displays the application title
* Shows cart icon with item count

**ProductCard.jsx**

* Displays product information
* Allows users to add products to the cart

**CartSidebar.jsx**

* Displays items added to the cart
* Allows removing products
* Shows total cart value

**App.jsx**

* Manages global state
* Handles product fetching
* Controls cart logic

---

## Responsive Design

The application uses **Tailwind CSS Grid and Flexbox** to ensure proper layout on different screen sizes:

* Mobile
* Tablet
* Desktop

---

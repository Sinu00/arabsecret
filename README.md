# ArabSecret - Perfume eCommerce App

ArabSecret is a simple eCommerce application built using **Next.js** where users can browse, add perfumes to their cart, and place orders. During checkout, the app collects the user’s details and generates a WhatsApp message with the order information, which is sent to a predefined WhatsApp number for further processing.

## Features

- **User Features:**
  - Browse Perfume Catalog
  - Add Perfumes to Cart
  - Checkout and Provide Order Details (Name, Address, etc.)
  - Place Order via WhatsApp (Automated Message Generation)

## Tech Stack

- **Frontend:**
  - Next.js (React-based framework)
  - HTML, CSS, JavaScript (React components)
  - Tailwind CSS for styling (optional)

- **Backend:**
  - No backend (serverless functionality via Next.js API routes)

## Installation

To set up the ArabSecret project on your local machine, follow the steps below:

### Prerequisites

- **Node.js** (version 12 or higher)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/arabsecret.git
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required dependencies:

   ```bash
   cd arabsecret
   npm install
   ```

3. **Run the Application:**

   Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Usage

### Browsing and Adding to Cart:

1. **Browse Products:**
   - Users can browse the available perfumes on the homepage.

2. **Add to Cart:**
   - Users can add perfumes to their cart by clicking the "Add to Cart" button on the product page.

3. **View Cart:**
   - Users can view their cart and proceed to checkout.

### Checkout Process:

1. **Enter Details:**
   - During checkout, users will be asked to provide their details such as name, shipping address, and contact number.

2. **Generate WhatsApp Order Message:**
   - Upon clicking "Checkout," the app generates a formatted message containing the order details (items, quantity, total price, user’s details) and redirects the user to WhatsApp.

3. **Place Order:**
   - The user is redirected to WhatsApp with the pre-filled order details. The user can confirm the order directly by sending the message to the provided WhatsApp number.

## Directory Structure

```
/arabsecret
├── /pages
│   ├── /api           # API routes (for handling checkout message generation)
│   ├── /cart          # Cart page
│   ├── /checkout      # Checkout page (User details and WhatsApp redirection)
│   └── /index.js      # Home page (Perfume catalog display)
├── /components        # Reusable components (ProductCard, CartItem, etc.)
├── /styles            # Styling (using Tailwind CSS or custom CSS)
├── /public            # Static assets (images, icons)
└── README.md          # This file
```

## How it Works

1. **Product Catalog:**
   - The catalog is displayed on the homepage where users can browse and select perfumes.

2. **Cart System:**
   - The cart allows users to add multiple items. They can view the items in their cart before proceeding to checkout.

3. **Checkout Process:**
   - When users click "Checkout," they are prompted to fill in their personal details such as name, address, and phone number.
   - A WhatsApp message is automatically generated with the user's order details (product name, quantity, total price, shipping details).
   - The app redirects the user to WhatsApp with the pre-filled order message.

4. **WhatsApp Redirection:**
   - Once the user confirms the order, the message is sent to a WhatsApp number of your choice (pre-configured in the code).

### Example WhatsApp Message:

The message that gets generated might look like this:

```
Hello, I would like to place an order!

Name: John Doe
Address: 123 Main Street, City, Country
Phone: +1234567890

Order Details:
- Arabian Oud Perfume: 2 x $50
- Floral Essence: 1 x $30

Total: $130

Please confirm my order. Thank you!
```

## Contributing

If you would like to contribute to the development of ArabSecret, feel free to fork the repository, make changes, and submit a pull request. Please make sure to follow the coding standards used in the project.

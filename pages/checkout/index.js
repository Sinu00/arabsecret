import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

export default function CheckoutPage({ cartItems, setCartItems }) {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const handleCheckout = () => {
        // Format cart details
        const cartDetails = cartItems.map(item => 
            `Title: ${item.title}\nQuantity: ${item.quantity}\nTotal: $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n\n');

        // Create the message
        const message = `Customer Name: ${customerName}\nAddress: ${customerAddress}\nPhone: ${customerPhone}\n\nCart Details:\n${cartDetails}`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '9778355402';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    };

    const handleDecrease = (item) => {
        if (item.quantity <= 1) {
            const newItems = cartItems.filter((eachItem) => eachItem.slug !== item.slug);
            setCartItems(newItems);
            return;
        }

        const newItems = cartItems.map((eachItem) => {
            if (item.slug === eachItem.slug) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return eachItem;
        });
        setCartItems(newItems);
    };

    return (
        <motion.div
            className="flex flex-col items-center gap-8"
        >
            <Head>
                <title>Checkout</title>
            </Head>
            {cartItems.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-8"
                >
                    <h1 className="text-center font-bold text-5xl pt-16">Your cart is empty!</h1>
                    <Link href="/products">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-2xl py-4 px-16 bg-gray-800 text-white text-2xl hover:bg-gray-700"
                        >
                            Back to Store
                        </motion.button>
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                    className="flex flex-col"
                >
                    <motion.ul
                        className="flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3"
                    >
                        {cartItems.map((item) => (
                            <motion.article
                                key={item.slug}
                                className="p-4 bg-white shadow rounded-2xl"
                            >
                                <div className="flex flex-col gap-1 pb-3 border-b border-b-gray-200 mb-3">
                                    <h1 className="font-bold truncate text-gray-600">{item.title}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex justify-between gap-2">
                                        <p>${item.price}</p>
                                        <p>&bull;</p>
                                        <p>{item.size}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-1"
                                            onClick={() => handleDecrease(item)}
                                        >
                                            -
                                        </motion.button>
                                        <p>{item.quantity}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-1"
                                            onClick={() => setCartItems([...cartItems, { ...item, quantity: item.quantity + 1 }])}
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.ul>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                            required
                        />
                        <motion.button
                            onClick={handleCheckout}
                            className="rounded-2xl py-4 px-16 bg-gray-800 text-white text-2xl hover:bg-gray-700"
                        >
                            Send Order
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

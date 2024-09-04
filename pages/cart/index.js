import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

const staggerDiv = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.25,
            staggerChildren: 0.1,
        }
    }
}

const itemStagger = {
    hidden: { opacity: 0, scale: 0.1 },
    show: { opacity: 1, scale: 1.0 }
}

export default function CartPage({ cartItems, setCartItems }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleDecrease = (item) => {
        if (item.quantity <= 1) {
            setCartItems(cartItems.filter((eachItem) => eachItem.slug !== item.slug));
            return;
        }
        setCartItems(cartItems.map((eachItem) => {
            if (item.slug === eachItem.slug) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return eachItem;
        }));
    }

    const handleIncrease = (item) => {
        setCartItems(cartItems.map((eachItem) => {
            if (item.slug === eachItem.slug) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return eachItem;
        }));
    }

    const handleCheckout = () => {
        if (!name || !address || !phone || isNaN(phone)) {
            setError("Please provide valid name, address, and phone number.");
            return;
        }

        // Send data to WhatsApp API or backend service
        const formattedMessage = cartItems.map(item => 
            `*Product:* ${item.title}\n *Quantity:* ${item.quantity}\n *Price:* QAR ${item.price.toFixed(2)}\n`
        ).join("\n");
        
        const message = `*Customer Name:* ${name}\n*Address:* ${address}\n*Phone Number:* ${phone}\n\n*Cart Details:*\n${formattedMessage}\n*Total Amount:* QAR${totalAmount}`;

        const encodedMessage = encodeURIComponent(message);
        window.location.href = `https://api.whatsapp.com/send?phone=+97477222886&text=${encodedMessage}`;

        // Reset the form and cart items
        setName("");
        setAddress("");
        setPhone("");
        setCartItems([]);
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <motion.div className="flex flex-col p-4">
            <Head>
                <title>Cart ({cartItems.length})</title>
            </Head>
            {cartItems.length <= 0
                ?
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
                :
                <motion.div
                    className="flex flex-col"
                >
                    <motion.ul
                        variants={staggerDiv}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3"
                    >
                        {cartItems.map((item) => (
                            <motion.article
                                variants={itemStagger}
                                key={item.slug}
                                className="p-4 bg-white shadow rounded-2xl flex items-center"
                            >
                                <div className="aspect-square w-1/3 relative">
                                    <img src={item.imgPaths[0]} alt={item.title} className="object-contain" />
                                </div>
                                <div className="flex-1 pl-4">
                                    <div className="flex flex-col gap-1 pb-3 border-b border-b-gray-200 mb-3">
                                        <h1 className="font-bold truncate text-gray-600">{item.title}</h1>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex justify-between gap-2">
                                            <p>QAR {item.price}</p>
                                            <p>&bull;</p>
                                            <p>{item.size}</p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => handleDecrease(item)}
                                            >
                                                -
                                            </motion.button>
                                            <p>{item.quantity}</p>
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => handleIncrease(item)}
                                            >
                                                +
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.ul>

                    <div className="flex flex-col gap-4 p-4 mt-8 border-t border-t-gray-200">
                        <div className="flex justify-between font-bold text-xl">
                            <p>Total Amount:</p>
                            <p>QAR {totalAmount}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="p-2 border rounded"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="self-center py-4 px-16 bg-gray-800 text-white text-2xl rounded-2xl hover:bg-gray-700"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </motion.button>
                    </div>
                </motion.div>
            }
        </motion.div>
    )
}

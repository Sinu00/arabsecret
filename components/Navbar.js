import Link from "next/link"
import { motion, spring } from "framer-motion"

export default function Navbar({ cartItems }) {
    return (
        <nav className="w-full flex justify-between items-center py-8 sticky top-0 px-4 lg:px-32 bg-gray-100 z-50">
            <Link href="/" className="flex items-center space-x-2">
            <img 
                    src="https://res.cloudinary.com/drc2ky0yw/image/upload/v1725187590/logo_sate6o.png" 
                    alt="Logo" 
                    className="w-12 h-12" 
                />
            <p className="text-3xl"><strong>Arab</strong>Secret</p></Link>
            <Link href="/cart">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="flex items-end"
                >
                    <svg className="stroke-gray-800 hover:stroke-blue-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12L8 8C8 5.79086 9.79086 4 12 4V4C14.2091 4 16 5.79086 16 8L16 12" strokeWidth="2" strokeLinecap="round" />
                        <path d="M3.69435 12.6678C3.83942 10.9269 3.91196 10.0565 4.48605 9.52824C5.06013 9 5.9336 9 7.68053 9H16.3195C18.0664 9 18.9399 9 19.514 9.52824C20.088 10.0565 20.1606 10.9269 20.3057 12.6678L20.8195 18.8339C20.904 19.8474 20.9462 20.3542 20.6491 20.6771C20.352 21 19.8435 21 18.8264 21H5.1736C4.15655 21 3.64802 21 3.35092 20.6771C3.05382 20.3542 3.09605 19.8474 3.18051 18.8339L3.69435 12.6678Z" strokeWidth="2" />
                    </svg>
                    {
                        cartItems.length > 0
                        &&
                        <motion.sub
                            key={cartItems.length}
                            initial={{ scale: 0.1 }}
                            animate={{ scale: 1.0 }}
                            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                            className="bg-red-700 p-3 rounded-full text-white font-bold"
                        >
                            {cartItems.length}
                        </motion.sub>
                    }
                </motion.button>
            </Link>
        </nav>
    )
}

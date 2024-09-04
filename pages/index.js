import Link from "next/link"
import { motion } from "framer-motion"
import Head from "next/head"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:items-center md:pt-12"
    >
      <Head>
        <title>Arab Secret</title>
      </Head>
      <h1 className="font-bold mb-4 text-4xl md:text-5xl">Welcome to Arab Secret</h1>
      <Link href="/products">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl py-4 px-16 bg-gray-800 text-white text-2xl hover:bg-gray-700"
        >
          Shop Now
        </motion.button>
      </Link>
    </motion.div>
  )
}

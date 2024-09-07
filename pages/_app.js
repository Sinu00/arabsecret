import '@/styles/globals.css'
import Layout from "@/components/Layout"
import { useState } from "react"
import 'swiper/css';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Layout cartItems={cartItems}>
      <Component {...pageProps} cartItems={cartItems} setCartItems={setCartItems} />
      <Analytics />
    </Layout>
  )
}

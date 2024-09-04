import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://res.cloudinary.com/drc2ky0yw/image/upload/v1725187590/logo_sate6o.png"></link>
        <meta name="description" content="Arab Secret Perfumes" />
        <meta name="keywords" content="bootstrap, shop, e-commerce, market, modern, responsive,  business, mobile, bootstrap, html5, css3, js, gallery, slider, touch, creative, clean,qatar,qatarecommerce,ecommerceqatar,arab,arabsecret,arabsecrets,arabsecretqatar,arab-secret" />
      </Head>
      <body className="bg-gray-100 text-gray-800 font-medium font-poppins">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

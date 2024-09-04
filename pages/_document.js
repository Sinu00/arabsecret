import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://res.cloudinary.com/drc2ky0yw/image/upload/v1725187590/logo_sate6o.png"></link>
      </Head>
      <body className="bg-gray-100 text-gray-800 font-medium font-poppins">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700&display=optional" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i&display=optional" rel="stylesheet" />
      <script src="https://www.google.com/recaptcha/api.js" async defer />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

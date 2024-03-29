import Head from 'next/head';

import App from '../components/app/App';

export default function Home() {
  return (
    <>
      <Head>
        <title>Adrian Eyre</title>

        <meta name="description" content="Adrian Eyre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
		
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Adrian Eyre" />
        <meta name="description" content="Portfolio site of Adrian Eyre" />

        <meta itemProp="name" content="Adrian Eyre" />
        <meta itemProp="description" content="Portfolio site of Adrian Eyre" />
        <meta itemProp="image" content="http://adrianeyre.co.uk/images/meta/banner.png" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://adrianeyre.co.uk/" />
        <meta property="og:title" content="Adrian Eyre" />
        <meta property="og:description" content="Portfolio site of Adrian Eyre" />
        <meta property="og:image" content="http://adrianeyre.co.uk/images/meta/banner.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://adrianeyre.co.uk/" />
        <meta property="twitter:title" content="Adrian Eyre" />
        <meta property="twitter:description" content="Portfolio site of Adrian Eyre" />
        <meta property="twitter:image" content="http://adrianeyre.co.uk/images/meta/banner.png" />
      </Head>
      <App />
    </>
  )
}

import Head from 'next/head'
import CountrySelect from '../components/country-select'

export default function Home({flags}) {
  return (
    <main>
      <Head>
        <title>Country</title>
        <meta name="description" content="Explorica assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-4xl m-5 font-bold'> Welcome Explorica!</h1>
        <CountrySelect flags={flags}/>
        <footer className='mt-3'>
        <p className='text-center text-gray-500 text-xs'>
          &copy; {new Date().getFullYear()} Explorica. All rights reserved.
        </p>
      </footer>
      </div>
     
    </main>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://127.0.0.1:5000/flags');
  const flags = await res.json();
  return {
    props: {
      flags
    }
  }
}
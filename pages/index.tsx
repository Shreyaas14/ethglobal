import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';

export default function LoginPage() {
  const {ready, logout, authenticated, login} = usePrivy();

  return (
    <>
    <Head>
      <title>Login · Privy</title>
    </Head>
    <main className="flex flex-col p-12 min-h-screen min-w-full bg-[url(https://drive.google.com/uc?id=1Jn-aQ2byyirIgeZ1sCoZhbM9NUPoRKKd)]">
      {/* // bg-[url(https://drive.google.com/uc?id=1Jn-aQ2byyirIgeZ1sCoZhbM9NUPoRKKd)] */}
      <div className='flex flex-row justify-between bg-white/10 text-white items-center p-2 px-4 rounded-lg mb-16'>
        <div className='flex flex-row'>
          <img src='https://drive.google.com/uc?id=17sLQ4IMiInbTBcCK8rxkGEK8vbILVLAM' className='w-[35px]' alt='NYU Logo' />
          <p className='font-bold text-white text-2xl'>Arbitrage</p>
        </div>
        <nav className="text-white-[50%] text-xl flex flex-row gap-6">
          <p>Dashboard</p>
          <p>Whitepaper</p>
          <p>Contact</p>
        </nav>
      </div>
      <div className='w-full flex flex-row justify-evenly'>
        <div className='flex flex-col items-center  p-20 px-32 w-[80%] gap-2'>
          <h1 className='font-bold text-white text-[70px]'>Staking made simple</h1>
          <h4 className='font-semibold text-white text-[34px]'>Faster, cheaper, and more accessible.</h4>
          <p className='text-white text-[30px] flex-wrap font-light'>
            Get the best and most transparent staking solution. Perfect for anyone of any skill level.
          </p>
          <div className='w-full flex flex-row justify-between gap-3'>
            <button
              className="w-full h-12 bg-transparent border border-[#FCA150] hover:bg-[#FCA150] hover:text-white py-3 px-6 text-[#FCA150] rounded-lg"
            >
              <p className="text-[20px]">Learn more</p>
            </button>
            {(!authenticated) ? (
                <button
                  className="bg-[#FCA150] h-12 w-full hover:bg-orange-500 py-3 px-6 text-white rounded-lg justify-center items-center"
                  onClick={(login)}
                >
                  <p className='text-[20px]' >Log in!</p>
                </button>
              ) : (
                <button
                  className="bg-[#FCA150] h-12 w-full hover:bg-orange-500 py-3 px-6 text-white rounded-lg flex justify-center items-center"
                  onClick={logout}
                >
                  <p className='text-[20px]' >Log out!</p>
                </button>
              )}
            {/* </button> */}
          </div>
        </div>
        <img className="h-[450px]" src='https://drive.google.com/uc?id=17g30X2gPl1CrPeKoUbTTLSa-_CywodUX' /> 
      </div>
    </main>
    </>
    // <>
    //   <Head>
    //     <title>Login · Privy</title>
    //   </Head>

    //   <main className="flex min-h-screen min-w-full">
    //     <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
    //       <div>
    //         <div className="mt-6 flex justify-center text-center">
    //           <button
    //             className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
    //             onClick={login}
    //           >
    //             Log in
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </>
  );
}

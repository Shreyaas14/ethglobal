// import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
// import {usePrivy, useWallets} from '@privy-io/react-auth';
import Head from 'next/head';

// import { Client } from '@xmtp/xmtp-js'
// import { Wallet } from 'ethers'

export default function DashboardPage() {
  // const router = useRouter();
  // const {
  //   ready,
  //   authenticated,
  //   user,
  //   logout,
  // } = usePrivy();

  // const [ethData, setEthData] = useState([]);
  // const [polyData, setPolyData] = useState([]);
  // const [bnbData, setBnbData] = useState([]);

  // useEffect(() => {
  //   const ethUrl = "http://localhost:3001/ethData";  
  //   const polyUrl = "http://localhost:3001/polyData";  
  //   const bnbUrl = "http://localhost:3001/bnbData";
  
    
  //   fetch(ethUrl).then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then((responseData) => {
  //     const edata = (responseData); // Update the state with the fetched data
  //     setEthData(edata.map((item: any) => item.price_close))
  //   })
  //   .catch((err) => {
  //     console.log(err); // Handle errors
  //   });
    
  //   fetch(polyUrl).then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then((responseData) => {
  //     const pdata = (responseData); // Update the state with the fetched data
  //     setPolyData(pdata.map((item: any) => item.price_close))
  //   })
  //   .catch((err) => {
  //     console.log(err); // Handle errors
  //   });

  //   fetch(bnbUrl).then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then((responseData) => {
  //     const bdata = (responseData); // Update the state with the fetched data
  //     setBnbData(bdata.map((item: any) => item.price_close))
  //   })
  //   .catch((err) => {
  //     console.log(err); // Handle errors
  //   });
  // }, [])
  

  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col p-12 min-h-screen min-w-full bg-[url(https://drive.google.com/uc?id=1Jn-aQ2byyirIgeZ1sCoZhbM9NUPoRKKd)]">
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
        <div className='flex flex-row w-full gap-2'>
          {/* stake */}
          <div className='w-[30%] flex flex-col gap-2' >
            <div className='bg-white/10 rounded-md p-4'>
              <h4 className='font-semibold text-white text-[34px] '>Staked Holdings</h4>
              <table className="table-auto border-collapse text-white">
                <tbody>
                    <tr>
                        <td className="p-2 font-bold">ETH</td>
                        <td className="p-2 font-bold"><span className='bg-gradient-to-r from-purple-700 to-purple-400 bg-clip-text text-transparent text-base'>Amount: </span> 65% </td>
                        <td> | </td>
                        <td className="p-2 font-bold"><span className='bg-gradient-to-r from-purple-400 to-purple-100 bg-clip-text text-transparent text-base'>Value: </span> 2,500 </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-bold">MAT</td>
                        <td className="p-2 font-bold"><span className='bg-gradient-to-r from-purple-700 to-purple-400 bg-clip-text text-transparent text-base'>Amount: </span> 25% </td>
                        <td> | </td>
                        <td className="p-2 font-bold"><span className='bg-gradient-to-r from-purple-400 to-purple-100 bg-clip-text text-transparent text-base'>Value: </span> 2,320 </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-bold">BNB</td>
                        <td className="p-2 font-bold" ><span className='bg-gradient-to-r from-purple-700 to-purple-400 bg-clip-text text-transparent text-base'>Amount: </span> 10% </td>
                        <td> | </td>
                        <td className="p-2 font-bold" ><span className='bg-gradient-to-r from-purple-400 to-purple-100 bg-clip-text text-transparent text-base'>Value: </span> 3,210 </td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div className='flex flex-col rounded-md bg-white/10 text-white p-4'>
              <h4 className='font-semibold text-[34px]'>Deposit</h4>
              <form>

              </form>
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between items-center'>
                  <div>
                    <h4 className='tracking-md'>Wallet</h4>
                    <select name='wallet' id='wallet' form='walletform' className='bg-transparent text-white border-white border rounded-md'>
                      <option value="metamask">MetaMask</option>
                      <option value="privy">Privy</option>
                    </select>
                  </div>
                  <div>
                    <h4 className='tracking-md'>Asset</h4>
                    <select name='curr' id='curr' form='walletform' className='bg-transparent text-white border-white border rounded-md'>
                      <option value="usd">USDC</option>
                      <option value="eth">Ethereum</option>
                    </select>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div>
                    <h4 className='tracking-m mt-2'>Amount to Deposit</h4>
                    <input type='text' className='w-full bg-transparent border border-white rounded-md'/>
                  </div>
                </div>
                <button className='bg-transparent border border-white rounded-md py-2 mt-6 hover:bg-white hover:text-purple-700'>
                  Deposit Amount  
                </button>  
              </div>
            </div>
          </div>
          {/* market */}
          <div className='bg-white/10 w-[70%] flex flexcol rounded-md'>
            <h4 className='font-semibold text-white text-[34px] p-4'>Market Data</h4>
            {/* <div> */}
            {/* </div> */}
          </div>
        </div>
        {/* chat */}
        <div className='flex flex-col bg-white/10 rounded-md mt-2 text-white'>
          <div className='flex flex-row items-center'>
            <h4 className='font-semibold text-white text-[34px] p-4'>Chat</h4>
            <p className='text-light'>Feel free to chat with other people using our platform!</p>
          </div>
          <div className='flex flex-col bg-white/10 m-4 rounded-lg p-4 max-h-48 overflow-y-auto'>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-start bg-slate-600 px-4 py-2 rounded-full mb-1'>
              <p>Yours</p>
            </div>
            <div className='flex self-end bg-blue-500 px-4 py-2 rounded-full mb-1'>
              <p>Mine</p>
            </div>
          </div>
          <div>
            <form className='flex flex-row p-4'>
              <input type='text' className='w-full rounded-xl bg-transparent border border-white text-end'/>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

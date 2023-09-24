import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {usePrivy, useWallets} from '@privy-io/react-auth';
import Head from 'next/head';

// import { Client } from '@xmtp/xmtp-js'
// import { Wallet } from 'ethers'

import { Client } from '@xmtp/xmtp-js'; 
import { Wallet } from 'ethers'; 
import { get } from 'http';

interface LinkedAccount {
  type: string; // More specific types like 'wallet' | 'email' can be used if known
  address: string;
  chain_type?: string; 
  verified_at: number;
}

interface UserData {
  id: string;
  created_at: number;
  linked_accounts: LinkedAccount[];
}

interface UserResponse {
  data: UserData[];
  next_cursor: string;
}

const data: UserResponse = require('./sample.json');

function extractAddresses(data: UserResponse): string[] {
  const addresses: string[] = [];
  
  for (const user of data.data) {
    for (const account of user.linked_accounts) {
      addresses.push(account.address);
    }
  }

  return addresses;
}

const addressesArray = extractAddresses(data);
console.log(addressesArray);




export default function DashboardPage() {
  const router = useRouter();
  const {
      ready,
      authenticated,
  } = usePrivy();

  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
      if (ready && !authenticated) {
          router.push('/');
      }
  }, [ready, authenticated, router]);

  const getUsers = async (cursor) => {
      const url = `/api/getUsers` + (cursor ? `?cursor=${cursor}` : '');
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return console.log(response.json());
  };

  useEffect(() => {
      const fetchData = async () => {
          let cursor;
          let fetchedUsers: any[] | ((prevState: never[]) => never[]) = [];

          try {
              do {
                  const query = await getUsers(cursor);
                  fetchedUsers = fetchedUsers.concat(query.data);
                  cursor = query.next_cursor;
              } while(cursor !== null);

              setUsers(fetchedUsers);
          } 
          catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred.');
            }
        }
          finally 
          {
              setIsLoading(false);
          }
      };

      fetchData();
  }, []);

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  // const [ethData, setEthData] = useState([]);
  // const [polyData, setPolyData] = useState([]);
  // const [bnbData, setBnbData] = useState([]);

  // useEffect(() => {
  //   const ethUrl = "http://localhost:3001/ethData";  
  //   const polyUrl = "http://localhost:3001/polyData";  
  //   const bnbUrl = "http://localhost:3001/bnbData";
  

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

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Head from 'next/head';
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

// Method to extract the addresses


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


  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col p-12 min-h-screen min-w-full bg-[url(https://drive.google.com/uc?id=1Jn-aQ2byyirIgeZ1sCoZhbM9NUPoRKKd)]">
        <div className='flex flex-row justify-between bg-white/10 text-white items-center p-2 px-4 rounded-full mb-16'>
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
          <div className='w-[50%] flex flex-col gap-2' >
            <div>
              <h4 className='bg-white/10  font-semibold text-white text-[34px] rounded-md p-4'>Staked Holdings</h4>
              <form className='flex flex-row'>

              </form>
            </div>
            <div>
              <h4 className='bg-white/10  font-semibold text-white text-[34px] rounded-md p-4'>Deposit</h4>
            </div>
          </div>
          {/* market */}
          <div className='bg-white/10 w-[50%] flex flexcol rounded-md'>
            <h4 className='font-semibold text-white text-[34px] p-4'>Market Data</h4>
            {/* <div> */}
            {/* </div> */}
          </div>
        </div>
        {/* chat */}
        <div className='flex flex-row'>
          <h4 className='font-semibold text-white text-[34px] p-4'>Chat</h4>
        </div>
      </main>
    </>
  );
}

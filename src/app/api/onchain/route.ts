import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    network: {
      blockNumber: 52847392,
      gasPrice: 30000000000,
      chainName: 'Polygon Mainnet',
      status: 'connected',
    },
    token: {
      name: 'LIPT Protocol',
      symbol: 'LIPT',
      totalSupply: '1000000000',
      totalBurned: '100000000',
      circulating: '423456789',
      contractAddress: '0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF00',
    },
  });
}

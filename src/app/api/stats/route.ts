import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    marketCap: '2500000',
    totalBurned: '1000000',
    holders: 4200,
    price: '0.000595',
    circulating: '423456789',
    totalSupply: '1000000000',
    stakingAPY: 42,
    burnRate: 2.5,
    volume24h: '48923.45',
    priceChange24h: 5.7,
    transactions24h: 3847,
    liquidityUSD: '128456.78',
    source: 'static',
  });
}

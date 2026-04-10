import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    maintenance: false,
    version: '1.0.0',
    features: {
      swap: true,
      staking: true,
      forge: true,
    },
  });
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import bitcoinIcon from './assets/bitcoin.svg';
import binanceIcon from './assets/binance.svg';
import ethereumIcon from './assets/ethereum.svg';
import xrpIcon from './assets/xrp.svg';
import usdtIcon from './assets/usdt.svg';
import solanaIcon from './assets/solana.svg';
import FloatingNotifications from './components/FloatingNotifications';
import Rating from './components/Rating';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoCard = ({ icon, name, label, price, change, chartData }: {
  icon: string;
  name: string;
  label: string;
  price: number;
  change: number;
  chartData: number[];
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      point: { radius: 0 },
      line: { tension: 0.4 }
    }
  };

  const chartConfig = {
    labels: chartData.map((_, i) => i.toString()),
    datasets: [{
      data: chartData,
      borderColor: change >= 0 ? '#00E3A5' : '#ff4d4d',
      borderWidth: 2,
      fill: false,
    }]
  };

  return (
    <div className="bg-[#2C2844]/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2C2844] hover:to-[#1E1B2E] hover:shadow-xl hover:shadow-[#00E3A5]/10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={icon} alt={name} className="w-8 h-8" />
          <div>
            <span className="font-bold text-white">{name}</span>
            <span className="ml-2 bg-[#3C3757]/50 text-[#B7B3C0] text-xs px-2 py-1 rounded">
              {label}
            </span>
          </div>
        </div>
        <span className={`text-sm px-2 py-1 rounded-full ${change >= 0 ? 'text-[#00E3A5] bg-[#00E3A5]/10' : 'text-red-500 bg-red-500/10'}`}>
          {change.toFixed(2)}%
        </span>
      </div>
      <div className="mb-4">
        <h3 className="text-2xl text-white font-bold">
          ${price.toLocaleString()}
        </h3>
      </div>
      <div className="h-[60px]">
        {chartData.length > 0 && (
          <Line options={chartOptions} data={chartConfig} />
        )}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [prices, setPrices] = useState({
    BTC: { price: 0, change: 0, chartData: [] },
    BNB: { price: 0, change: 0, chartData: [] },
    ETH: { price: 0, change: 0, chartData: [] },
    XRP: { price: 0, change: 0, chartData: [] },
    USDT: { price: 0, change: 0, chartData: [] },
    SOL: { price: 0, change: 0, chartData: [] }
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [priceRes, btcHistory, bnbHistory, ethHistory, xrpHistory, usdtHistory, solHistory] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,ethereum,ripple,tether,solana&vs_currencies=usd&include_24hr_change=true'),
          fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily'),
          fetch('https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=usd&days=7&interval=daily'),
          fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7&interval=daily'),
          fetch('https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=7&interval=daily'),
          fetch('https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=7&interval=daily'),
          fetch('https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=7&interval=daily')
        ]);

        const [priceData, btcHistoryData, bnbHistoryData, ethHistoryData, xrpHistoryData, usdtHistoryData, solHistoryData] = await Promise.all([
          priceRes.json(),
          btcHistory.json(),
          bnbHistory.json(),
          ethHistory.json(),
          xrpHistory.json(),
          usdtHistory.json(),
          solHistory.json()
        ]);

        setPrices({
          BTC: {
            price: priceData.bitcoin.usd,
            change: priceData.bitcoin.usd_24h_change,
            chartData: btcHistoryData.prices.map(([_, price]: [number, number]) => price)
          },
          BNB: {
            price: priceData.binancecoin.usd,
            change: priceData.binancecoin.usd_24h_change,
            chartData: bnbHistoryData.prices.map(([_, price]: [number, number]) => price)
          },
          ETH: {
            price: priceData.ethereum.usd,
            change: priceData.ethereum.usd_24h_change,
            chartData: ethHistoryData.prices.map(([_, price]: [number, number]) => price)
          },
          XRP: {
            price: priceData.ripple.usd,
            change: priceData.ripple.usd_24h_change,
            chartData: xrpHistoryData.prices.map(([_, price]: [number, number]) => price)
          },
          USDT: {
            price: priceData.tether.usd,
            change: priceData.tether.usd_24h_change,
            chartData: usdtHistoryData.prices.map(([_, price]: [number, number]) => price)
          },
          SOL: {
            price: priceData.solana.usd,
            change: priceData.solana.usd_24h_change,
            chartData: solHistoryData.prices.map(([_, price]: [number, number]) => price)
          }
        });
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="h-14 bg-[#1E1B2E]"></div>
      <FloatingNotifications />
      <div className="relative min-h-screen bg-[#1E1B2E] flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Start and Build Your Crypto Portfolio Here
              </h1>
              <p className="text-[#B7B3C0] text-lg mb-8">
                Only at X-BIT, you can build a good portfolio and learn best practices about cryptocurrency.
              </p>
              <button className="relative bg-gradient-to-r from-[#00E3A5] to-[#00c48f] text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#00E3A5]/50 hover:scale-105">
                Invest Now
              </button>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8">Market Trend</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CryptoCard
                  icon={bitcoinIcon}
                  name="BTC"
                  label="BITCOIN"
                  price={prices.BTC.price}
                  change={prices.BTC.change}
                  chartData={prices.BTC.chartData}
                />
                <CryptoCard
                  icon={binanceIcon}
                  name="BNB"
                  label="BINANCE"
                  price={prices.BNB.price}
                  change={prices.BNB.change}
                  chartData={prices.BNB.chartData}
                />
                <CryptoCard
                  icon={ethereumIcon}
                  name="ETH"
                  label="ETHEREUM"
                  price={prices.ETH.price}
                  change={prices.ETH.change}
                  chartData={prices.ETH.chartData}
                />
                <CryptoCard
                  icon={xrpIcon}
                  name="XRP"
                  label="RIPPLE"
                  price={prices.XRP.price}
                  change={prices.XRP.change}
                  chartData={prices.XRP.chartData}
                />
                <CryptoCard
                  icon={usdtIcon}
                  name="USDT"
                  label="TETHER"
                  price={prices.USDT.price}
                  change={prices.USDT.change}
                  chartData={prices.USDT.chartData}
                />
                <CryptoCard
                  icon={solanaIcon}
                  name="SOL"
                  label="SOLANA"
                  price={prices.SOL.price}
                  change={prices.SOL.change}
                  chartData={prices.SOL.chartData}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Rating />
    </>
  );
};

export default Hero;


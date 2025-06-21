import { useHomeContext, HomeProvider } from "../contexts/HomeContext";
import PriceTicker from "../components/PriceTicker";
import News from "../components/News";
import "./Home.css";

function HomeContent() {
  const { indices, news } = useHomeContext();
  const isNewsLoading = !news || news.length === 0;

  const hasNifty = indices?.NIFTY50;
  const hasSensex = indices?.SENSEX;
  const isIndicesLoading = !hasNifty || !hasSensex;

  return (
    <div className="home-container">
      <h2>Major Indices</h2>
      {isIndicesLoading ? (
        <p className="loading-msg">Loading indices...</p>
      ) : (
        <div className="indices-wrapper">
          <a
            className="nifty50"
            href="https://in.tradingview.com/chart/CRV5xZ4t/?symbol=NSE%3ANIFTY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PriceTicker
              name="NIFTY50"
              price={indices.NIFTY50.currPrice}
              close={indices.NIFTY50.prevClose}
            />
          </a>

          <a
            className="sensex"
            href="https://in.tradingview.com/chart/CRV5xZ4t/?symbol=BSE%3ASENSEX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PriceTicker
              name="SENSEX"
              price={indices.SENSEX.currPrice}
              close={indices.SENSEX.prevClose}
            />
          </a>
        </div>
      )}

      <h2>Latest News</h2>
      {isNewsLoading ? (
        <p className="loading-msg">Loading news...</p>
      ) : (
        <News newsList={news} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <HomeProvider>
      <HomeContent />
    </HomeProvider>
  );
}
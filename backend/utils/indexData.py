import json
import yfinance as yf

def fetch_index_prices():
    nifty = yf.Ticker("^NSEI")
    sensex = yf.Ticker("^BSESN")

    nifty_data = nifty.history(period="3d")
    sensex_data = sensex.history(period="3d")

    return {
        "NIFTY50": {
            "currPrice": round(nifty_data["Close"].iloc[-1], 2) if not nifty_data.empty else None,
            "prevClose": round(nifty_data["Close"].iloc[-2], 2) if not nifty_data.empty else None
        },
        "SENSEX": {
            "currPrice": round(sensex_data["Close"].iloc[-1], 2) if not sensex_data.empty else None,
            "prevClose": round(sensex_data["Close"].iloc[-2], 2) if not sensex_data.empty else None
        }
    }

if __name__ == "__main__":
    output = json.dumps(fetch_index_prices(), indent=2)
    print(output)
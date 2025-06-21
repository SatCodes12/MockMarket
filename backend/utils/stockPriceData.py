import sys
import json
import yfinance as yf

def get_current_price(ticker_symbol):
    stock = yf.Ticker(ticker_symbol)
    hist = stock.history(period="1d")

    if hist.empty:
        return {"Symbol": ticker_symbol, "Current Price": None}

    current_price = round(hist["Close"].iloc[-1], 2)
    return {
        "Symbol": ticker_symbol,
        "Current Price": current_price
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Ticker symbol required"}))
        sys.exit(1)

    ticker_symbol = sys.argv[1] + ".NS"
    output = json.dumps(get_current_price(ticker_symbol), indent=2)
    print(output)

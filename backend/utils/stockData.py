import sys
import json
import yfinance as yf

def fetch_stock_info(ticker_symbol):
    stock = yf.Ticker(ticker_symbol)
    hist = stock.history(period="2d")

    def extract_price_info(data):
        if data.empty or len(data) < 2:
            return None
        return {
            "Current": round(data["Close"].iloc[-1], 2),
            "Open": round(data["Open"].iloc[-1], 2),
            "High": round(data["High"].iloc[-1], 2),
            "Low": round(data["Low"].iloc[-1], 2),
            "Previous Close": round(data["Close"].iloc[-2], 2)
        }

    def extract_fundamentals(info):
        return {
            "Market Cap": info.get("marketCap"),
            "PE Ratio (TTM)": info.get("trailingPE"),
            "EPS (TTM)": info.get("trailingEps"),
            "Dividend Yield": info.get("dividendYield"),
            "52 Week High": info.get("fiftyTwoWeekHigh"),
            "52 Week Low": info.get("fiftyTwoWeekLow")
        }

    info = stock.info
    return {
        "Symbol": ticker_symbol,
        "Company Name": info.get("longName"),
        "Price Info": extract_price_info(hist),
        "Fundamentals": extract_fundamentals(info)
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Ticker symbol required"}))
        sys.exit(1)

    ticker_symbol = sys.argv[1] + ".NS"
    output = json.dumps(fetch_stock_info(ticker_symbol))
    print(output)

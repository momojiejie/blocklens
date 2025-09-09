# BlockLens Crypto Dashboard

BlockLens is a modern cryptocurrency dashboard and trading interface inspired by platforms like Binance. It provides real-time market data, interactive charts, search and filter features, and simulated trading tools for serious crypto enthusiasts and traders.

## Features

- **Home Page:**  
  - Search bar for quick navigation to any cryptocurrency.
  - Hero section with categorized coin cards: Popular, New, and Top Gainers.

- **Search Page:**  
  - Search and filter cryptocurrencies by name and price range.
  - Sort coins by price (highest/lowest).
  - Responsive grid layout with market graphs for each coin.
  - Click any coin to view detailed information.

- **Coin Detail Page:**  
  - Professional trading interface with tabs:
    - **Order Book:** Simulated buy/sell orders.
    - **Trades:** Recent simulated trades.
    - **Info:** Coin statistics, supply, market cap, and links.
    - **Trading Data:** Open, high, low, close, and price change.
  - Real-time market data from CoinMarketCap API.
  - Dummy data for trading simulation.

- **Backend:**  
  - Node.js/Express server fetches and processes data from CoinMarketCap.
  - Attaches logo and metadata to each coin.
  - API endpoint: `/api/listings`.

- **Frontend:**  
  - Built with React and Tailwind CSS.
  - Responsive, modern UI.
  - Uses Chart.js for market graphs.

## Getting Started

### Prerequisites

- Node.js and npm
- CoinMarketCap API key (for backend)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/blocklens.git
   cd blocklens
   ```

2. **Install dependencies:**
   ```sh
   npm install
   cd blocklens
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the backend directory:
     ```
     CMC_API_KEY=your_coinmarketcap_api_key
     ```

4. **Start the backend server:**
   ```sh
   node server.js
   ```

5. **Start the frontend:**
   ```sh
   npm start
   ```

## Usage

- Search for any cryptocurrency using the search bar.
- Filter and sort coins on the Search page.
- Click a coin to view detailed trading info, order book, and simulated trades.

## Technologies

- React
- Tailwind CSS
- Chart.js
- Node.js / Express
- CoinMarketCap API

## License

This project is for educational/demo purposes only.

---

**Contributions and feedback are welcome!**

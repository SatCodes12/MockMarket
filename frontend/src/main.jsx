import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { HomeProvider } from './contexts/HomeContext.jsx';
import { StockDetailsProvider } from './contexts/StockDetailsContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <BrowserRouter>
  //     <AuthProvider>
  //       <PortfolioProvider>
  //         <MarketProvider>
  //           <App />
  //         </MarketProvider>
  //       </PortfolioProvider>
  //     </AuthProvider>
  //   </BrowserRouter>
  // </StrictMode>,
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
            <App/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)

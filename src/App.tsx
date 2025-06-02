import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css'
import Products from './components/Products';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MainContent = styled.main`
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Home() {
  return (
    <MainContent>
      <Products />
    </MainContent>
  );
}

function App() {
  return (
    <Router>
      <AppContainer>
       
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App

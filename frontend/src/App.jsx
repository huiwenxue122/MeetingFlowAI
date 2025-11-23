import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import AgentSelector from './pages/AgentSelector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/agents" element={<AgentSelector />} />
      </Routes>
    </Router>
  );
}

export default App;

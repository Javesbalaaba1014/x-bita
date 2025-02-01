import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './hero'
import About from './components/About'
import Investment from './components/Investment'
import Learn from './components/Learn'
import Footer from './components/Footer'

function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen bg-[#1E1B2E]">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
            </>
          } />
          <Route path="/investment" element={<Investment />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

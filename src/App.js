import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TrainingTypes from './components/TrainingTypes';
import Trainers from './components/Trainers';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Map from './components/Map';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <TrainingTypes />
      <Trainers />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Map />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
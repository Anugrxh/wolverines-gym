import React from 'react';
import {
  ErrorBoundary,
  Navbar,
  Hero,
  About,
  TrainingTypes,
  Trainers,
  Gallery,
  Testimonials,
  Pricing,
  Map,
  Contact,
  Footer
} from './components';

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
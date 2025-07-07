import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Trusted from './components/Trusted';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="pt-16">
        <Hero />
        <Services />
        <WhyChoose />
        <Trusted />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
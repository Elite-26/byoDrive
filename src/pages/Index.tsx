
import { useState, useEffect } from 'react';
import { Menu, X, Car, Shield, Clock, Award, Star, MapPin, Phone, Mail } from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ByoDrive
                </h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-purple-400 transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-purple-400 transition-colors duration-200"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('fleet')}
                  className="hover:text-purple-400 transition-colors duration-200"
                >
                  Fleet
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-purple-400 transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 transition-colors duration-200 w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 transition-colors duration-200 w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('fleet')}
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 transition-colors duration-200 w-full text-left"
              >
                Fleet
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 transition-colors duration-200 w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop" 
            alt="Luxury car" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-purple-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Premium Car Rental
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in animation-delay-200">
            Discover luxury, comfort, and reliability with our premium fleet of vehicles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <button 
              onClick={() => scrollToSection('fleet')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Browse Fleet
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-500 hover:bg-purple-500 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose ByoDrive?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We provide exceptional service with premium vehicles and unmatched convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
              <p className="text-gray-400">Luxury vehicles maintained to the highest standards</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-400">Comprehensive coverage for your peace of mind</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400">Round-the-clock assistance whenever you need it</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
              <p className="text-gray-400">Competitive pricing with no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Premium Fleet</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose from our carefully selected collection of luxury vehicles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop" 
                alt="Luxury Sedan" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Luxury Sedan</h3>
                <p className="text-gray-400 mb-4">Perfect for business trips and city driving</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-400">4.9 (127 reviews)</span>
                  </div>
                  <span className="text-lg font-bold text-purple-400">$89/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1494976688153-018c27012e15?w=600&h=400&fit=crop" 
                alt="Sports Car" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sports Car</h3>
                <p className="text-gray-400 mb-4">Unleash your passion for driving</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-400">4.8 (89 reviews)</span>
                  </div>
                  <span className="text-lg font-bold text-purple-400">$149/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop" 
                alt="SUV" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Luxury SUV</h3>
                <p className="text-gray-400 mb-4">Spacious comfort for family adventures</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-400">4.9 (156 reviews)</span>
                  </div>
                  <span className="text-lg font-bold text-purple-400">$119/day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ready to book your premium vehicle? Contact us today
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-purple-400 mr-3" />
                  <span>123 Premium Drive, Luxury City, LC 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-purple-400 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-400 mr-3" />
                  <span>info@byodrive.com</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-400">
                  <div>Monday - Friday: 8:00 AM - 8:00 PM</div>
                  <div>Saturday: 9:00 AM - 6:00 PM</div>
                  <div>Sunday: 10:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Tell us about your rental needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              ByoDrive
            </h3>
            <p className="text-gray-400 mb-6">
              Premium car rental service delivering luxury, comfort, and reliability
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 ByoDrive. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
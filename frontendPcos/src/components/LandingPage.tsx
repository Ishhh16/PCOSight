import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Shield, Sparkles, ChevronRight } from 'lucide-react';
import bgImage from '@/assets/bg.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current?.children || [], 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );

      // Features animation
      gsap.fromTo(featuresRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)" }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: "power2.out" }
      );

      // Floating animations
      const petals = document.querySelectorAll('.floating-petal');
      petals.forEach((petal, index) => {
        gsap.to(petal, {
          y: -20,
          rotation: 360,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 1.5
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleGetStarted = () => {
    navigate('/predict');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-sage-50 via-dusty-rose-50 to-pale-lilac-50">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Floating petals */}
      <div className="floating-petal absolute top-20 left-10 w-4 h-4 bg-sage-200/30 rounded-full blur-sm" />
      <div className="floating-petal absolute top-40 right-20 w-3 h-3 bg-dusty-rose-200/30 rounded-full blur-sm" />
      <div className="floating-petal absolute bottom-40 left-20 w-5 h-5 bg-pale-lilac-200/30 rounded-full blur-sm" />
      <div className="floating-petal absolute bottom-20 right-10 w-4 h-4 bg-sage-200/30 rounded-full blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Site Title at Top */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-playfair font-bold mb-4 bg-[linear-gradient(to_right,#1D2671,#C33764)] bg-clip-text text-transparent">
            PCOSight
          </h1>
        </div>

        {/* Hero Section */}
        <div ref={heroRef} className="text-center max-w-4xl mx-auto mb-20">
          <p className="font-quicksand text-xl md:text-2xl text-earth-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            See beyond the symptoms with AI-powered insight ✨
          </p>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg max-w-3xl mx-auto">
            <p className="font-quicksand text-lg text-earth-700 leading-relaxed">
              PCOSight is an innovative AI-powered tool designed to help you understand your PCOS risk through comprehensive symptom analysis. 
              Our advanced algorithm evaluates multiple health indicators to provide personalized insights into your reproductive health.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mb-20">
          <div className="bg-white/25 backdrop-blur-md rounded-2xl p-8 border border-white/40 shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-dusty-rose-500 mr-2" />
              <h2 className="font-playfair text-3xl font-bold text-earth-700">Ready to Begin?</h2>
              <Sparkles className="w-6 h-6 text-pale-lilac-500 ml-2" />
            </div>
            <p className="font-quicksand text-earth-600 mb-6 text-lg">
              Take the first step towards understanding your health with our comprehensive PCOS risk assessment.
            </p>
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-700 text-white font-quicksand font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              Check Your Symptoms Now
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-dusty-rose-500 to-pale-lilac-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-quicksand font-bold text-xl text-earth-700 mb-3">AI-Powered Analysis</h3>
            <p className="font-quicksand text-earth-600">
              Advanced machine learning algorithms analyze your symptoms and health data to provide accurate risk assessment.
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-sage-500 to-dusty-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-quicksand font-bold text-xl text-earth-700 mb-3">Privacy First</h3>
            <p className="font-quicksand text-earth-600">
              Your data is processed securely and never stored permanently. Complete privacy and confidentiality guaranteed.
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-pale-lilac-500 to-sage-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-quicksand font-bold text-xl text-earth-700 mb-3">Holistic Health</h3>
            <p className="font-quicksand text-earth-600">
              Comprehensive evaluation of symptoms, lifestyle factors, and medical indicators for complete health insight.
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="text-center mt-16">
          <p className="font-quicksand text-sm italic text-earth-500 max-w-3xl mx-auto">
            Privacy Notice: Your data is processed securely and is not stored permanently. This tool is for educational purposes and should not replace professional medical consultation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
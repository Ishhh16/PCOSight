import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import FeatureImportanceChart from '@/components/ui/FeatureImportanceChart';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import bgImage from '@/assets/bg.jpeg';
// import FeatureImportanceChart from './FeatureImportanceChart';

interface FormData {
  age: string;
  weight: string;
  hb: string;
  cycle: string;
  cycleLength: string;
  betaHCG: string;
  amh: string;
  weightGain: boolean;
  hairGrowth: boolean;
  skinDarkening: boolean;
  pimples: boolean;
  fastFood: boolean;
  follicleL: string;
  follicleR: string;
  endometrium: string;
}

const PCOSight = () => {
  const [explanation, setExplanation] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    hb: '',
    cycle: '',
    cycleLength: '',
    betaHCG: '',
    amh: '',
    weightGain: false,
    hairGrowth: false,
    skinDarkening: false,
    pimples: false,
    fastFood: false,
    follicleL: '',
    follicleR: '',
    endometrium: ''
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initial animations
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    });

    // Floating elements animation
    floatingElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.set(element, { 
          x: Math.random() * window.innerWidth * 0.8, 
          y: Math.random() * window.innerHeight * 0.8,
          rotation: Math.random() * 360
        });
        
        gsap.to(element, {
          y: "-=100",
          x: "+=50",
          rotation: "+=180",
          duration: 20 + Math.random() * 15,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const payload = {
        Age_yrs: Number(formData.age),
        Weight_Kg: Number(formData.weight),
        Hb_g_dl: Number(formData.hb),
        Cycle_R_I: formData.cycle === 'R' ? 2 : 4,
        Cycle_length_days: Number(formData.cycleLength),
        I_beta_HCG_mIU_mL: Number(formData.betaHCG),
        AMH_ng_mL: Number(formData.amh),
        Weight_gain_YN: formData.weightGain ? 1 : 0,
        hair_growth_YN: formData.hairGrowth ? 1 : 0,
        Skin_darkening_YN: formData.skinDarkening ? 1 : 0,
        Pimples_YN: formData.pimples ? 1 : 0,
        Fast_food_YN: formData.fastFood ? 1 : 0,
        Follicle_No_L: Number(formData.follicleL),
        Follicle_No_R: Number(formData.follicleR),
        Endometrium_mm: Number(formData.endometrium)
      };
      const response = await fetch('http://localhost:9000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      // Fetch explanation
      const expRes = await fetch('http://localhost:9000/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const expData = await expRes.json();
      setExplanation(expData.explanation || []);
      // Always scroll to result after prediction
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100); // slight delay to ensure result is rendered
      if (result.prediction === 1) {
        setPrediction('high');
      } else if (result.prediction === 0) {
        setPrediction('low');
      } else {
        setPrediction(null);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
      setPrediction(null);
      setExplanation([]);
    }
    setIsLoading(false);
  };

  // Animate result card when prediction changes
  useEffect(() => {
    if (prediction && resultRef.current) {
      gsap.fromTo(resultRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
      // Scroll to result card
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [prediction]);

  const handleButtonHover = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleButtonLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  // Check if all required fields are filled
  const isFormComplete = Object.values(formData).every(val => {
    if (typeof val === 'boolean') return true;
    return val !== '';
  });

  return (
    <div 
      className="min-h-screen p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60"></div>
      
      {/* Floating botanical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className="absolute w-6 h-6 opacity-15"
            style={{
              background: i === 0 ? 'hsl(120, 30%, 70%)' : i === 1 ? 'hsl(40, 40%, 75%)' : 'hsl(280, 25%, 75%)',
              borderRadius: i === 0 ? '50% 0 50% 0' : i === 1 ? '0 50% 0 50%' : '50%',
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-playfair font-bold mb-4 bg-[linear-gradient(to_right,#1D2671,#C33764)] bg-clip-text text-transparent">
            PCOSight
          </h1>
          <p className="text-xl font-quicksand text-foreground/80 font-medium">
            See beyond the symptoms with AI-powered insight ✨
          </p>
        </div>

        {/* Input Form */}
        <Card ref={formRef} className="backdrop-blur-md bg-glass-bg border-glass-border shadow-2xl shadow-glass-shadow/20 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Numeric Inputs */}
            <div className="space-y-2">
              <Label htmlFor="age" className="font-quicksand font-medium">Age (yrs)</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="font-quicksand font-medium">Weight (Kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="65"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hb" className="font-quicksand font-medium">Hb (g/dl)</Label>
              <Input
                id="hb"
                type="number"
                step="0.1"
                placeholder="12.5"
                value={formData.hb}
                onChange={(e) => handleInputChange('hb', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cycle" className="font-quicksand font-medium">Cycle (R/I)</Label>
              <Select value={formData.cycle} onValueChange={(value) => handleInputChange('cycle', value)}>
                <SelectTrigger className="backdrop-blur-sm bg-input border-glass-border font-quicksand">
                  <SelectValue placeholder="Select cycle type" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-popover border-glass-border">
                  <SelectItem value="R">Regular (R)</SelectItem>
                  <SelectItem value="I">Irregular (I)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cycleLength" className="font-quicksand font-medium">Cycle length (days)</Label>
              <Input
                id="cycleLength"
                type="number"
                placeholder="28"
                value={formData.cycleLength}
                onChange={(e) => handleInputChange('cycleLength', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="betaHCG" className="font-quicksand font-medium">I beta-HCG (mIU/mL)</Label>
              <Input
                id="betaHCG"
                type="number"
                step="0.1"
                placeholder="2.0"
                value={formData.betaHCG}
                onChange={(e) => handleInputChange('betaHCG', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amh" className="font-quicksand font-medium">AMH (ng/mL)</Label>
              <Input
                id="amh"
                type="number"
                step="0.1"
                placeholder="3.5"
                value={formData.amh}
                onChange={(e) => handleInputChange('amh', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="follicleL" className="font-quicksand font-medium">Follicle No. (L)</Label>
              <Input
                id="follicleL"
                type="number"
                placeholder="8"
                value={formData.follicleL}
                onChange={(e) => handleInputChange('follicleL', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="follicleR" className="font-quicksand font-medium">Follicle No. (R)</Label>
              <Input
                id="follicleR"
                type="number"
                placeholder="7"
                value={formData.follicleR}
                onChange={(e) => handleInputChange('follicleR', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endometrium" className="font-quicksand font-medium">Endometrium (mm)</Label>
              <Input
                id="endometrium"
                type="number"
                step="0.1"
                placeholder="8.5"
                value={formData.endometrium}
                onChange={(e) => handleInputChange('endometrium', e.target.value)}
                className="backdrop-blur-sm bg-input border-glass-border font-quicksand"
              />
            </div>

            {/* Y/N Toggle Switches */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {[
                { key: 'weightGain', label: 'Weight gain' },
                { key: 'hairGrowth', label: 'Hair growth' },
                { key: 'skinDarkening', label: 'Skin darkening' },
                { key: 'pimples', label: 'Pimples' },
                { key: 'fastFood', label: 'Fast food' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm bg-glass-bg border border-glass-border">
                  <Label htmlFor={key} className="font-quicksand font-medium text-sm">
                    {label}
                  </Label>
                  <Switch
                    id={key}
                    checked={formData[key as keyof FormData] as boolean}
                    onCheckedChange={(checked) => handleInputChange(key as keyof FormData, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Predict Button */}
          <div className="flex justify-center mt-8">
            <Button
              ref={buttonRef}
              onClick={handlePredict}
              disabled={isLoading || !isFormComplete}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-700 text-white font-quicksand font-semibold text-lg px-12 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {isLoading ? 'Predicting...' : 'Predict Now'}
            </Button>
          </div>
        </Card>

        {/* Prediction Result */}
        {prediction && (
          <>
            <Card ref={resultRef} className="backdrop-blur-md bg-glass-bg border-glass-border shadow-2xl shadow-glass-shadow/20 p-8 text-center mb-8">
              <div className="space-y-4">
                {prediction === 'low' ? (
                  <>
                    <div className="text-6xl">✅</div>
                    <h3 className="text-3xl font-playfair font-bold text-primary">Low Risk of PCOS</h3>
                    <p className="text-lg font-quicksand text-foreground/80">
                      Great news! Your symptoms suggest a lower risk. Keep maintaining a healthy lifestyle! 🌟
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl">⚠️</div>
                    <h3 className="text-3xl font-playfair font-bold text-destructive">High Risk of PCOS</h3>
                    <p className="text-lg font-quicksand text-foreground/80">
                      Consider consulting with a healthcare professional for proper evaluation and guidance. 💙
                    </p>
                  </>
                )}
              </div>
            </Card>
            {/* Horizontal Bar Chart for SHAP explanation */}
            <FeatureImportanceChart explanation={explanation.slice(0, 5)} />
          </>
        )}

        {/* Privacy Notice */}
        <div className="text-center mt-12 text-sm font-quicksand text-foreground/60 italic max-w-lg mx-auto">
          Privacy Notice: Your data is processed securely and is not stored permanently. This tool is for educational purposes and should not replace professional medical consultation.
        </div>
      </div>
    </div>
  );
};

export default PCOSight;
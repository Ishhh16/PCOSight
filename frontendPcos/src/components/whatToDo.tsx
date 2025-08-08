import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bgImage from "@/assets/bg.jpeg";

const tips = [
  "Maintain a healthy weight through balanced diet and regular exercise.",
  "Limit intake of processed foods and sugar.",
  "Include more fiber-rich foods (vegetables, fruits, whole grains).",
  "Manage stress with yoga, meditation, or hobbies.",
  "Get regular sleep (7-8 hours per night).",
  "Consult a healthcare professional for personalized advice.",
  "Monitor menstrual cycles and symptoms.",
  "Avoid smoking and excessive alcohol.",
  "Take prescribed medications as directed.",
  "Stay hydrated and active."
];

const downloadPDF = () => {
  const content = [
    "PCOS Prevention & Caution Tips:\n", 
    ...tips.map((tip, i) => `${i + 1}. ${tip}`)
  ].join("\n");
  const blob = new Blob([content], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "PCOS_Tips.pdf";
  link.click();
};

const WhatToDo = () => (
  <div
    className="min-h-screen p-4 relative overflow-hidden"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60"></div>
    <div className="max-w-2xl mx-auto relative z-10">
      <Card className="backdrop-blur-md bg-glass-bg border-glass-border shadow-2xl shadow-glass-shadow/20 p-8 text-center mb-8">
        <h2 className="text-4xl font-playfair font-bold mb-4 text-primary">What to do now?</h2>
        <p className="text-lg font-quicksand text-foreground/80 mb-6">
          Don't worry! Here are some important tips and precautions for managing PCOS:
        </p>
        <ul className="text-left text-base font-quicksand text-foreground/80 mb-6 list-disc pl-6">
          {tips.map((tip, i) => (
            <li key={i} className="mb-2">{tip}</li>
          ))}
        </ul>
        <Button
          className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-700 text-white font-quicksand font-semibold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          onClick={downloadPDF}
        >
          Download as PDF
        </Button>
      </Card>
    </div>
  </div>
);

export default WhatToDo;

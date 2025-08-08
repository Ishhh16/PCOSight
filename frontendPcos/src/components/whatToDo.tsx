import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bgImage from "@/assets/bg.jpeg";

// ------------------- DATA -------------------
const tips = [
  `1. Get a proper diagnosis & regular check-ups
Go to a gynecologist or endocrinologist — don’t self-diagnose from TikTok.
Get hormone panels, blood sugar tests, ultrasound to confirm and track progress.`,

  `2. Lifestyle is the first “medicine”
Nutrition → Focus on whole foods, low-GI carbs, high fiber, lean protein, and healthy fats. Minimize sugary snacks & ultra-processed foods.
Movement → Strength training + cardio (3–5 days/week) to improve insulin sensitivity.
Sleep → 7–9 hrs of good quality sleep (bad sleep = hormone chaos).
Stress control → Meditation, journaling, or literally just taking a walk.`,

  `3. Medical management
Metformin (for insulin resistance) if your doctor recommends.
Hormonal birth control or other meds for regulating cycles, reducing acne, and controlling hair growth.
Supplements like inositol (myo- & D-chiro) can help, but only after medical advice.`,

  `4. Monitor long-term risks
Keep an eye on blood sugar, cholesterol, and weight trends.
Early management now = less chance of type 2 diabetes, heart problems, or infertility later.`,

  `💡 Key tip: PCOS doesn’t “go away,” but it can be controlled to the point where symptoms are barely noticeable — the earlier you act, the easier it is.`
];

const routine = [
  "🌅 Morning\nWake up & hydrate → 1 glass of warm water + pinch of lemon (boosts hydration & digestion).\n\nMovement snack → 10–15 mins of light stretching or a quick walk to get blood sugar moving.\n\nBalanced breakfast → High protein + healthy fat + low-GI carbs:\nExample: 2 boiled eggs + wholegrain toast + avocado\nOr: Greek yogurt + chia seeds + berries",

  "🕛 Midday\nLunch plate → Think half veggies, quarter protein, quarter carbs.\nExample: Grilled chicken/fish + quinoa + stir-fried veggies\nVeg options: Paneer/tofu + dal + salad\nAvoid sugar-loaded drinks — stick to water, green tea, or infused water.",

  "🕒 Afternoon reset\n10-min walk after meals (literally the easiest hack to lower post-meal blood sugar).\nSnack smart: Handful of nuts OR hummus + cucumber sticks OR roasted chickpeas.",

  "🌇 Evening\nWorkout (30–45 min, 4–5x/week) →\nStrength training (weights, resistance bands, or bodyweight) 3 days/week\nCardio (walking, cycling, dance, swimming) 2 days/week\nYoga/stretching for flexibility & stress relief.",

  "🌙 Night\nDinner → Lighter than lunch, but still balanced:\nExample: Lentil soup + sautéed veggies\nOr: Grilled fish + salad\nCut screen time 30 mins before bed.\nSleep 7–9 hrs — no excuses, hormones depend on it.",

  "📅 Weekly / Monthly add-ons\nTrack cycles (apps like Flo, Clue, or Glow).\nSchedule check-ups every 6–12 months (hormones, blood sugar, cholesterol).\nManage stress with journaling, meditation, or literally just going for a “mental health walk.”"
];


// ------------------- DOWNLOAD FUNCTIONS -------------------
const downloadPDF = (filename: string, contentArray: string[]) => {
  const content = `${filename}\n\n${contentArray.join("\n\n")}`;
  const blob = new Blob([content], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename.replace(/\s+/g, "_")}.pdf`;
  link.click();
};

// ------------------- COMPONENT -------------------
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
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60"></div>

    <div className="max-w-3xl mx-auto relative z-10 space-y-8">
      {/* ------------------- WHAT TO DO CARD ------------------- */}
      <Card className="backdrop-blur-md bg-glass-bg border-glass-border shadow-2xl shadow-glass-shadow/20 p-8 text-center">
        <h2 className="text-4xl font-playfair font-bold mb-4 text-primary">
          What to do now?
        </h2>
        <p className="text-lg font-quicksand text-foreground/80 mb-6">
          Don’t panic — here’s your friendly, actionable PCOS game plan:
        </p>
        <div className="text-left font-quicksand text-foreground/80 mb-6 space-y-4 whitespace-pre-line font-medium ">
          {tips.map((tip, i) => (
            <p key={i}>{tip}</p>
          ))}
        </div>
        <Button
          className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-700 text-white font-quicksand font-semibold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          onClick={() => downloadPDF("PCOS Prevention & Management Tips", tips)}
        >
          Download as PDF
        </Button>
      </Card>

      {/* ------------------- ROUTINE CARD ------------------- */}
      <Card className="backdrop-blur-md bg-glass-bg border-glass-border shadow-2xl shadow-glass-shadow/20 p-8 text-center">
        <h2 className="text-4xl font-playfair font-bold mb-4 text-primary">
          PCOS-Friendly Routine
        </h2>
        <p className="text-lg font-quicksand text-foreground/80 mb-6">
          A simple, daily plan to keep your hormones happy and energy balanced:
        </p>
        <ul className="text-left font-quicksand text-foreground/80 mb-6 space-y-2 list-disc pl-6 font-medium">
          {routine.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <Button
          className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-700 text-white font-quicksand font-semibold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          onClick={() => downloadPDF("PCOS-Friendly Routine", routine)}
        >
          Download as PDF
        </Button>
      </Card>
    </div>
  </div>
);

export default WhatToDo;

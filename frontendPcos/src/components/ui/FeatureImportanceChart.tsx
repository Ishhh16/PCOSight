import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { AiOutlineInfoCircle } from 'react-icons/ai';

// Chart.js setup
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Type for each feature explanation
interface FeatureContribution {
  feature: string;
  contribution: number;
}

// Props type
interface FeatureImportanceChartProps {
  explanation: FeatureContribution[];
}

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ explanation }) => {
  if (!explanation || explanation.length === 0) return null;

  // Always pad to 5 features
  const padded = [...explanation];
  while (padded.length < 5) {
    padded.push({ feature: `Feature ${padded.length + 1}`, contribution: 0 });
  }

  const data = {
    labels: padded.map(item => item.feature.split(/[<>]/)[0].trim()),
    datasets: [
      {
        label: 'Importance',
        data: padded.map(item => Math.abs(item.contribution)),
        backgroundColor: padded.map(item =>
          item.contribution > 0 ? 'rgba(220,38,38,0.7)' : 'rgba(34,197,94,0.7)'
        ),
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#000' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      x: {
        beginAtZero: true,
        ticks: { color: '#000' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const val = padded[context.dataIndex].contribution;
            return `${val > 0 ? 'Increases' : 'Reduces'} likelihood (${val})`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          gap: '0.5rem',
        }}
      >
        <h3
          style={{
            color: '#000',
            marginBottom: 0,
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Top 5 Feature Contributors
        </h3>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <AiOutlineInfoCircle
            style={{ color: '#2563eb', fontSize: '1.2rem', cursor: 'pointer' }}
          />
          <span
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '-0.5rem',
              zIndex: 10,
              width: '20rem',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#222',
              fontSize: '0.95rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e0e0e0',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s',
            }}
            className="feature-info-tooltip"
          >
            💡 The "contributors" are the features (like Age, Weight, AMH level, etc.) that pushed
            the prediction up or down the most — positively or negatively.
            <br />
            These values come from LIME — it assigns a "contribution score" to each feature.
          </span>
        </span>
      </div>
      <Bar data={data} options={options} />
      <style>{`
        .feature-info-tooltip:hover, .feature-info-tooltip:active, .feature-info-tooltip:focus {
          opacity: 1 !important;
        }
        .feature-info-tooltip {
          opacity: 0;
        }
        span:hover > .feature-info-tooltip {
          opacity: 1 !important;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default FeatureImportanceChart;

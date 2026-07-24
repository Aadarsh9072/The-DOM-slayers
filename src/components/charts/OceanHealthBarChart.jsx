import React, { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, useReducedMotion } from 'framer-motion';

const data = [
  { name: 'Pacific Basin', health: 85, color: '#1D9E75' },
  { name: 'Atlantic Basin', health: 72, color: '#3E6B72' },
  { name: 'Indian Ocean', health: 64, color: '#D85A30' },
  { name: 'Arctic Ocean', health: 91, color: '#1D9E75' },
  { name: 'Southern Ocean', health: 88, color: '#1D9E75' },
];

const CustomHorizontalBar = (props) => {
  const { x, y, width, height, fill, payload, value, index, shouldReduceMotion } = props;
  
  // Recharts vertical layout value is often an array [0, healthValue]
  const displayValue = payload?.health ?? (Array.isArray(value) ? value[1] : value);
  const delay = shouldReduceMotion ? 0 : index * 0.1;

  // Use explicit animate to ensure ResponsiveContainer resize triggers re-animation
  return (
    <g>
      <motion.rect
        x={x}
        y={y}
        height={height}
        fill={fill}
        rx={4}
        initial={{ width: shouldReduceMotion ? width : 0 }}
        animate={{ width }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
      />
      <motion.text
        x={x + width + 8}
        y={y + height / 2}
        dominantBaseline="central"
        fill="var(--text-secondary)"
        fontSize={11}
        fontWeight={600}
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.4 }}
      >
        {displayValue}
      </motion.text>
    </g>
  );
};

export default function OceanHealthBarChart() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  return (
    <motion.div 
      ref={containerRef}
      className="w-full bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
        }
      }}
    >
      <div className="mb-4">
        <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">Ocean Health by Region</h3>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Health index score (0–100) per monitored basin</p>
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="var(--text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="var(--text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--glass-border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '12px',
              }}
              formatter={(value) => [`${value}/100`, 'Health Index']}
            />
            <Bar
              dataKey="health"
              isAnimationActive={false}
              shape={(props) => <CustomHorizontalBar {...props} shouldReduceMotion={shouldReduceMotion} />}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.health > 80 ? '#1D9E75' : entry.health > 70 ? '#3E6B72' : '#D85A30'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

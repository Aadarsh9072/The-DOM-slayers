import React, { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const data = [
  { range: '< -0.5', sites: 4, color: '#1D9E75' },
  { range: '-0.5–0', sites: 12, color: '#3E6B72' },
  { range: '0–1', sites: 28, color: '#E8C547' },
  { range: '1–2', sites: 15, color: '#D85A30' },
  { range: '2+', sites: 6, color: '#D1452C' },
];

const CustomVerticalBar = (props) => {
  const { x, y, width, height, fill, index, shouldReduceMotion } = props;
  const delay = shouldReduceMotion ? 0 : index * 0.08;

  return (
    <motion.rect
      x={x}
      width={width}
      fill={fill}
      rx={4}
      initial={{ y: shouldReduceMotion ? y : y + height, height: shouldReduceMotion ? height : 0 }}
      animate={{ y, height }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    />
  );
};

export default function SSTAnomalyHistogram() {
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
        <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">SST Anomaly Distribution</h3>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Monitored reef sites by temperature anomaly range (°C)</p>
      </div>
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="range"
              stroke="var(--text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-secondary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
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
              formatter={(value) => [`${value} sites`, 'Reef Sites']}
            />
            <Bar
              dataKey="sites"
              isAnimationActive={false}
              shape={(props) => <CustomVerticalBar {...props} shouldReduceMotion={shouldReduceMotion} />}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

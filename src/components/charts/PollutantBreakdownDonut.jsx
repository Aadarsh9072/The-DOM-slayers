import React, { useRef, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

const data = [
  { name: 'Microplastics', value: 47, color: '#4A90D9' },
  { name: 'Ghost Nets', value: 28, color: '#1D9E75' },
  { name: 'Illegal Dumping', value: 25, color: '#D85A30' },
];
const total = data.reduce((sum, d) => sum + d.value, 0);

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = ((data[index].value / total) * 100).toFixed(0);

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {pct}%
    </text>
  );
};

export default function PollutantBreakdownDonut() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const controls = animate(0, total, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate: (val) => setDisplayTotal(Math.round(val)),
      });
      return controls.stop;
    } else if (isInView || shouldReduceMotion) {
      setDisplayTotal(total);
    }
  }, [isInView, shouldReduceMotion]);

  return (
    <motion.div 
      ref={containerRef}
      className="w-full h-full bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl p-5 flex flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-3">
        <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">Pollutant Breakdown</h3>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Detections this month</p>
      </div>
      <div className="flex-1 min-h-0 flex items-center relative">
        <div className="w-1/2 h-full min-h-[140px] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-2xl font-bold font-mono text-[var(--text-primary)] leading-none">{displayTotal}</span>
            <span className="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider">Total</span>
          </div>
          {isInView && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="85%"
                  dataKey="value"
                  labelLine={false}
                  label={CustomLabel}
                  strokeWidth={0}
                  isAnimationActive={!shouldReduceMotion}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--glass-border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-2 pl-2">
          {data.map((d, index) => (
            <motion.div 
              key={d.name} 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1, duration: 0.4 }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-[var(--text-secondary)] flex-1">{d.name}</span>
              <span className="text-xs font-bold text-[var(--text-primary)] font-mono">{d.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

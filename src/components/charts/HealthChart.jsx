import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import chartData from '../../data/chart-data.json';
import InfoTooltip from '../common/InfoTooltip';

export default function HealthChart() {
  return (
    <div className="w-full h-full p-6 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-sans font-bold text-[var(--text-primary)] flex items-center">
          Global Ocean Health vs Pollution
          <InfoTooltip term="Global Ocean Health vs Pollution" />
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">Six month trailing average index.</p>
      </div>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData.healthTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3E6B72" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3E6B72" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPollution" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B5674F" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#B5674F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--surface-card)', 
                borderColor: 'var(--glass-border)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-card)',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ fontSize: '14px' }}
            />
            <Area type="monotone" dataKey="healthIndex" stroke="#3E6B72" fillOpacity={1} fill="url(#colorHealth)" name="Health Index" strokeWidth={2} isAnimationActive={true} animationDuration={700} animationEasing="ease-out" />
            <Area type="monotone" dataKey="pollutionLevel" stroke="#B5674F" fillOpacity={1} fill="url(#colorPollution)" name="Pollution (k tons)" strokeWidth={2} isAnimationActive={true} animationDuration={700} animationEasing="ease-out" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

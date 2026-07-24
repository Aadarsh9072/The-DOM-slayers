import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import overviewData from '../data/overview.json';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/map/InteractiveMap';
import HealthChart from '../components/charts/HealthChart';
import AlertsFeed from '../components/charts/AlertsFeed';
import AlertSeverityDonut from '../components/charts/AlertSeverityDonut';
import OceanHealthBarChart from '../components/charts/OceanHealthBarChart';
import LiveMapPage from './LiveMapPage';
import SpeciesTrackerPage from './SpeciesTrackerPage';
import PollutionMonitorPage from './PollutionMonitorPage';
import CoralHealthPage from './CoralHealthPage';
import RiskForecastPage from './RiskForecastPage';
import DroneSensorFeedPage from './DroneSensorFeedPage';

import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import OceanRegionsSection from '../components/dashboard/OceanRegionsSection';
import SensorActivityPanel from '../components/dashboard/SensorActivityPanel';
import InsightsPanel from '../components/dashboard/InsightsPanel';
import SummarySection from '../components/dashboard/SummarySection';
import DroneTelemetry from '../components/dashboard/DroneTelemetry';

export default function DashboardOverview() {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setKpis(overviewData.kpis);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col gap-24 pb-24">
      <section id="overview" className="max-w-6xl mx-auto w-full pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-sans font-bold tracking-tight text-[var(--text-primary)]">Overview</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">High-level telemetry and marine health metrics.</p>
      </div>

      {kpis.length === 0 ? (
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 h-32 bg-[var(--surface-card)] rounded-xl animate-pulse border border-[var(--glass-border)]" />
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {kpis.map((kpi, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <StatCard {...kpi} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Map and Charts Area */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:min-h-[500px]">
        <div className="lg:col-span-2 relative z-0 min-h-[300px] lg:min-h-0">
          <InteractiveMap />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[240px]">
            <HealthChart />
          </div>
          <div className="flex-1 min-h-[240px]">
            <AlertsFeed />
          </div>
        </div>
      </div>

      {/* Alert Severity Donut beside alerts */}
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="min-h-[220px]">
          <AlertSeverityDonut />
        </div>
        <div className="min-h-[220px]">
          <OceanHealthBarChart />
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <ActivityTimeline />
        <SensorActivityPanel />
      </div>

      <div className="mt-8">
        <OceanRegionsSection />
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <InsightsPanel />
        <div className="h-full">
           {/* Placeholder if we want another panel here, otherwise Insights takes half. Actually let's just make it grid */}
        </div>
      </div>

      <div className="mt-8">
        <SummarySection />
      </div>

      </section>

      <section id="live-map" className="w-full border-t border-[var(--glass-border)] pt-8 scroll-mt-24">
        <LiveMapPage />
      </section>
      
      <section id="species" className="w-full border-t border-[var(--glass-border)] pt-8 scroll-mt-24">
        <SpeciesTrackerPage />
      </section>
      
      <section id="pollution" className="w-full border-t border-[var(--glass-border)] pt-8 scroll-mt-24">
        <PollutionMonitorPage />
      </section>
      
      <section id="coral" className="w-full border-t border-[var(--glass-border)] pt-8 scroll-mt-24">
        <CoralHealthPage />
      </section>
      
      <section id="risk" className="w-full border-t border-[var(--glass-border)] pt-8 scroll-mt-24">
        <RiskForecastPage />
      </section>
      
      <section id="drone-feeds" className="w-full border-t border-[var(--glass-border)] pt-8 scroll-mt-24">
        <DroneSensorFeedPage />
        <DroneTelemetry />
      </section>

    </div>
  );
}

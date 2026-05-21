import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import './comp_css/tripGroup_DonutChart.css';

// TRUTH LIST
import { TRIP_GROUPS, STATUS_COLORS } from '../truth.config';
import { loadDemoDonutTotals } from '../utils/demoTripChartData';

/* --- DonutChart Sub-component remains the same --- */
const DonutChart = ({ total, segments, isLoading }: { total: number; segments: { value: number; color: string }[]; isLoading?: boolean }) => {
  let cumulativePercent = 0;
  return (
    <div className={`donut-container ${isLoading ? 'is-loading' : ''}`}>
      <svg viewBox="0 0 36 36" className="donut-svg">
        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#f1f5f9" strokeWidth="3.2" />
        {segments.map((seg, i) => {
          const percent = total > 0 ? (seg.value / total) * 100 : 0;
          const offset = 100 - cumulativePercent;
          cumulativePercent += percent;
          return (
            <circle
              key={i} cx="18" cy="18" r="15.9" fill="transparent" 
              stroke={isLoading ? '#e2e8f0' : seg.color} 
              strokeWidth="3.8"
              strokeDasharray={`${percent} ${100 - percent}`} 
              strokeDashoffset={offset}
              transform="rotate(-90 18 18)"
              style={{ transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          );
        })}
      </svg>
      <div className="donut-text">
        {isLoading ? (
          <Loader2 className="animate-spin opacity-20" size={20} />
        ) : (
          <>
            <span className="total-num">{total}</span>
            <span className="total-label">Orders</span>
          </>
        )}
      </div>
    </div>
  );
};

interface GridProps {
  BU: string | null | undefined;
  fromStr: string;
  toStr: string;
  orientation?: 'horizontal' | 'vertical';
  onChartClick?: (data: { 
    tripgroup: string; 
    tripgroup_total: number; 
    tripprogress: string | null; 
    tripprogress_count: number | null 
  }) => void;
}

const TripGroup_DonutChart: React.FC<GridProps> = ({ BU, fromStr, toStr, onChartClick, orientation = 'horizontal' }) => {
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const demoTotals = await loadDemoDonutTotals(BU, fromStr, toStr);
      setTotals(demoTotals);
    } catch (error) {
      console.error("Failed to fetch donut stats:", error);
      setTotals({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromStr && toStr) {
      fetchStats();
    }
  }, [BU, fromStr, toStr]);

  const tripGroups = TRIP_GROUPS;

  return (
    <div className={`grid-container-relative`}>
      {loading && (
        <div className="grid-loader-wrapper">
          <div className="grid-loader-card">
            <Loader2 className="animate-spin" size={20} />
            <span>Generating demo chart data...</span>
          </div>
        </div>
      )}

      <div className={`matrix-grid ${loading ? 'grid-blur' : ''} grid-${orientation}`}>
        {tripGroups.map((group) => {
          const stats = {
            assigned: Number(totals[`Assigned_${group.id}`] || 0),
            src: Number(totals[`DispSrc_${group.id}`] || 0),
            dst: Number(totals[`DispDst_${group.id}`] || 0),
            done: Number(totals[`Done_${group.id}`] || 0),
          };
          
          const total = stats.assigned + stats.src + stats.dst + stats.done;

          const handleClick = (progress: string | null, count: number | null) => {
            if (onChartClick) {
              onChartClick({
                tripgroup: group.id,
                tripgroup_total: total,
                tripprogress: progress,
                tripprogress_count: count
              });
            }
          };

          return (
            <div key={group.id} className="analytic-card">
              <div className="card-sidebar">
                <div className="card-stat card-stat clickable" onClick={() => handleClick("Assigned", stats.assigned)}>
                  <span><span className="dot" style={{ backgroundColor: STATUS_COLORS.assigned }}></span>Assigned</span> 
                  <b>{stats.assigned}</b>
                </div>
                <div className="card-stat card-stat clickable" onClick={() => handleClick("Dispatched To Source", stats.src)}>
                  <span><span className="dot"  style={{ backgroundColor: STATUS_COLORS.source }}></span>To Source</span> 
                  <b>{stats.src}</b>
                </div>
                <div className="card-stat card-stat clickable" onClick={() => handleClick("Dispatched To Destination", stats.dst)}>
                  <span><span className="dot"  style={{ backgroundColor: STATUS_COLORS.destination }}></span>To Dest</span> 
                  <b>{stats.dst}</b>
                </div>
                <div className="card-stat card-stat clickable" onClick={() => handleClick("Done", stats.done)}>
                  <span><span className="dot"  style={{ backgroundColor: STATUS_COLORS.done }}></span>Done</span> 
                  <b>{stats.done}</b>
                </div>
              </div>
              <div className="card-content clickable" onClick={() => handleClick(null, null)}>
                <DonutChart 
                  isLoading={loading} 
                  total={total} 
                  segments={[
                    { value: stats.assigned, color: STATUS_COLORS.assigned },
                    { value: stats.src, color: STATUS_COLORS.source },
                    { value: stats.dst, color: STATUS_COLORS.destination },
                    { value: stats.done, color: STATUS_COLORS.done }
                  ]} 
                />
                <h3>{group.label}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripGroup_DonutChart;
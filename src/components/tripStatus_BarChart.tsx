import React, { useState, useEffect } from 'react';
import { Filter, Eye, EyeOff  } from 'lucide-react';
import { TRIP_STATUSES } from '../truth.config';
import './comp_css/tripStatus_BarChart.css';
import { loadDemoBarTotals } from '../utils/demoTripChartData';

interface BarChartProps {
  BU: string | null | undefined;
  fromStr: string;
  toStr: string;
  onBarClick?: (data: { status: string; count: number }) => void;
}

const getBarColor = (index: number) => {
  const colors = [
    '#000080', '#f59e0b', '#10b981', '#3a4efc', '#f43f5e', 
    '#8b5cf6', '#fbbf24', '#334155', '#0ea5e9', '#b91c1c', 
    '#065f46', '#a78bfa', '#ea580c', '#60a5fa', '#d946ef', 
    '#06b6d4', '#7f1d1d', '#84cc16', '#4338ca', '#64748b'
  ];
  return colors[index % colors.length] || '#000080';
};

const TripStatus_BarChart: React.FC<BarChartProps> = ({ BU, fromStr, toStr, onBarClick }) => {
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showAllCounts, setShowAllCounts] = useState<boolean>(true);
  
  // Initialize visibility state: Hide "Served" by default
  const [visibleStatuses, setVisibleStatuses] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TRIP_STATUSES.forEach(s => {
        // "Show if it's NOT Served AND it's NOT AssignedTrips"
        initial[s.Status] = s.Status !== "Served" && s.Status !== "AssignedTrips";
    });
    return initial;
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const demoTotals = await loadDemoBarTotals(BU, fromStr, toStr);
      setTotals(demoTotals);
    } catch (error) {
      console.error("Failed to fetch bar stats:", error);
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

  const toggleStatus = (status: string) => {
    setVisibleStatuses(prev => ({ ...prev, [status]: !prev[status] }));
  };

  // Recalculate maxVal based ONLY on visible statuses so the chart rescales
  const visibleTotals = TRIP_STATUSES
    .filter(s => visibleStatuses[s.Status])
    .map(s => totals[s.Status] || 0);

  const rawMax = Math.max(...visibleTotals, 10);
    
  const maxVal = rawMax * 1.10;

  return (
    <div className={`status-bar-container ${showFilters ? 'is-scrollable' : 'is-fixed'}`}>
      {loading && (
        <div className="grid-loader-wrapper">
          <div className="grid-loader-card">
            <Eye size={18} />
            <span>Loading demo bar data...</span>
          </div>
        </div>
      )}

      {/* Live Indicator Header */}
      <div className="chart-header-row">
        <div className="live-indicator">
          <span className="ping"></span>
          <span className="live-text">Live Data</span>
        </div>
      </div>
      
      {/* Horizontal Filter Controls */}
      <div className={`filter-section-wrapper ${showFilters ? 'is-open' : 'is-closed'}`}>
        <div className="filter-controls-horizontal">
          {/* New Toggle for Counts inside the filter row */}
          <div className="count-toggle-area">
             <button 
                className={`toggle-minimal ${showAllCounts ? 'active' : ''}`}
                onClick={() => setShowAllCounts(!showAllCounts)}
                title="Toggle Permanent Counts"
             >
               {showAllCounts ? <Eye size={14} /> : <EyeOff size={14} />}
               <span>{showAllCounts ? "Hide Labels" : "Show Labels"}</span>
             </button>
          </div>

          <div className="checkbox-group">
            {TRIP_STATUSES.map((s, idx) => (
              <label key={`filter-${idx}`} className={`filter-chip ${visibleStatuses[s.Status] ? 'active' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={visibleStatuses[s.Status]} 
                  onChange={() => toggleStatus(s.Status)}
                  className="hidden-checkbox"
                />
                <span className="chip-dot" style={{ backgroundColor: getBarColor(idx) }}></span>
                {s.Alias || s.Status}
              </label>
            ))}
          </div>

          <div className="filter-toggle-btn" onClick={() => setShowFilters(false)}>
            <Filter size={14} className="text-navy-900" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Close</span>
          </div>
        </div>
      </div>

      {/* Floating Buttons when filters are hidden */}
      {!showFilters && (
        <div className="floating-controls-right">
          <button 
            className={`expand-filter-pill ${showAllCounts ? 'active-blue' : ''}`} 
            onClick={() => setShowAllCounts(!showAllCounts)}
          >
            {showAllCounts ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button className="expand-filter-pill" onClick={() => setShowFilters(true)}>
            <Filter size={10} /> Filters
          </button>
        </div>
      )}

      <div className={`bar-grid ${loading ? 'grid-blur' : ''}`}>
        {TRIP_STATUSES.map((statusItem, index) => {
          if (!visibleStatuses[statusItem.Status]) return null;
          

          const count = totals[statusItem.Status] || 0;
          const barHeight = (count / maxVal) * 100;

          return (
            <div 
                key={`${statusItem.Status}-${index}`} 
                className="bar-column group"
                onClick={() => {
                  if (onBarClick) {
                    onBarClick({ status: statusItem.Status, count: count });
                  }
                }}
              >
              <div className="bar-track">
                <div 
                  className="bar-fill" 
                  style={{ 
                    height: `${barHeight}%`,
                    backgroundColor: count > 0 ? getBarColor(index) : '#f1f5f9',
                  }}
                >
                  {count > 0 && (
                    <span className={`bar-tooltip ${showAllCounts ? 'is-permanent' : ''}`}>
                      {count}
                    </span>
                  )}
                </div>
              </div>
              <span className="bar-label">{statusItem.Alias ? statusItem.Alias : statusItem.Status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripStatus_BarChart;
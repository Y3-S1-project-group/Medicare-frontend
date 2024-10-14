import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

// Configuration constants
const CONFIG = {
  DEFAULT_TIMEFRAME: 'daily',
  TIMEFRAMES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  CHART_MARGINS: { top: 10, right: 30, left: 0, bottom: 0 },
  LABELS: {
    DATE: { value: 'Date', position: 'insideBottomRight', offset: -10 },
    APPOINTMENTS: { value: 'Number of Appointments', angle: -90, position: 'insideLeft' },
    TIME_PERIOD: { value: 'Time Period', position: 'insideBottomRight', offset: -10 },
    VISITS: { value: 'Number of Visits', angle: -90, position: 'insideLeft' },
  },
};

// Simple logger implementation
const logger = {
  error: (message) => console.error(`[ERROR] ${message}`),
  warn: (message) => console.warn(`[WARN] ${message}`),
  info: (message) => console.info(`[INFO] ${message}`),
};

/**
 * Formats a date string to YYYY-MM-DD format.
 * @param {string} dateString - The input date string.
 * @returns {string} The formatted date string.
 */
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    logger.error(`Error formatting date: ${error.message}`);
    return '';
  }
};

/**
 * Main component for rendering combined hospital charts.
 * @param {Object} props - The component props.
 */
const CombinedHospitalCharts = ({ chartData, report }) => {
  const [timeframe, setTimeframe] = useState(CONFIG.DEFAULT_TIMEFRAME);
  const [selectedDate, setSelectedDate] = useState('');

  const dateOptions = useMemo(() => {
    try {
      return [...new Set(report.map(item => formatDate(item.date)))].sort();
    } catch (error) {
      logger.error(`Error creating date options: ${error.message}`);
      return [];
    }
  }, [report]);

  useEffect(() => {
    if (dateOptions.length > 0) {
      setSelectedDate(dateOptions[dateOptions.length - 1]);
    }
  }, [dateOptions]);

  const filterDataByDate = (data) => {
    return data.filter(item => formatDate(item.date) === selectedDate);
  };

  const aggregatePeakTimesData = () => {
    try {
      const filteredData = filterDataByDate(report);
      const aggregated = filteredData.reduce((acc, curr) => {
        const time = curr.time.split(':')[0];
        const key = getTimeframePeriod(curr, time);
        
        if (!acc[key]) acc[key] = { period: key, visits: 0 };
        acc[key].visits += 1;
        return acc;
      }, {});

      return Object.values(aggregated).sort((a, b) => a.period.localeCompare(b.period));
    } catch (error) {
      logger.error(`Error aggregating peak times data: ${error.message}`);
      return [];
    }
  };

  const getTimeframePeriod = (curr, time) => {
    switch (timeframe) {
      case CONFIG.TIMEFRAMES.DAILY:
        return `${time}:00`;
      case CONFIG.TIMEFRAMES.WEEKLY:
        return `Week ${Math.floor(new Date(curr.date).getDate() / 7) + 1}`;
      case CONFIG.TIMEFRAMES.MONTHLY:
        return new Date(curr.date).toLocaleString('default', { month: 'long' });
      default:
        logger.warn(`Unknown timeframe: ${timeframe}`);
        return '';
    }
  };

  const getPeakTimeDescription = (data) => {
    if (data.length === 0) return "No data available";
    const maxVisits = Math.max(...data.map(d => d.visits));
    const peakPeriods = data.filter(d => d.visits === maxVisits).map(d => d.period);
    return `Peak time${peakPeriods.length > 1 ? 's' : ''}: ${peakPeriods.join(', ')} with ${maxVisits} visits`;
  };

  const peakTimesData = useMemo(() => aggregatePeakTimesData(), [report, selectedDate, timeframe]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg rounded-lg p-8 mb-8 w-[95%] lg:w-[98%]">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">Hospital Visit Analytics</h2>
      
      <div className="space-y-8">
        <AppointmentsChart chartData={chartData} />
        <PeakVisitTimesChart 
          peakTimesData={peakTimesData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dateOptions={dateOptions}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          getPeakTimeDescription={getPeakTimeDescription}
        />
      </div>
    </div>
  );
};

CombinedHospitalCharts.propTypes = {
  chartData: PropTypes.array.isRequired,
  report: PropTypes.array.isRequired,
};

const AppointmentsChart = ({ chartData }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-2xl font-semibold mb-4 flex items-center text-indigo-700">
      <Calendar className="mr-2" />
      Appointments per Day
    </h3>
    <div className="w-full" style={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={CONFIG.CHART_MARGINS}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" label={CONFIG.LABELS.DATE} />
          <YAxis label={CONFIG.LABELS.APPOINTMENTS} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="appointments" stroke="#8884d8" fill="url(#colorAppointments)" name="Appointments" />
          <defs>
            <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

AppointmentsChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};

const PeakVisitTimesChart = ({ peakTimesData, selectedDate, setSelectedDate, dateOptions, timeframe, setTimeframe, getPeakTimeDescription }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-2xl font-semibold mb-4 flex items-center text-indigo-700">
      <Clock className="mr-2" />
      Peak Visit Times
    </h3>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-sm text-gray-600">{getPeakTimeDescription(peakTimesData)}</h1>
      <div className="flex items-center space-x-2">
        <select 
          className="border rounded px-2 py-1"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateOptions.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <select 
          className="bg-indigo-100 border border-indigo-300 text-indigo-700 py-1 px-2 rounded-md"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          {Object.values(CONFIG.TIMEFRAMES).map(tf => (
            <option key={tf} value={tf}>{tf.charAt(0).toUpperCase() + tf.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="w-full" style={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={peakTimesData} margin={CONFIG.CHART_MARGINS}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="period"
            label={CONFIG.LABELS.TIME_PERIOD}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis label={CONFIG.LABELS.VISITS} />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="url(#colorVisits)" name="Visits" />
          <defs>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

PeakVisitTimesChart.propTypes = {
  peakTimesData: PropTypes.array.isRequired,
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  dateOptions: PropTypes.array.isRequired,
  timeframe: PropTypes.string.isRequired,
  setTimeframe: PropTypes.func.isRequired,
  getPeakTimeDescription: PropTypes.func.isRequired,
};

export default CombinedHospitalCharts;
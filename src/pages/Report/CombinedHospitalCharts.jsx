import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, Calendar } from 'lucide-react';

const CombinedHospitalCharts = ({ chartData, report }) => {
  const [timeframe, setTimeframe] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('');
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
    const dates = [...new Set(report.map(item => formatDate(item.date)))].sort();
    setDateOptions(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[dates.length - 1]); // Set the most recent date as default
    }
  }, [report]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const filterDataByDate = (data) => {
    return data.filter(item => formatDate(item.date) === selectedDate);
  };

  const aggregatePeakTimesData = () => {
    const filteredData = filterDataByDate(report);
    const aggregated = filteredData.reduce((acc, curr) => {
      const time = curr.time.split(':')[0]; // Extract hour
      const key = timeframe === 'daily' ? `${time}:00` 
                : timeframe === 'weekly' ? `Week ${Math.floor(new Date(curr.date).getDate() / 7) + 1}`
                : new Date(curr.date).toLocaleString('default', { month: 'long' });
      
      if (!acc[key]) acc[key] = { period: key, visits: 0 };
      acc[key].visits += 1;
      return acc;
    }, {});

    return Object.values(aggregated).sort((a, b) => a.period.localeCompare(b.period));
  };

  const getPeakTimeDescription = (data) => {
    if (data.length === 0) return "No data available";
    const maxVisits = Math.max(...data.map(d => d.visits));
    const peakPeriods = data.filter(d => d.visits === maxVisits).map(d => d.period);
    return `Peak time${peakPeriods.length > 1 ? 's' : ''}: ${peakPeriods.join(', ')} with ${maxVisits} visits`;
  };

  const peakTimesData = aggregatePeakTimesData();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg rounded-lg p-8 mb-8 w-[95%] lg:w-[98%]">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">Hospital Visit Analytics</h2>
      
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4 flex items-center text-indigo-700">
            <Calendar className="mr-2" />
            Appointments per Day
          </h3>
          <div className="w-full" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }} />
                <YAxis label={{ value: 'Number of Appointments', angle: -90, position: 'insideLeft' }} />
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
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="w-full" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakTimesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="period"
                  label={{ value: 'Time Period', position: 'insideBottomRight', offset: -10 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis label={{ value: 'Number of Visits', angle: -90, position: 'insideLeft' }} />
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
      </div>
    </div>
  );
};

export default CombinedHospitalCharts;
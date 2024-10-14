import React, { useState, useEffect } from "react";
import SideNavBar from '../../components/SideNavBar/SideNavBar';
import CombinedHospitalCharts from './CombinedHospitalCharts';
import { ChevronDown, ChevronUp, Calendar, User, Mail, Stethoscope, Clock } from "lucide-react";

const Report = () => {
    const [report, setReport] = useState([]);
    const [filteredReport, setFilteredReport] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [peakTimesData, setPeakTimesData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/report');
                if (!response.ok) {
                    throw new Error('HTTP Error! Status: ' + response.status);
                }
                const data = await response.json();
                setReport(data);
                filterReportByDate(data, selectedDate);
                processChartData(data);
                processPeakTimesData(data);
            } catch (error) {
                console.error("Fetching error:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filterReportByDate = (data, date) => {
        const filtered = data.filter(item => 
            new Date(item.date).toISOString().split('T')[0] === date
        );
        setFilteredReport(filtered);
    };

    const handleDateSelect = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        filterReportByDate(report, newDate);
    };

    const processChartData = (data) => {
        const appointmentCounts = {};
        data.forEach(item => {
            const date = new Date(item.date).toLocaleDateString();
            appointmentCounts[date] = (appointmentCounts[date] || 0) + 1;
        });
        const chartData = Object.entries(appointmentCounts).map(([date, count]) => ({
            date,
            appointments: count
        }));
        chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setChartData(chartData);
    };

    const processPeakTimesData = (data) => {
        const hourCounts = {};
        data.forEach(item => {
            const hour = item.time.split(':')[0];
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });
        const peakTimes = Object.entries(hourCounts).map(([hour, count]) => ({
            hour: `${hour}:00`,
            visits: count
        }));
        peakTimes.sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
        setPeakTimesData(peakTimes);
    };

    const getPeakTimeDescription = () => {
        if (peakTimesData.length === 0) return "No data available";
        const maxVisits = Math.max(...peakTimesData.map(d => d.visits));
        const peakHours = peakTimesData.filter(d => d.visits === maxVisits).map(d => d.hour);
        return `Peak time${peakHours.length > 1 ? 's' : ''}: ${peakHours.join(', ')} with ${maxVisits} visits`;
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'Active': 'bg-green-500',
            'Onboarding': 'bg-yellow-500',
            'Inactive': 'bg-red-500',
            'Pending': 'bg-blue-500',
        };
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-500'} text-white`}>
                {status}
            </span>
        );
    };

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredReport].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setFilteredReport(sortedData);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
        }
        return null;
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <SideNavBar />
            <div className="flex-1 p-10">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <CombinedHospitalCharts chartData={chartData} report={report} />
                        <br/>
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Appointments</h2>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                                <Calendar className="mr-2 text-blue-500" />
                                Select Date
                            </h3>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    value={selectedDate} 
                                    onChange={handleDateSelect}
                                    className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Current Appointments</h3>
                            {filteredReport.length === 0 ? (
                                <p className="text-gray-500 italic text-center py-4">No appointments for the selected date.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                {['Patient', 'Status', 'Email', 'Doctor', 'Time'].map((header) => (
                                                    <th 
                                                        key={header}
                                                        className="px-5 py-3 cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
                                                        onClick={() => sortData(header.toLowerCase())}
                                                    >
                                                        <div className="flex items-center">
                                                            {header}
                                                            {getSortIcon(header.toLowerCase())}
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm">
                                            {filteredReport.map((item, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <User className="h-5 w-5 text-gray-400 mr-3" />
                                                            <div className="text-sm font-medium text-gray-900">{item.fullName}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        {getStatusBadge(item.status || 'Active')}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                                            <div className="text-sm text-gray-500">{item.email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Stethoscope className="h-5 w-5 text-gray-400 mr-3" />
                                                            <div className="text-sm text-gray-900">{item.doctor}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Clock className="h-5 w-5 text-gray-400 mr-3" />
                                                            <div className="text-sm text-gray-500">{item.time}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Report;
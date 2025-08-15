"use client";
import { useState, useEffect } from 'react';
import { Bar, Line, Pie, Scatter, Bubble, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  TimeScale,
  Filler,
  TimeSeriesScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { interpolateRdYlGn } from 'd3-scale-chromatic';
import type { ChartOptions } from 'chart.js';
import type { Scale, CoreScaleOptions, TooltipItem } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  TimeScale,
  Filler
);

// Types for our data
type DepartmentData = {
  department: string;
  headcount: number;
  fte: number;
  vacancies: number;
  attrition: string;
};

type ChartData = {
  line: any;
  pie: any;
  bar: any;
  table: DepartmentData[];
};

export default function HealthSystemDashboard() {
  // Dropdown states
  const [location, setLocation] = useState('north-dakota');
  const [provider, setProvider] = useState('health-care-advis');
  const [timeRange, setTimeRange] = useState('7-days');
  const [chartData, setChartData] = useState<ChartData>({
    line: null,
    pie: null,
    bar: null,
    table: []
  });

  // Metrics data
  const metrics = [
    { name: 'Filled Headcount', value: '333', change: '+5%', trend: 'up' },
    { name: 'Filled Position', value: '245', change: '-2%', trend: 'down' },
    { name: 'Filled FTE', value: '298', change: '+3%', trend: 'up' },
    { name: 'Attrition Rate', value: '8.5%', change: '-1.2%', trend: 'down' },
    { name: 'Recruitment Rate', value: '12.3%', change: '+2.1%', trend: 'up' },
    { name: 'Vacancy Rate', value: '15.7%', change: '-0.5%', trend: 'down' },
  ];

  // Generate dynamic data based on filters
  const generateData = () => {
    // Generate departments - this would come from API in real app
    const departments = ['Nursing', 'ER', 'Surgery', 'Pediatrics', 'ICU', 'Cardiology', 'Oncology'];
    
    // Generate table data
    const tableData = departments.map(dept => {
      const base = location === 'north-dakota' ? 30 : 20;
      const headcount = base + Math.floor(Math.random() * 50);
      const fte = Math.floor(headcount * 0.9);
      const vacancies = Math.floor(headcount * 0.1);
      const attrition = `${Math.floor(5 + Math.random() * 8)}%`;
      
      return {
        department: dept,
        headcount,
        fte,
        vacancies,
        attrition
      };
    });

    // Generate pie chart data
    const pieData = {
      labels: ['Nurses', 'Doctors', 'Admin', 'Technicians', 'Other'],
      datasets: [{
        data: [
          Math.floor(40 + Math.random() * 20),
          Math.floor(15 + Math.random() * 10),
          Math.floor(10 + Math.random() * 10),
          Math.floor(8 + Math.random() * 8),
          Math.floor(5 + Math.random() * 5)
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      }]
    };

    // Generate bar chart data from table data
    const topDepartments = [...tableData].sort((a, b) => b.headcount - a.headcount).slice(0, 5);
    const barData = {
      labels: topDepartments.map(d => d.department),
      datasets: [
        {
          label: 'Current Staff',
          data: topDepartments.map(d => d.headcount),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
        },
        {
          label: 'Vacancies',
          data: topDepartments.map(d => d.vacancies),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
        }
      ]
    };

    // Generate time series data for line chart
    const now = new Date();
    const timeSeriesData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - (11 - i));
      return {
        date,
        headcount: 300 + Math.floor(Math.random() * 50),
        fte: 250 + Math.floor(Math.random() * 50)
      };
    });

    const lineData = {
      labels: timeSeriesData.map(item => item.date.toLocaleDateString('en-US', { month: 'short' })),
      datasets: [
        {
          label: 'Headcount',
          data: timeSeriesData.map(item => item.headcount),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        },
        {
          label: 'FTE',
          data: timeSeriesData.map(item => item.fte),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }
      ]
    };

    setChartData({
      line: lineData,
      pie: pieData,
      bar: barData,
      table: tableData
    });
  };

  // Update data when filters change
  useEffect(() => {
    generateData();
  }, [location, provider, timeRange]);

  // Heatmap, radar, and bubble chart data (unchanged)
  const heatmapData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: Array.from({ length: 24 }, (_, hour) => ({
      label: `${hour}:00`,
      data: Array.from({ length: 7 }, (_, day) => ({
        x: day,
        y: hour,
        v: Math.floor(Math.random() * 100) + 50,
      })),
      backgroundColor: (ctx: any) => {
        const value = ctx.raw.v;
        const normalized = (value - 50) / 100;
        return interpolateRdYlGn(1 - normalized);
      },
    })),
  };

  const radarChartData = {
    labels: ['Staffing', 'Satisfaction', 'Efficiency', 'Cost', 'Quality', 'Safety'],
    datasets: [
      {
        label: 'Nursing',
        data: [90, 85, 80, 70, 95, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
      {
        label: 'ER',
        data: [75, 70, 85, 65, 80, 82],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
      {
        label: 'ICU',
        data: [85, 75, 75, 80, 90, 85],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
      },
    ],
    
  };

  const bubbleChartData = {
    datasets: chartData.table.map((dept, i) => ({
      label: dept.department,
      data: [{
        x: Math.floor(Math.random() * 10) + 1,
        y: 100 - parseInt(dept.attrition),
        r: dept.headcount / 5,
      }],
      backgroundColor: [
        `rgba(${59 + i * 30}, ${130 - i * 20}, ${246 - i * 40}, 0.7)`,
      ],
      borderColor: [
        `rgba(${59 + i * 30}, ${130 - i * 20}, ${246 - i * 40}, 1)`,
      ],
      borderWidth: 1,
    })),
  };

  // Chart options (unchanged)
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Headcount & FTE Trends (Last 12 Months)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Staff Distribution by Category',
      },
    },
    maintainAspectRatio: false,
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Department Staffing Overview',
      },
    },
    maintainAspectRatio: false,
  };

  const heatmapOptions: ChartOptions<'scatter'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Staff Distribution Heatmap',
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'scatter'>) => {
            return `${ctx.dataset.label}: ${ctx.parsed.y} staff`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Day of Week',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Hour of Day',
        },
        reverse: true,
        ticks: {
          stepSize: 1,
          callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number) {
            const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
            return `${value}:00`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const radarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Department Performance Metrics',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
    maintainAspectRatio: false,
  };

  const bubbleChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Staff Experience vs Retention by Department',
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const dept = ctx.dataset.label;
            return `${dept}: ${ctx.raw.y}% retention, ${ctx.raw.x} yrs experience`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Average Experience (years)',
        },
        min: 0,
        max: 12,
      },
      y: {
        title: {
          display: true,
          text: 'Retention Rate (%)',
        },
        min: 80,
        max: 100,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-auto container mx-auto px-4 py-8">
      <div>
         {/* Header */}
         <div className="mb-8">
           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Healthcare Workforce Analytics Dashboard</h1>

           {/* Dropdown Filters */}
           <div className="flex flex-col md:flex-row gap-4 mt-4">
             <div className="w-full md:w-44 text-black">
               <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                 Location
               </label>
               <Select value={location} onValueChange={setLocation}>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select location" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="north-dakota">North Dakota</SelectItem>
                   <SelectItem value="south-dakota">South Dakota</SelectItem>
                   <SelectItem value="minnesota">Minnesota</SelectItem>
                   <SelectItem value="montana">Montana</SelectItem>
                 </SelectContent>
               </Select>
             </div>

             <div className="w-full md:w-52 text-black">
               <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                 Provider
               </label>
               <Select value={provider} onValueChange={setProvider}>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select provider" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="health-care-advis">Health Care Advis</SelectItem>
                   <SelectItem value="medical-solutions">Medical Solutions</SelectItem>
                   <SelectItem value="nursing-professionals">Nursing Professionals</SelectItem>
                   <SelectItem value="staffing-plus">Staffing Plus</SelectItem>
                 </SelectContent>
               </Select>
             </div>

             <div className="w-full md:w-52 text-black">
               <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
                 Time Range
               </label>
               <Select value={timeRange} onValueChange={setTimeRange}>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select time range" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="7-days">Last 7 Days</SelectItem>
                   <SelectItem value="30-days">Last 30 Days</SelectItem>
                   <SelectItem value="3-months">Last 3 Months</SelectItem>
                   <SelectItem value="12-months">Last 12 Months</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
         </div>
        
        

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <div className={`flex items-center text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                  {metric.trend === 'up' ? (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-80">
              {chartData.line && <Line data={chartData.line} options={lineChartOptions} />}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-80">
              <Radar data={radarChartData} options={radarChartOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Heatmap */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <div className="h-80">
              <Scatter 
                data={heatmapData} 
                options={heatmapOptions} 
              />
            </div>
          </div>

          {/* Bubble Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-80">
              <Bubble data={bubbleChartData} options={bubbleChartOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Table */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 lg:col-span-2 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Department Staffing Details</h2>
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Headcount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FTE</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Vacancies</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attrition Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chartData.table.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.headcount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.fte}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.vacancies}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.attrition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-96">
              {chartData.pie && <Pie data={chartData.pie} options={pieChartOptions} />}
            </div>
          </div>
        </div>

        {/* Charts Row 4 */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-96">
              {chartData.bar && <Bar data={chartData.bar} options={barChartOptions} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
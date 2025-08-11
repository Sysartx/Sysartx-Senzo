"use client";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Type definitions
type TimeframeData = {
  months: string[];
  headcount: number[];
  vacancies: number[];
};

type LocationData = {
  "6": TimeframeData;
  "12": TimeframeData;
};

type DepartmentData = {
  north: LocationData;
  south: LocationData;
};

type ForecastData = {
  nursing: DepartmentData;
  er: DepartmentData;
};

export default function ForecastDataPage() {
  // Filter states with explicit types
  const [location, setLocation] = useState<"north" | "south">("north");
  const [department, setDepartment] = useState<"nursing" | "er">("nursing");
  const [timeframe, setTimeframe] = useState<"6" | "12">("12");

  // Hardcoded data with proper typing
  const forecastData: ForecastData = {
    nursing: {
      north: {
        "6": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          headcount: [120, 125, 130, 135, 140, 145],
          vacancies: [15, 12, 10, 8, 6, 4],
        },
        "12": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          headcount: [120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175],
          vacancies: [15, 12, 10, 8, 6, 4, 3, 3, 2, 2, 1, 1],
        },
      },
      south: {
        "6": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          headcount: [80, 85, 90, 95, 100, 105],
          vacancies: [10, 8, 6, 5, 4, 3],
        },
        "12": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          headcount: [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135],
          vacancies: [10, 8, 6, 5, 4, 3, 2, 2, 1, 1, 0, 0],
        },
      },
    },
    er: {
      north: {
        "6": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          headcount: [45, 47, 50, 52, 55, 58],
          vacancies: [8, 7, 6, 5, 4, 3],
        },
        "12": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          headcount: [45, 47, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72],
          vacancies: [8, 7, 6, 5, 4, 3, 3, 2, 2, 1, 1, 0],
        },
      },
      south: {
        "6": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          headcount: [30, 32, 35, 37, 40, 42],
          vacancies: [5, 4, 3, 3, 2, 1],
        },
        "12": {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          headcount: [30, 32, 35, 37, 40, 42, 45, 47, 50, 52, 55, 58],
          vacancies: [5, 4, 3, 3, 2, 1, 1, 1, 0, 0, 0, 0],
        },
      },
    },
  };

  // Get current data based on filters
  const currentData = forecastData[department][location][timeframe];

  // Line chart data
  const lineChartData = {
    labels: currentData.months,
    datasets: [
      {
        label: "Headcount Forecast",
        data: currentData.headcount,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Bar chart data
  const barChartData = {
    labels: currentData.months,
    datasets: [
      {
        label: "Vacancies",
        data: currentData.vacancies,
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${department.charAt(0).toUpperCase() + department.slice(1)} Department Forecast`,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Workforce Forecast Data</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-gray-600">
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value as "north" | "south")}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="north">North Region</option>
            <option value="south">South Region</option>
          </select>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium mb-1">
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value as "nursing" | "er")}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="nursing">Nursing</option>
            <option value="er">Emergency Room</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeframe" className="block text-sm font-medium mb-1">
            Timeframe
          </label>
          <select
            id="timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as "6" | "12")}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="h-80">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="h-80">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Forecast Details</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Headcount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vacancies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vacancy Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.months.map((month: string, index: number) => (
              <tr key={month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {currentData.headcount[index]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {currentData.vacancies[index]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {((currentData.vacancies[index] / currentData.headcount[index]) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button className="bg-black hover:bg-gray-700 text-white">
          Export Forecast Data
        </Button>
        <Button variant="outline" className="border-gray-300 text-gray-900">
          Save Forecast Scenario
        </Button>
      </div>
    </div>
  );
}
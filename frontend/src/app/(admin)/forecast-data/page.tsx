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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Workforce Forecast Data</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-gray-600">
        {/* Location Dropdown */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <Select
            value={location}
            onValueChange={(value: "north" | "south") => setLocation(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department Dropdown */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium mb-1">
            Department
          </label>
          <Select
            value={department}
            onValueChange={(value: "nursing" | "er") => setDepartment(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nursing">Nursing</SelectItem>
              <SelectItem value="er">Emergency Room</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeframe Dropdown */}
        <div>
          <label htmlFor="timeframe" className="block text-sm font-medium mb-1">
            Timeframe
          </label>
          <Select
            value={timeframe}
            onValueChange={(value: "6" | "12") => setTimeframe(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
            </SelectContent>
          </Select>
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
        {/* Action Buttons */}
        <div className="my-2 flex justify-between flex-col sm:flex-row sm:gap-4">
          <h2 className="text-xl text-black font-semibold mb-4 line-clamp-1">Forecast Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="bg-black hover:bg-gray-700 text-white">
              Export Forecast Data
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-900">
              Save Forecast Scenario
            </Button>
          </div>
        </div>
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

    </div>
  );
}
// src/app/forgot-password/page.tsx
import { BrainCircuit, GanttChartSquare, LineChart } from "lucide-react";
import Image from "next/image";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 md:w-10 md:h-10 relative">
            <Image
              src="/forecast-analytics.png"
              alt="Forecast Logo"
              width={35}
              height={35}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold">Forecast</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row pt-16 md:pt-0">
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <ForgotPasswordForm />
        </div>
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black text-white hidden lg:flex flex-col items-center justify-center p-8 md:p-12 space-y-6 md:space-y-8">
          <FeatureCard
            icon={<BrainCircuit className="h-8 w-8 text-blue-400" />}
            title="AI Powered"
            description="Advanced analytics capabilities"
          />
          <FeatureCard
            icon={<GanttChartSquare className="h-8 w-8 text-purple-400" />}
            title="Best Practice Modeling"
            description="Advanced analytics capabilities"
          />
          <FeatureCard
            icon={<LineChart className="h-8 w-8 text-green-400" />}
            title="Reporting Engine"
            description="Insight efficiency you"
          />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ 
  icon,
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string; 
  description: string 
}) => (
  <div className="w-full max-w-md bg-gray-800/50 border border-gray-700 rounded-lg p-6">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-gray-700/50 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);
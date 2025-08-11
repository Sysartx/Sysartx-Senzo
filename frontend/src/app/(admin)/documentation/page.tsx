"use client";
import { useState } from "react";
import { Book, Shield, FileText, ClipboardList, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type DocumentationSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("documentation");

  const sections: DocumentationSection[] = [
    {
      id: "documentation",
      title: "Documentation",
      icon: <Book className="h-5 w-5 text-black text-black" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <h2 className="text-2xl font-bold">System Documentation</h2>
          <p className="text-gray-700">
            Welcome to the comprehensive documentation for our Workforce Management System. 
            This guide provides detailed information about all system features and functionality.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Getting Started</h3>
            <p>
              To begin using the system, follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log in with your credentials</li>
              <li>Navigate to the Dashboard for an overview</li>
              <li>Use the sidebar to access different modules</li>
              <li>Configure your profile settings</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Real-time workforce analytics",
                "Forecasting tools",
                "Staff scheduling",
                "Compliance tracking",
                "Reporting dashboard",
                "Mobile accessibility"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">System Requirements</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["Browser", "Chrome 80+", "Chrome 100+"],
                  ["RAM", "4GB", "8GB"],
                  ["OS", "Windows 10", "Windows 11/macOS 12+"],
                  ["Screen", "1280x720", "1920x1080"],
                ].map(([component, min, rec], index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{component}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{min}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: "best-practices",
      title: "Best Practices",
      icon: <Award className="h-5 w-5 text-black text-black" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <h2 className="text-2xl font-bold">Best Practices Guide</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800">System Optimization</h3>
            <p className="text-blue-700 mt-2">
              Follow these guidelines to ensure optimal system performance and user experience.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Data Management</h3>
            <ul className="space-y-3">
              {[
                "Regularly update staff information to maintain accurate records",
                "Archive old data quarterly to improve system performance",
                "Use standardized naming conventions for consistency",
                "Backup critical data weekly",
                "Review data accuracy monthly"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">User Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Role Assignment",
                  content: "Assign roles carefully based on job responsibilities to maintain proper access control."
                },
                {
                  title: "Password Policies",
                  content: "Enforce strong password requirements and regular password changes."
                },
                {
                  title: "Training",
                  content: "Provide comprehensive training for new users to maximize system utilization."
                },
                {
                  title: "Access Reviews",
                  content: "Conduct quarterly access reviews to ensure appropriate permissions."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 mt-2">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="h-5 w-5 text-black text-black" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <h2 className="text-2xl font-bold">Terms of Service</h2>
          <p className="text-gray-700">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
            <p className="text-gray-700">
              By accessing and using this Workforce Management System, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. Description of Service</h3>
            <p className="text-gray-700">
              Our system provides workforce management tools including but not limited to scheduling, time tracking, and analytics. The service is offered as a SaaS solution.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. User Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the confidentiality of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Use the service only for lawful purposes</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">4. Payment Terms</h3>
            <p className="text-gray-700">
              Fees are billed monthly in advance. Payment is due within 30 days of invoice date. Late payments may result in service suspension.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">5. Termination</h3>
            <p className="text-gray-700">
              Either party may terminate this agreement with 30 days written notice. Upon termination, your right to use the service will immediately cease.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Shield className="h-5 w-5 text-black text-black" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <h2 className="text-2xl font-bold">Privacy Policy</h2>
          <p className="text-gray-700">
            Effective date: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">1. Information We Collect</h3>
            <p className="text-gray-700">
              We collect personal information when you register, including name, email, and professional details. We also collect usage data and cookies.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. How We Use Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow participation in interactive features</li>
              <li>To provide customer support</li>
              <li>For analysis to improve our service</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. Data Security</h3>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect personal data. All data is encrypted in transit and at rest.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">4. Data Retention</h3>
            <p className="text-gray-700">
              We retain personal data only as long as necessary for the purposes collected. User accounts are deleted after 90 days of inactivity.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">5. Your Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Right to access your personal data",
                "Right to rectification of inaccurate data",
                "Right to erasure ('right to be forgotten')",
                "Right to restrict processing",
                "Right to data portability",
                "Right to object to processing"
              ].map((right, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{right}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "site-policy",
      title: "Site Policy",
      icon: <ClipboardList className="h-5 w-5 text-black text-black" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <h2 className="text-2xl font-bold">Site Policy</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Acceptable Use</h3>
            <p className="text-gray-700">
              Users must not misuse the system by knowingly introducing viruses or other malicious material. You must not attempt to gain unauthorized access to our system.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Content Standards</h3>
            <p className="text-gray-700">
              Any content uploaded must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be accurate and truthful</li>
              <li>Comply with applicable laws</li>
              <li>Not contain defamatory material</li>
              <li>Not infringe any copyright or trademark</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Suspension and Termination</h3>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate access to users who violate these policies. We will typically warn you first but may act without notice in cases of serious breaches.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Changes to Policies</h3>
            <p className="text-gray-700">
              We may revise these policies at any time. You are expected to check this page periodically for updates. Continued use after changes constitutes acceptance.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                For questions about these policies, please contact:
              </p>
              <p className="font-medium mt-2">info@sysartx.com</p>
              <p className="text-gray-600">+92-3232846795</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSection = sections.find(section => section.id === activeSection) || sections[0];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-2xl font-semibold mb-6">Documentation</h2>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-blue-600">{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {currentSection.content}
        </div>
      </div>
    </div>
  );
}
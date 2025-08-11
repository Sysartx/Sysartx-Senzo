import { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  History,
  LineChart,
  Settings,
  Users,
  BookOpen,
  HelpCircle,
  Bell,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

interface DemoButton {
  name: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Historical Data",
    icon: History,
    path: "/historical-data",
  },
  {
    name: "Forecast Data",
    icon: LineChart,
    path: "/forecast-data",
  },
  {
    name: "Plan Settings",
    icon: Settings,
    path: "/plan-settings",
  },
  {
    name: "User Settings",
    icon: Users,
    path: "/user-settings",
  },
  {
    name: "Documentation",
    icon: BookOpen,
    path: "/documentation",
  },
];

export const HEADER_ICONS = [
  {
    name: "Notifications",
    icon: Bell,
  },
  {
    name: "Help",
    icon: HelpCircle,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export const DEMO_BUTTONS: DemoButton[] = [
  {
    name: "Quick Forecast",
    icon: LineChart,
  },
  {
    name: "Data Insights",
    icon: History,
  },
  {
    name: "System Health",
    icon: Settings,
  },
];

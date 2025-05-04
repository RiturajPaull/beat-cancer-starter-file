import {
  IconCircleDashedCheck,
  IconFolderCheck,
  IconHourglassHigh,
  IconUserScan,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MetricsCard from "./MetricsCard";

const DisplayInfo = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiPersonalizedTreatment: 0,
    completedScreenings: 0,
    totalScreenings: 0,
    pendingScreenings: 0,
    overdueScreenings: 0,
  });

  const metricsData = [
    {
      title: "Specialist Appointment Pending",
      subTitle: "View",
      value: metrics.pendingScreenings,
      icon: IconHourglassHigh,
      onClick: () => navigate("/appointment/pending"),
    },
    {
      title: "Treatment Progress Update",
      subTitle: "View",
      value: `${metrics.completedScreenings} of ${metrics.totalScreenings} completed`,
      icon: IconCircleDashedCheck,
      onClick: () => navigate("/appointment/progress"),
    },
    {
      title: "Total Folders",
      subTitle: "View",
      value: metrics.totalFolders,
      icon: IconFolderCheck,
      onClick: () => navigate("/folders"),
    },
    {
      title: "Total Screenings",
      subTitle: "View",
      value: metrics.totalScreenings,
      icon: IconUserScan,
      onClick: () => navigate("/screenings"),
    },
    {
      title: "Completed Screenings",
      subTitle: "View",
      value: metrics.completedScreenings,
      icon: IconUserScan,
      onClick: () => navigate("/screenings/completed"),
    },
    {
      title: "Pending Screenings",
      subTitle: "View",
      value: metrics.pendingScreenings,
      icon: IconUserScan,
      onClick: () => navigate("/screenings/pending"),
    },
    {
      title: "Oserdue Screenings",
      subTitle: "View",
      value: metrics.overdueScreenings,
      icon: IconUserScan,
      onClick: () => navigate("/screenings/overdue"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-[26px]">
      {/* Rendering two set of div .i.e upper and lower */}
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
      <div className="ga-4 mt-[9px] grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;

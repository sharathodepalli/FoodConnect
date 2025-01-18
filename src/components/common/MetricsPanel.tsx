import React from 'react';
import { Package, Users, Clock, Leaf } from 'lucide-react';

interface Metric {
  icon: typeof Package;
  label: string;
  value: number | string;
  suffix?: string;
  color: string;
}

interface MetricsPanelProps {
  metrics: Metric[];
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className={`p-3 ${metric.color} rounded-lg`}>
              <metric.icon className={`w-6 h-6 ${metric.color.replace('bg-', 'text-').replace('/10', '-600')}`} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
            {metric.suffix}
          </div>
          <div className="text-sm text-gray-600">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
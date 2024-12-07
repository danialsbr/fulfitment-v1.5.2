import React from 'react';
import { Activity, Server, Wifi, WifiOff } from 'lucide-react';
import { useSystemStatus } from '../../hooks/useSystemStatus';
import { useTranslation } from '../../hooks/useTranslation';

export function SystemStatus() {
  const { isConnected, latency, status } = useSystemStatus();
  const t = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Server className="h-6 w-6 text-blue-500" />
        <h2 className="text-lg font-semibold">{t.system.status}</h2>
      </div>

      <div className="space-y-4">
        {/* API Connection Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm font-medium">
              {t.system.apiConnection}
            </span>
          </div>
          <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? t.system.connected : t.system.disconnected}
          </span>
        </div>

        {/* API Latency */}
        {isConnected && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">{t.system.latency}</span>
            </div>
            <span className="text-sm text-gray-600">
              {latency}ms
            </span>
          </div>
        )}

        {/* System Stats */}
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600">
            {t.system.totalOrders}: {status?.stats?.total_orders || 0}
          </div>
          <div className="text-sm text-gray-600">
            {t.system.totalLogs}: {status?.stats?.total_logs || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
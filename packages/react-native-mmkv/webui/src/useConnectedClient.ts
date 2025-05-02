import { DevToolsPluginClient, useDevToolsPluginClient } from 'expo/devtools';
import { useEffect, useState } from 'react';

export const useConnectedClient = (): DevToolsPluginClient | null => {
  const client = useDevToolsPluginClient('mmkv');
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  useEffect(() => {
    const interval = setInterval(() => {
      if (client && client.isConnected()) {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [client]);
  if (client && status === 'connected') return client;
  return null;
};

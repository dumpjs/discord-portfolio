'use client';

import { useState, useEffect } from 'react';
import { fetchLanyardData } from '@/lib/lanyard';
import { LanyardData } from '@/lib/types';

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    const fetchData = async () => {
      try {
        const response = await fetchLanyardData(userId);
        
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError('Failed to fetch Discord status');
        }
      } catch (err) {
        setError('Error connecting to Lanyard API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();
    
    // Refresh every 30 seconds
    intervalId = setInterval(fetchData, 30000);
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [userId]);

  return { data, loading, error };
}
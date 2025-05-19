import { useEffect, useState } from 'react';

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  [key: string]: string | undefined;
}

export const useUtmParams = () => {
  const [utmParams, setUtmParams] = useState<UtmParams>({});

  useEffect(() => {
    const getUtmParams = () => {
      const params = new URLSearchParams(window.location.search);
      const utm: UtmParams = {};
      
      // Get all UTM parameters
      params.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          utm[key] = value;
        }
      });

      setUtmParams(utm);
    };

    getUtmParams();
  }, []);

  return utmParams;
}; 
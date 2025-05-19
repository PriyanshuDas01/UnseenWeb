import React, { createContext, useContext, ReactNode } from 'react';
import { useUtmParams } from './useUtmParams';

export interface UtmConfig {
  enabled: boolean;
  dynamicText?: {
    [key: string]: {
      template: string;
      variables?: string[];
    };
  };
}

interface UnseenContextType {
  apiKey: string;
  customPrompt: string;
  utmConfig?: UtmConfig;
}

const UnseenContext = createContext<UnseenContextType | undefined>(undefined);

interface UnseenProviderProps {
  children: ReactNode;
  apiKey: string;
  customPrompt: string;
  utmConfig?: UtmConfig;
}

export const UnseenProvider: React.FC<UnseenProviderProps> = ({
  children,
  apiKey,
  customPrompt,
  utmConfig = { enabled: false }
}) => {
  return (
    <UnseenContext.Provider value={{ apiKey, customPrompt, utmConfig }}>
      {children}
    </UnseenContext.Provider>
  );
};

export const useUnseen = () => {
  const context = useContext(UnseenContext);
  if (context === undefined) {
    throw new Error('useUnseen must be used within an UnseenProvider');
  }
  return context;
}; 
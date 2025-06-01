import React, { ReactNode, CSSProperties } from 'react';

interface UnseenProviderProps {
    apiKey: string;
    geminiApiKey?: string;
    useGemini?: boolean;
    customPrompt?: string;
    utmConfig?: UtmConfig;
    children: ReactNode;
}
interface UnseenProps {
    children: string;
    style?: CSSProperties;
}
interface UtmConfig {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
}
interface TransformResponse {
    text: string;
    error?: string;
}

declare const Unseen: React.FC<UnseenProps>;

declare const UnseenProvider: React.FC<UnseenProviderProps>;

export { TransformResponse, Unseen, UnseenProps, UnseenProvider, UnseenProviderProps, UtmConfig };

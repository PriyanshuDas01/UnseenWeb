import { ReactNode, CSSProperties } from 'react';
export interface UnseenProviderProps {
    apiKey: string;
    geminiApiKey?: string;
    useGemini?: boolean;
    customPrompt?: string;
    utmConfig?: UtmConfig;
    children: ReactNode;
}
export interface UnseenProps {
    children: string;
    style?: CSSProperties;
}
export interface UtmConfig {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
}
export interface TransformResponse {
    text: string;
    error?: string;
}

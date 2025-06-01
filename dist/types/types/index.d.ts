export interface TransformResponse {
    text: string;
}
export interface UtmConfig {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
}
export interface UserInfo {
    browser?: {
        name: string;
        language: string;
        platform: string;
        screenResolution: string;
        deviceType: 'mobile' | 'desktop' | 'tablet';
    };
    session?: {
        startTime: string;
        referrer: string;
        entryPage: string;
    };
    timezone?: string;
}
export interface UnseenProviderProps {
    apiKey: string;
    geminiApiKey?: string;
    useGemini?: boolean;
    customPrompt?: string;
    utmConfig?: UtmConfig;
    children: React.ReactNode;
}

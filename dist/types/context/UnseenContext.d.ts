import React from 'react';
import { UnseenProviderProps, TransformResponse } from '../types';
interface UnseenContextType {
    transformText: (text: string) => Promise<TransformResponse>;
}
export declare const UnseenContext: React.Context<UnseenContextType | null>;
export declare const UnseenProvider: React.FC<UnseenProviderProps>;
export {};

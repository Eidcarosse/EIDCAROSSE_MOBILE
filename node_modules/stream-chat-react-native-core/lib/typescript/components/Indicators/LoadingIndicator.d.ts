import React from 'react';
export declare type LoadingProps = {
    listType?: 'channel' | 'message' | 'default';
    loadingText?: string;
};
/**
 * UI Component for LoadingIndicator
 */
export declare const LoadingIndicator: React.FC<LoadingProps>;

import React from 'react';
import { GestureResponderEvent } from 'react-native';
export declare type ScrollToBottomButtonProps = {
    /** onPress handler */
    onPress: (event: GestureResponderEvent) => void;
    /** If we should show the notification or not */
    showNotification?: boolean;
    unreadCount?: number;
};
export declare const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps>;

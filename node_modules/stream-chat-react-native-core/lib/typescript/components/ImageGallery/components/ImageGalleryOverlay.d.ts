import React from 'react';
import Animated from 'react-native-reanimated';
declare type Props = {
    animatedBottomSheetIndex: Animated.SharedValue<number>;
    closeGridView: () => void;
    currentBottomSheetIndex: number;
};
export declare const ImageGalleryOverlay: React.FC<Props>;
export {};

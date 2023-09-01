import React from 'react';
import { StopProps } from 'react-native-svg';
import { IconProps } from './utils/base';
declare type LoadingProps = IconProps & Partial<Pick<StopProps, 'stopOpacity'>> & {
    startColor?: StopProps['stopColor'];
    stopColor?: StopProps['stopColor'];
};
export declare const Loading: React.FC<LoadingProps>;
export {};

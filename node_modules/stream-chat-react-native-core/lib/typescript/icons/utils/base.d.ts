import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';
export declare type IconProps = Partial<SvgProps> & Omit<RootPathProps, 'd'> & {
    height?: number;
    width?: number;
};
export declare const RootSvg: React.FC<IconProps>;
export declare type RootPathProps = Pick<PathProps, 'd'> & {
    pathFill?: SvgProps['fill'];
    pathOpacity?: PathProps['opacity'];
};
export declare const RootPath: React.FC<RootPathProps>;

import React from 'react';
export declare type ImageGalleryGridHandleCustomComponent = ({ closeGridView, }: {
    closeGridView: () => void;
}) => React.ReactElement | null;
export declare type ImageGalleryGridHandleCustomComponentProps = {
    centerComponent?: ImageGalleryGridHandleCustomComponent;
    leftComponent?: ImageGalleryGridHandleCustomComponent;
    rightComponent?: ImageGalleryGridHandleCustomComponent;
};
declare type Props = ImageGalleryGridHandleCustomComponentProps & {
    closeGridView: () => void;
};
export declare const ImageGridHandle: React.FC<Props>;
export {};

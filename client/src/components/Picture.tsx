import React from 'react';
interface PictureProps {
	src: string;
	alt: string;
	maxWidth?: number;
	maxHeight?: number;
}
const Picture : React.FC<PictureProps> = ({
	src, 
	alt,
	maxWidth,
	maxHeight
 }) => {
	return (
		<img
      src={src}
      alt={alt}
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : '100%',
        maxHeight: maxHeight ? `${maxHeight}px` : '100%',
        width: 'auto',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};
export default Picture;
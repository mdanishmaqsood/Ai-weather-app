import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const NextImage = ({ alt = 'default alt', src, ...rest }: ImageProps) => {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  return (
    <Image
      alt={alt}
      src={url}
      {...rest}
      onError={() => setUrl('/favicon.ico')}
    />
  );
};

export default NextImage;

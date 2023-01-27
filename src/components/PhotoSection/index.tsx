import { useCallback, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';

import { useGlobalContext } from '../../context';
import PhotoSectionWrapper from '../wrapper/styledPhotoSection';
import Error from './Error';
import Photo from './Photo';
import { PhotoAPIType } from './photo.type';

export default function PhotoSection() {
  const [isTouch, setIsTouch] = useState(false);
  const {
    isError,
    isLoading,
    isPaused,
    isFetching,
    hasNextPage,
    photos,
    query,
    fetchNextPage,
  } = useGlobalContext();

  let photosData: PhotoAPIType[] | [] = [];
  if (photos && !query) photosData = photos.pages.flat();

  if (photos && query) {
    photosData = photos.pages.reduce(
      (acc: object[], item: { results: object[] }) => {
        return [...acc, ...item.results];
      },
      []
    );
  }
  /* ----------- scrolling ------------*/
  const scrollingPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const scrollPageLoadDelay = useDebouncedCallback(scrollingPage, 500);

  useEffect(() => {
    const scrolling = () => {
      if (/touch/i.test(navigator.userAgent)) setIsTouch(true);
      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 3
      )
        if (hasNextPage) scrollPageLoadDelay();
    };
    window.addEventListener('scroll', scrolling);
    return () => window.removeEventListener('scroll', scrolling);
  }, [hasNextPage, isLoading, scrollPageLoadDelay]);

  return (
    <PhotoSectionWrapper query={query}>
      {isPaused ? (
        <Error />
      ) : isLoading ? (
        <div className="loading">
          <PulseLoader color="#9b0e05" />
        </div>
      ) : isError ? (
        <Error />
      ) : (
        <div className="photos-container">
          {photosData.map((photo, index: number) => {
            const {
              id,
              urls: { regular: imgRegular, full: imgFull },
              alt_description: altDesc,
              likes,
              user: {
                name,
                portfolio_url: portFolioUrl,
                profile_image: { medium: profileImageMedium },
              },
            } = photo;
            return (
              <Photo
                key={id + index}
                {...{
                  isTouch,
                  imgRegular,
                  imgFull,
                  name,
                  altDesc,
                  likes,
                  profileImageMedium,
                  portFolioUrl,
                }}
              />
            );
          })}
        </div>
      )}
      {photos && photos.length === 0 && query && (
        <p className="notMatching">
          Sorry this keyword isn&#39;t matching any photos
        </p>
      )}
      {isLoading ||
        (isFetching && (
          <div className="loading">
            <PulseLoader color="#9b0e05" />
          </div>
        ))}
    </PhotoSectionWrapper>
  );
}

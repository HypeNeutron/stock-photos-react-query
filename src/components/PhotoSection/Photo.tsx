import React, { useRef } from 'react';
import { AiFillHeart } from 'react-icons/ai';

import Modal from '../wrapper/styledModalPhoto';
import PhotoCard from '../wrapper/styledPhotoCard';
import { CreatorPhotoType } from './photo.type';

function Photo({
  isTouch,
  imgRegular,
  imgFull,
  name,
  altDesc,
  likes,
  profileImageMedium,
  portFolioUrl,
}: CreatorPhotoType) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const imgModal = useRef<HTMLImageElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const linkProfile = useRef<HTMLAnchorElement>(null);

  const handleModal = (e: React.MouseEvent) => {
    if (imgModal.current) {
      imgModal.current.src =
        ((e.target as HTMLInputElement).dataset.src as string) || '';
      imgModal.current.alt = (e.target as HTMLInputElement).alt || '';
    }
    if (caption.current)
      caption.current.innerHTML = (e.target as HTMLInputElement).alt;
    setIsModalOpen(true);
  };

  const handleLink = (e: React.SyntheticEvent<HTMLElement>) => {
    if (!linkProfile.current?.href ?? null)
      (e.target as HTMLImageElement).style.cursor = 'default';
    return;
  };

  const onTouching = (e: React.TouchEvent<HTMLImageElement>) => {
    const matchPhone = window.matchMedia('(max-width: 1400px)');
    if (matchPhone.matches) {
      setTimeout(() => {
        (e.target as HTMLImageElement).classList.add('popping');
      }, 10);
      (e.target as HTMLImageElement).classList.remove('popping');
    }
  };

  return (
    <PhotoCard isTouch={isTouch}>
      <input
        type="image"
        src={imgRegular}
        data-src={imgFull}
        alt={altDesc}
        onClick={handleModal}
      />

      <Modal isModalOpen={isModalOpen}>
        <div
          className="bg"
          onClick={() => setIsModalOpen(false)}
          aria-hidden="true"
        />
        <span
          className="close"
          onClick={() => setIsModalOpen(false)}
          aria-hidden="true"
        >
          &times;
        </span>
        <img className="modalImg" id="img01" ref={imgModal} alt="" src="" />
        <div ref={caption} id="caption" />
      </Modal>

      <div className="photo-info">
        <div>
          <h4 className="namePhoto">{name}</h4>
          <div className="like-container">
            <div className="heartIcon">
              <AiFillHeart />
            </div>
            <p className="amLike">{likes} likes</p>
          </div>
        </div>
        <a
          href={portFolioUrl}
          target="_blank"
          rel="noreferrer"
          ref={linkProfile}
        >
          <img
            src={profileImageMedium}
            alt="profile"
            className="profileImg"
            onMouseOver={handleLink}
            onFocus={handleLink}
            onTouchStart={onTouching}
          />
        </a>
      </div>
    </PhotoCard>
  );
}

export default Photo;

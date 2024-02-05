import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImage } from "../store/actions";
import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-component";
import { useRouter } from "next/router";
import Modal from "react-modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


const masonryOptions = {
  fitWidth: false,
  columnWidth: 250,
  gutter: 0,
  itemSelector: ".photo-item",
};

const ShowImage = () => {
  const [myAllImages, setMyAllImages] = useState([]);
  const [limit, setLimit] = useState(1);
  const [modal, setModal] = useState({
    showImgModal: false,
    modalImgSrc: null,
    modalImgAlt: null,
    modalImgWidth: null,
    modalImgHeight: null,
    currentSectionLength: null,
  });
  const router = useRouter();

  const onClose = () => {
    router.push("/", undefined, { shallow: true });
    setModal({
      ...modal,
      showImgModal: false,
    });
  };

  const myImage = useSelector((state) => state.allImages.images);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImage(limit));
  }, []);

  useEffect(() => {
    setMyAllImages([...myAllImages, ...myImage]);
  }, [myImage]);

  const getImages = (limit) => {
    dispatch(fetchImage(limit));
  };

  const fetchData = () => {
    setLimit(limit + 1);
    getImages(limit + 1);
  };

  // const infiniteImages = async (limit) => {
  //   try {
  //     const clientId = process.env.NEXT_PUBLIC_ACCESS_KEY;
  //     const response = await axios.get(
  //       `https://api.unsplash.com/photos?page=${limit}&client_id=${clientId}`
  //     );
  //     const images = response.data;
  //     setMyAllImages([...myAllImages, ...images]);
  //   } catch (error) {
  //     const errorMsg = error.message;
  //   }
  // };

  return (
    <>
      <InfiniteScroll
        dataLength={myAllImages.length}
        next={fetchData}
        hasMore={true}
        loader={<h3>Loading...</h3>}
      >
        <Masonry
          className={"photo-list"}
          elementType={"div"}
          options={masonryOptions}
        >
          {myAllImages.length &&
            myAllImages.map((image, index) => {
              return (
                <div className='photo-item' key={index}>
                  <Link href={`/`} as={`/photos/${image.id}`} passHref>
                    <a>
                      <Image
                        className="main-img"
                        src={image.urls.regular}
                        alt={`image-${image.id}`}
                        width={image.width}
                        height={image.height}
                        placeholder="blur"
                        blurDataURL={image.urls.regular}
                        onClick={() => {
                          setModal({
                            showImgModal: true,
                            modalImgSrc: image.urls.regular,
                            modalImgAlt: image.alt_description,
                            modalImgWidth: image.width,
                            modalImgHeight: image.height,
                            currentSectionLength: myAllImages.length,
                          });
                        }}
                        priority
                      />
                    </a>
                  </Link>
                  <div className="img-overlay" style={{ color: "white" }}>
                    <div className="img-header">
                      <Image
                        className="rounded-circle profile-img"
                        src={image.user.profile_image.small}
                        alt={image.user.username}
                        width={32}
                        height={32}
                      />
                      <div className="img-title">{image.user.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Masonry>
      </InfiniteScroll>

      <Modal
        isOpen={modal.showImgModal}
        onRequestClose={onClose}
        overlayClassName="myoverlay"
        contentLabel="My dialog"
        ariaHideApp={false}
      >
        <IconButton
          className="close-button"
          onClick={() => {
            router.push("/", undefined, { shallow: true });
            setModal({
              ...modal,
              showImgModal: false,
            });
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="modal-container">
          <Image
            src={modal.modalImgSrc}
            alt={modal.modalImgAlt}
            width={modal.modalImgWidth}
            height={modal.modalImgHeight}
            placeholder="blur"
            blurDataURL={modal.modalImgSrc}
            priority
          />
        </div>
        {/* <Button onClick={() => {
          router.push('/photos/')
        }}></Button> */}
      </Modal>
    </>
  );
};

export default ShowImage;

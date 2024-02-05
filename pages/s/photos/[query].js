import axios from "axios";
import React, { useState } from "react";
import Masonry from "react-masonry-component";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Modal from "react-modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";
import Link from "next/link";

const masonryOptions = {
  fitWidth: false,
  columnWidth: 250,
  gutter: 0,
  itemSelector: ".photo-item",
};

const SearchImages = ({ images }) => {
  const [modal, setModal] = useState({
    showImgModal: false,
    modalImgSrc: null,
    modalImgAlt: null,
    modalImgWidth: null,
    modalImgHeight: null,
    currentSectionLength: null,
  });
  const router = useRouter();
  const { query } = router.query;

  const onClose = () => {
    router.push(`/s/photos/${query}`, undefined, { shallow: true });
    setModal({
      ...modal,
      showImgModal: false,
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="my-4 text-center">Results for "{query}"</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Masonry
            className={"photo-list"}
            elementType={"div"}
            options={masonryOptions}
          >
            {images.length &&
              images.map((image, index) => {
                return (
                  <div className={`photo-item`} key={index}>
                    {/* <Link
                      href={`/s/photos/${query}`}
                      as={`/photos/${image.id}`}
                      passHref
                    >
                      <a> */}
                    <Image
                      className="main-img"
                      src={image.urls.regular}
                      alt={`image-${image.id}`}
                      width={image.width}
                      height={image.height}
                      placeholder="blur"
                      blurDataURL={image.urls.regular}
                      onClick={() => {
                        router.push(
                          `/s/photos/${query}`,
                          `/photos/${image.id}`,
                          { shallow: true }
                        );
                        setModal({
                          showImgModal: true,
                          modalImgSrc: image.urls.regular,
                          modalImgAlt: image.alt_description,
                          modalImgWidth: image.width,
                          modalImgHeight: image.height,
                          currentSectionLength: images.length,
                        });
                      }}
                      priority
                    />
                    {/* </a>
                    </Link> */}
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
                router.push(`/s/photos/${query}`, undefined, { shallow: true });
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
        </Col>
      </Row>
    </Container>
  );
};

export default SearchImages;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { query } = params;
  const clientId = process.env.NEXT_PUBLIC_ACCESS_KEY;
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?per_page=20&query=${query}&client_id=${clientId}`
    );
    return {
      props: {
        images: response.data.results,
      },
    };
  } catch (error) {
    const errorMsg = error.message;
  }
};

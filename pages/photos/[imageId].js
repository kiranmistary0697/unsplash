import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HeadComponent from "../../components/HeadComponent";

const SingleImage = ({ image }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(true);
  }, []);

  const onClose = () => {
    router.replace("/", undefined, { shallow: true });
    setShow(false);
  };

  return (
    <>
      <HeadComponent
        title={image.location.title}
        meta={
          <>
            <meta data-react-helmet="true" name="charset" content="UTF8" />
            <meta
              data-react-helmet="true"
              name="viewport"
              content="width=device-width, initial-scale=1.0, minimal-ui"
            />
          </>
        }
      />

      <Modal
        isOpen={show}
        onRequestClose={onClose}
        overlayClassName="myoverlay"
        contentLabel="My dialog"
        ariaHideApp={false}
      >
        <IconButton
          className="close-button"
          onClick={() => {
            router.replace("/", undefined, { shallow: true });
            setShow(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="modal-container">
          <Image
            src={image.urls.regular}
            alt={image.alt_description}
            width={image.width}
            height={image.height}
            priority
          />
        </div>
      </Modal>
    </>
  );
};

export default SingleImage;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { imageId } = params;
  const clientId = process.env.NEXT_PUBLIC_ACCESS_KEY;
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/${imageId}`,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
      }
    );
    return {
      props: {
        image: response.data,
      },
    };
  } catch (error) {
    const errorMsg = error.message;
  }
};

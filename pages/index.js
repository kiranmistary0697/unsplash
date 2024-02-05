import ShowImage from "../components/ShowImage";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import HeadComponent from "../components/HeadComponent";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Form,
} from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { wrapper } from "../store/store";
import { useDispatch, useSelector } from "react-redux";



export default function Home({ image }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // console.log(m);

  const dispatch = useDispatch();

  const handleQuery = (e) => {
    e.preventDefault();
    router.push(`/s/photos/${searchQuery}`);
  };

  
  return (
    <Container fluid>
      <Row>
        <Col className="col-home-image p-0">
          <HeadComponent
            title="Unsplash"
            meta={
              <>
                <meta name="Images" content="My Image Gallery" />
                <meta
                  property="og:title"
                  content="Beautiful Free Images & Pictures"
                />
                <meta property="og:description" content="See More Images" />
                <meta property="og:type" content="website" />
                <meta name="charset" content="UTF8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, minimal-ui"
                />
              </>
            }
          />
          {image && (
            <div className="image-container">
              <Image
                className="home-image"
                src={image.urls.regular}
                alt={image.alt_description}
                width={image.width}
                height="2000px"
                priority
              />
              <div className="heading">
                <h1 className="main-heading mb-4">Unsplash</h1>
                <p className="home-info">
                  The internet's source of freely-usable images.
                </p>
                <p className="home-info">Powered by creators everywhere.</p>
                <div className="w-full">
                  <Form onSubmit={handleQuery}>
                    <InputGroup className="mt-4" size="lg">
                      <InputGroup.Text id="basic-addon1" className="p-0">
                        <Button className="border-0 bg-white search-button" type="submit">
                          <SearchIcon style={{ fontSize: "30px" }} />
                        </Button>
                      </InputGroup.Text>
                      <FormControl
                        style={{ fontSize: "15px" }}
                        placeholder="Search free high-resolution photos"
                        aria-label="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Form>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <ShowImage/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export const getStaticProps = async () => {
  try {
    const clientId = process.env.NEXT_PUBLIC_ACCESS_KEY;
    const imageId = "_XLmDKEvxrk";
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

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   store.dispatch({
//             type: "FETCH_SINGLE_IMAGE_SUCCESS",
//             payload: { name: "GGG" },
//           });

//   // const response = await fetch(`https://reqres.in/api/users/${Math.floor(Math.random() * (10) + 1)}`);
//   // const {data} = await response.json();
//   // store.dispatch(addUser(`${data.first_name} ${data.last_name}`))
// });

// export function getStaticProps () {
//   // store.dispatch(fetchSingleImage());
//   store.dispatch(fetchImage(2))
//   return{
//     props:{}
//   }
// }

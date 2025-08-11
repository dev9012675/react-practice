import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomePage() {
  return (
    <Box>
      <Container sx={{ mt: 3 }}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <div className="slider">
            <img src="public\slider\1.jpg" alt="" />
          </div>
          <div className="slider">
            <img src="public\slider\2.jpg" alt="" />
          </div>
          <div className="slider">
            <img src="public\slider\3.jpg" alt="" />
          </div>
        </Carousel>
        ;
        <Button variant="contained" sx={{ mt: 3 }} href="/posts/create">
          Create Post
        </Button>
      </Container>
    </Box>
  );
}

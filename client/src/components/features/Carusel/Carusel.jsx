import Carousel from 'react-bootstrap/Carousel';

function CarouselApp() {
  return (
    <Carousel >
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100 "
          src="https://miro.medium.com/max/840/1*8nfBRAssY0DuETYwdwyqqw.png"
          alt="First slide"
          style={{height:525}}
        />
        <Carousel.Caption>
          <h3>JAVA SCRIPT</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://i.ytimg.com/vi/q0Lmgrf61SY/maxresdefault.jpg"
          alt="Second slide"
          style={{height:525}}
        />
        <Carousel.Caption>
          <h3>REACT</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg"
          alt="Third slide"
          style={{height:525}}
        />
        <Carousel.Caption>
          <h3>HTML</h3>
        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselApp;
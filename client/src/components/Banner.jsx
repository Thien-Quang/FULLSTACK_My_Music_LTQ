import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'




const Banner = () => {
  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '860px'
  }
  
    const slideImages = [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fana-grave-gHcWaeldgtQ-unsplash.jpg?alt=media&token=26478208-1143-4ee4-af82-533ccf55f0b4",
        //caption: "Image 1",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fbn1.png?alt=media&token=39a7b957-074e-4554-830c-070020794725",
        caption: "Image 2",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fbn2.jpg?alt=media&token=c35d2ede-c63d-4957-85a2-36c89c61c070",
        //caption: "Image 3",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fbn3.jpg?alt=media&token=7881b5d0-fbce-409a-a140-3a61306ca1e4",
        //caption: "Image 4",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fbn8.jpg?alt=media&token=15d9e421-6cd0-453b-83ac-5a880e310991",
        //caption: "Image 5",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fconcerts-performance-stage-screenshot-2048x1365-px-musical-theatre-539292-wallhere.com.jpg?alt=media&token=8ad8d4a4-b783-40e5-8ec9-34aeddb8b6fa",
        //caption: "Image 6",
      },
      {
        url:"https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fmusic-concert-band-musician-set-drum-1021009-pxhere.com.jpg?alt=media&token=31fd9700-82b2-468c-adad-b6dcacfcd04b",
        //caption: "Image 7",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/music-app-d2160.appspot.com/o/img_Banner%2Fsebastian-ervi-uCZVEo8iT9Q-unsplash.jpg?alt=media&token=6986294f-7506-42cb-a3cb-220063e11290",
        //caption: "Image 8",
      }
    ];
   
  return (
    <div className="slide-container">
    <Slide>
     {slideImages.map((slideImage, index)=> (
        <div key={index}>
          <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
            {/* <span style={spanStyle}>{slideImage.caption}</span> */}
          </div>
        </div>
      ))} 
    </Slide>
  </div>
  );
};

export default Banner;
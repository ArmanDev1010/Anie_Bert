import React from "react";
import {
  About,
  Contact,
  CursorFollow,
  Hero,
  Masterpiece,
  Projects,
  Services,
} from "../components";

const Home = () => {

  return (
    <div className="relative bg-white text-black">
      {/* {data.reviews.map((review) => (
        <div key={review.documentId} className="">
          <div className="font-bold text-xl">{review.rating}</div>
          <h2 className="text-3xl">{review.title}</h2>
          <p className="text-gray-500">{review.body[0].children[0].text}</p>
          <img src={`http://localhost:1337/${review.image.url}`} alt="" />
          <Link to={`/review/${review.documentId}`} className="bg-blue-500">
            Read More
          </Link>
        </div>
      ))} */}
      <CursorFollow />
      <Hero />
      {/* <Masterpiece />
      <About />
      <Services />
      <Projects />
      <Contact /> */}
    </div>
  );
};

export default Home;

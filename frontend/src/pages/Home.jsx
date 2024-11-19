import React from "react";
import {
  Contact,
  CursorFollow,
  Hero,
  Masterpiece,
  Projects,
  Random,
} from "../components";

// import { useQuery, gql } from "@apollo/client";

// const REVIEWS = gql`
//   query GetReviews {
//     reviews {
//       title
//       body
//       rating
//       documentId
//       image {
//         url
//       }
//     }
//   }
// `;

const Home = () => {
  // const { loading, error, data } = useQuery(REVIEWS);

  // if (loading) return <p></p>;
  // if (error) return <p>error</p>;

  return (
    <div className="relative">
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
      <Masterpiece />
      <Projects />
      <Random />
      <Contact />
    </div>
  );
};

export default Home;

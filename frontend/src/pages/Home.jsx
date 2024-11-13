// import React from "react";
// import useFetch from "../hooks/useFetch";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const { loading, error, data } = useFetch(
//     "http://localhost:1337/api/reviews?populate=*"
//   );
//   if (loading) return <p></p>;
//   if (error) return <p>error</p>;
//   const dataArray = data;
//   console.log(data)
//   return (
//     <div>
//       {/* {dataArray.map((review) => (
//         <div key={review.id} className="">
//           <div className="font-bold text-xl">{review.rating}</div>
//           <h2 className="text-3xl">{review.title}</h2>
//           <p className="text-gray-500">{review.body[0].children[0].text}</p>
//           <Link to={`/review/${review.id}`} className="bg-blue-500">
//             Read More
//           </Link>
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      body
      rating
      documentId
      image {
        url
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  console.log(data);

  return (
    <div>
      {data.reviews.map((review) => (
        <div key={review.documentId} className="">
          <div className="font-bold text-xl">{review.rating}</div>
          <h2 className="text-3xl">{review.title}</h2>
          <p className="text-gray-500">{review.body[0].children[0].text}</p>
          <img src={`http://localhost:1337/${review.image.url}`} alt="" />
          <Link to={`/review/${review.documentId}`} className="bg-blue-500">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;

import React from "react";
import { useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query GetReview($documentId: ID!) {
    review(documentId: $documentId) {
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

const Review = () => {
  const { documentId } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { documentId: documentId },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;
  
  return (
    <div className="">
      <img src={`http://localhost:1337/${data.review.image.url}`} alt="" />
      <div className="font-bold text-xl">{data.review.rating}</div>
      <h2 className="text-3xl">{data.review.title}</h2>
      <p className="text-gray-500">{data.review.body[0].children[0].text}</p>
    </div>
  );
};

export default Review;

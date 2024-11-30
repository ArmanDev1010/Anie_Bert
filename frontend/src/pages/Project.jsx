import React from "react";
import { useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const PROJECT = gql`
  query GetProject($documentId: ID!) {
    hero(documentId: $documentId) {
      project_address
      type
      documentId
      image {
        url
      }
    }
  }
`;

const Project = () => {
  const { documentId } = useParams();
  const { loading, error, data } = useQuery(PROJECT, {
    variables: { documentId: documentId },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  console.log(data);

  return <div className=""></div>;
};

export default Project;

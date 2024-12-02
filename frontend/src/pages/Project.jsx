import React from "react";
import { useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";
import { Navbar } from "../components";

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

  return (
    <div className="bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[100px]"></div>
      <div className="px-[64px]">
        <p className="">{data.hero.project_address}</p>
      </div>
    </div>
  );
};

export default Project;

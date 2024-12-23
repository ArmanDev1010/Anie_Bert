import React from "react";
import { Link } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const TEAM = gql`
  query GetTeam {
    teams {
      name
      role
      photo {
        url
      }
    }
  }
`;

const Team = () => {
  const { loading, error, data } = useQuery(TEAM);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const team = data.teams;

  return (
    <div className="team relative px-[5vw] pt-[3vh] pb-[8vh] bg-secondary text-white">
      <div className="relative z-[1]">
        <div className="pointer-events-none mb-[40px]">
          <div className="text-[6vw] font-[600]">The Team</div>
          <p className="text-xl w-[700px]">
            Our team consists of gifted professionals who release all projects
            as their personal creative achievements with the best results
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-7">
          {team.map((text, key) => (
            <li key={key} className="group relative pb-2">
              <Link to={``}>
                <div
                  className="h-[30vw] relative wrap overflow-hidden mb-5 bg-cover bg-center bg-no-repeat group-hover:rounded-[20px] transition-[cubic-bezier(.165,.84,.44,1)] duration-[0.6s]"
                  style={{
                    backgroundImage: `url(http://localhost:1337/${text.photo.url})`,
                  }}
                ></div>
                <div className="">
                  <p className="text-2xl mb-3 font-[600]">{text.name}</p>
                  <p>{text.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;

import React from "react";
import { Link } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";

const TEAM = gql`
  query GetTeam($locale: I18NLocaleCode) {
    teams(sort: "order", locale: $locale) {
      documentId
      name
      role
      social_media_link
      photo {
        url
      }
    }
    fallback: teams(sort: "order", locale: "en") {
      documentId
      name
      role
      social_media_link
      photo {
        url
      }
    }
  }
`;

const Team = () => {
  const { t, i18n } = useTranslation();

  const { loading, error, data } = useQuery(TEAM, {
    variables: {
      locale: i18n.language === "am" ? "hy" : i18n.language,
    },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const team = [...(data.teams || []), ...(data.fallback || [])].reduce(
    (acc, current) => {
      if (!acc.find((team_) => team_.documentId === current.documentId)) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  if (!team.length) {
    return <p>No data available for this service.</p>;
  }

  return (
    <div className="team relative px-[5vw] py-[8vh] bg-secondary text-white max-_700:py-[5vh]">
      <div className="relative z-[1]">
        <div className="pointer-events-none mb-[60px] max-_900:mb-[50px] max-_550:mb-[40px]">
          <div className="text-8xl font-[600] mb-7 max-_900:text-7xl max-_550:text-[12vw]">
            {t("about.page.team.title")}
          </div>
          <p className="text-xl max-w-[700px] max-_700:text-lg max-_550:text-base">
            {t("about.page.team.paragraph")}
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-7 max-_1080:grid-cols-2 max-_700:grid-cols-1">
          {team.map((text, key) => (
            <li key={key} className="group relative pb-2">
              <Link to={text.social_media_link}>
                <div
                  className="gray_filter h-[30vw] relative wrap overflow-hidden mb-5 bg-cover bg-center bg-no-repeat group-hover:rounded-[20px] transition-[cubic-bezier(.165,.84,.44,1)] duration-[0.6s]
                  max-_1080:h-[50vw] max-_700:h-[70vw] max-_550:h-[80vw]"
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
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none bg-cover bg-no-repeat opacity-20 z-[0]"
        style={{
          backgroundImage: "url(/src/assets/patterns/line-grid_white.png)",
        }}
      ></div>
    </div>
  );
};

export default Team;

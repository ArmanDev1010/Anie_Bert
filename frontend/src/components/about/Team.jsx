import React from "react";
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div className="team relative px-[5vw] pt-[3vh] pb-[8vh] bg-secondary text-white">
      <div className="relative z-[1]">
        <div className="pointer-events-none mb-[25px]">
          <div className="text-[7vw] font-[600]">The Team</div>
        </div>
        <ul className="grid grid-cols-3 gap-7">
          {["", "", ""].map((text, key) => (
            <li key={key} className="group relative pb-2">
              <Link to={``}>
                <div
                  className="h-[30vw] relative wrap overflow-hidden mb-5 bg-cover bg-center bg-no-repeat group-hover:rounded-[20px] transition-[cubic-bezier(.165,.84,.44,1)] duration-[0.6s]"
                  style={{
                    backgroundImage: `url(https://scontent.fevn7-1.fna.fbcdn.net/v/t39.30808-6/468074606_18044321918327455_1257900121577472956_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RknoGkXwjQ0Q7kNvgH5Yfw_&_nc_oc=AdioUI2YqkVFBTB1pQZa3_eUxFeKda2hBQdX3eVeCAD0j_rRtMmp8GG9zltj6w9rBa8&_nc_zt=23&_nc_ht=scontent.fevn7-1.fna&_nc_gid=AewY7C6BymWBT8gLC57GHxi&oh=00_AYDWSCvx7ZYJTwb5miZuZ0ftaHKeet6TZbt-9Q9G5-RUzQ&oe=676F12C2)`,
                  }}
                ></div>
                <div className="">
                  <p className="text-2xl mb-3 font-[600]">Ani Sahakyan</p>
                  <p>Founder</p>
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

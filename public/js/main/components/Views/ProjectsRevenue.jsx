import React from "react";
import { clsx } from "clsx";
import "../../../../css/tailwind-output.css";

export default function TopCountries() {
  const Countrydata = [
    { name: "USA", rise: true, value: 21942.83, id: 1, code: "us" },
    { name: "Kenya", rise: false, value: 19710.0, id: 2, code: "ke" },
    { name: "India", rise: false, value: 12320.3, id: 3, code: "in" },
    { name: "Sweden", rise: true, value: 9725.0, id: 4, code: "se" },
  ];

  function Icon({ path, className = "w-4 h-4" }) {
    // Adjust the src attribute to match the actual path of your SVG icons
    return <img src={`../../../../assets/svg/res-${path}.svg`} alt="" className={clsx(className)} />;
  }

  function Image({ path, className = "w-4 h-4 rounded-full" }) {
    // Adjust the src attribute to match the actual path of your JPG images
    return <img src={`../../../../assets/svg/countries/${path}.svg`} alt="" className={clsx(className)} />;
  }

  return (
    <div className="flex p-4 flex-col h-full" style={{ fontFamily: "var(--font-1)" }}>
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Top Countries</div>
        <Icon path="thin-star" className="w-6 h-6" />
      </div>
      <div className=""></div>
      {Countrydata.map(({ name, code, rise, value, id }) => (
        <div className="flex items-center mt-3" key={id}>
          <div>{id}</div>
          <Image path={`${code}`} className="ml-2 w-6 h-6" />
          <div className="ml-2">{name}</div>
          <div className="flex-grow" />
          <div>{`$${value.toLocaleString()}`}</div>
          <Icon path={rise ? "country-up" : "country-down"} className="w-4 h-4 mx-3" />
          <Icon path="options" className="w-2 h-2" />
        </div>
      ))}
    </div>
  );
}

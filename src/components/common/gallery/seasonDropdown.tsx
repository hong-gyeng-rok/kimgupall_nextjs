import { useEffect, useState, useRef } from "react";
import { season, SeasonDropdownProps } from "../../../types/seasonDropdown";

const seasons: season[] = [
  {
    value: "25fw",
    label: "25 Fall & Winter",
  },
  {
    value: "25ss",
    label: "25 Spring & Summer",
  },
  {
    value: "24fw",
    label: "24 Fall & Winter",
  },
  {
    value: "24ss",
    label: "24 Spring & Summer",
  },
];

export default function SeasonDropdown({
  onSelectSeason,
}: SeasonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<season>(seasons[0]);
  const dropDownRef = useRef<HTMLDivElement>(null);
  // Ref 기능을 활용하여 버튼 밖이나 버튼 클릭시 자동으로 dropDown이 닫히도록함
  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [dropDownRef]);
  //dropDown 토글 함수
  const handleTogle = () => {
    setIsOpen(!isOpen);
  };
  //dropDown 버튼을 클릭했을 때, 해당 버튼의 value 값을 반환함(onSelectSeason로 props 전달)
  //이를 통해 시즌이 선택되면 props 전달을 통해 하위 컴포넌트나 상위 컴포넌트에 props 전달 가능
  const handleSelect = (season: season) => {
    setSelectedSeason(season);
    onSelectSeason(season.value);
    setIsOpen(false);
  };

  return (
    <nav
      data-testid="SeasonDropdownSection"
      className="relative inline-block text-left min-[350px]:w-fit
            md:w-xs p-1 px-4 bg-white text-black shadow-xl/50 rounded"
      ref={dropDownRef}
    >
      <button
        className="w-full rounded hover:ring-2 hover:ring-stone-300 hover:bg-stone-200"
        type="button"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={handleTogle}
      >
        {selectedSeason.label}
      </button>
      {isOpen && (
        <span
          className="relative"
          role="menu-button"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <span
            className="absolute w-full bg-white flex flex-col justify-center py-1 mt-1"
            role="none"
          >
            {seasons.map((season) => (
              <button
                className="shadow-xl p-2 rounded hover:ring-2 hover:ring-stone-300 hover:bg-stone-200"
                key={season.value}
                onClick={() => handleSelect(season)}
                role="menuitem"
              >
                {season.label}
              </button>
            ))}
          </span>
        </span>
      )}
    </nav>
  );
}

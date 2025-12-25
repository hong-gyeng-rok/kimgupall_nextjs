"use client";

import { useState, useEffect } from "react";
import GalleryContents from "../common/gallery/galleryContents";
import GalleryNavBtn from "../common/gallery/galleryNavBtn";
import SeasonDropdown from "../common/gallery/seasonDropdown";
import { ImageItems } from "../../types/imageData";
import { IsShow } from "../../types/common";

//isShow를 통해 home 페이지에선 불필요한 navigation 컴포넌트 랜더링 안하도록 설정 (초기값은 보여지도록 * gallery 페이지 진입시 navigation이 보여지도록하기 위함)
export default function GalleryContainer({ isShow = true }: IsShow) {
  // const [currentSeason, setCurrentSeason] = useState<string>("25fw"); //최신 자료를 보여주기 위해 기본 값을 25fw로 설정
  // const [filteredImages, setFilteredImages] = useState<ImageItems[]>([]);
  // const allimageData = useImageData();

  // useEffect(() => {
  //   if (allimageData && allimageData[currentSeason]) {
  //     setFilteredImages(allimageData[currentSeason]);
  //   } else {
  //     setFilteredImages([]); // 에러처리 현재 선택된 시즌이 없다면 빈 배열 반환
  //   }
  // }, [currentSeason, allimageData]);
  //
  // // SeasonDropdown 버튼 클릭시 25ss, 25fw와 같은 값을 반환하도록함, 이 값을 currentSeason에 할당함
  // const handleSeasonChange = (seasonValue: string) => {
  //   setCurrentSeason(seasonValue);
  // };

  return (
    <section className="p-4">
      {isShow && (
        <div className="flex justify-between mb-4">
          {/*<SeasonDropdown onSelectSeason={handleSeasonChange} />*/}
          <GalleryNavBtn />
        </div>
      )}
      {/*<GalleryContents filteredImages={filteredImages} />*/}
      <GalleryContents />
    </section>
  );
}

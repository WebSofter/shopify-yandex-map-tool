import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { YMaps, useYMaps } from "@pbe/react-yandex-maps";

import {
    reactExtension,
    Banner,
    BlockStack,
    Checkbox,
    Text,
    useApi,
    useApplyAttributeChange,
    useInstructions,
    useTranslate,
    View,
  } from "@shopify/ui-extensions-react/checkout";

// import "./style.css";

const CustomMap = () => {
  const mapRef = useRef(null);
  const ymaps = useYMaps(["Map", "Placemark", "control.SearchControl"]);
  const center = [55.76, 37.64];

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center,
      zoom: 12,
    });

    const placemark = new ymaps.Placemark(map.getCenter());
    const searchControl = new ymaps.control.SearchControl({
      options: {
        provider: "yandex#search",
      },
    });

    console.log("%cymaps: ", "color: green", ymaps, map, placemark);

    map.controls.add(searchControl);
    map.geoObjects.add(placemark);
  }, [ymaps]);

  return <View ref={mapRef} style={{ width: "620px", height: "440px" }}></View>;
};

export default function App(){
    return <YMaps query={{ lang: "ru_RU", apiKey: "" }}>
        <CustomMap />
    </YMaps>
  };
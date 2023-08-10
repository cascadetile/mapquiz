/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ResultModal } from '../../components/ResultModal';
import './style.css';

const streets = [
  'Al-Farabi',
  'Seifullin',
  'Timiryazev',
  'Tole-Bi',
  'Abay',
  'Dostyk',
  'Rozybaki',
  'Zharokov',
  'Shevchenko',
  'Zhambyl',
  'Satpay',
  'Gogol',
  'Furmanov',
  'Makatay',
  'Zholdasbek',
  'Zheltoksan',
  'Zhandos',
  'Mukan',
  'Kurmangazy',
  'Kabanbay-batyr',
  'Baitursyn',
  'Bukhar-Zhyrau',
  'Gagarin',
  'Auez',
  'Manas',
  'Kunay',
  'Kazybek-bi',
  'Zhybek-zholy',
  'Abylai-khan',
  'Nauryzbai-batyr',
  'Utep',
  'Khodzha',
  'Bogenbai-batyr',
  'Aiteke-bi',
  'Karasai-batyr',
  'Pushkin',
  'Bayzak',
  'Masanchi',
];

function shuffle(array: string[]) {
  const arrCopy = [...array];
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [arrCopy[currentIndex], arrCopy[randomIndex]] = [arrCopy[randomIndex], arrCopy[currentIndex]];
  }

  return arrCopy;
}

export const Main: React.FC = () => {
  const [shuffledStreets, setShuffledStreets] = useState<string[]>([]);
  const [currentStreetIndex, setCurrentStreetIndex] = useState(0);
  const [amountOfAllClicks, setAmountOfAllClicks] = useState(0);
  const [amountOfGuessedStreets, setAmountOfGuessedStreets] = useState(0);
  const [amountOfWrongGuessesForThisStreet, setAmountOfWrongGuessesForThisStreet] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    const shuffled = shuffle(streets);
    setShuffledStreets(shuffled);
  }, []);

  const spotlightTheStreet = (streetName: string) => {
    const street = document.querySelector(`path[data-street-name=${streetName}]`);
    if (street) {
      (street as HTMLElement).classList.add('street__spotlight');
    }
  };

  const stopSpotlightingTheStreet = (streetName: string) => {
    const street = document.querySelector(`path[data-street-name=${streetName}]`);
    if (street) {
      (street as HTMLElement).classList.remove('street__spotlight');
    }
  };

  const streetClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!isGameFinished) {
      const street = (event.target as HTMLElement).closest('path');

      if (!street) return;

      const amountOfGuessedStreetsNewValue = amountOfGuessedStreets + 1;
      if (street.dataset.streetName === shuffledStreets[currentStreetIndex]) {
        setAmountOfWrongGuessesForThisStreet(0);
        stopSpotlightingTheStreet(shuffledStreets[currentStreetIndex]);
        street.style.fill = 'green';
        setAmountOfGuessedStreets(amountOfGuessedStreetsNewValue);
        if (currentStreetIndex + 1 <= shuffledStreets.length - 1) {
          setCurrentStreetIndex(currentStreetIndex + 1);
        }
      } else {
        const amountOfWrongGuessesForThisStreetNewValue = amountOfWrongGuessesForThisStreet + 1;
        setAmountOfWrongGuessesForThisStreet(amountOfWrongGuessesForThisStreetNewValue + 1);
        if (amountOfWrongGuessesForThisStreetNewValue > 3) {
          spotlightTheStreet(shuffledStreets[currentStreetIndex]);
        }
      }

      setAmountOfAllClicks(amountOfAllClicks + 1);

      if (amountOfGuessedStreetsNewValue === shuffledStreets.length) {
        setIsGameFinished(true);
      }
    }
  };

  const restoreStreetDefaultColors = () => {
    const svgLayer = document.getElementById('svg-layer');
    if (svgLayer) {
      /* eslint-disable-next-line */
      for (const street of svgLayer.children) {
        if ((street as HTMLElement).dataset.streetName) {
          (street as HTMLElement).style.fill = '#D9D9D9';
        }
      }
    }
  };

  const restartTheGame = () => {
    const shuffled = shuffle(streets);
    setShuffledStreets(shuffled);
    setCurrentStreetIndex(0);
    setAmountOfAllClicks(0);
    setAmountOfGuessedStreets(0);
    setIsGameFinished(false);
    restoreStreetDefaultColors();
  };

  return (
    <div>
      {
        isGameFinished
        && (
          <ResultModal
            restart={restartTheGame}
            accuracy={(amountOfGuessedStreets / amountOfAllClicks) * 100}
          />
        )
      }
      <div>
        Click on
        &nbsp;
        {shuffledStreets[currentStreetIndex]}
      </div>
      <div className="map__wrapper">
        <svg onClick={(event) => streetClickHandler(event)} id="svg-layer" className="map__svg-layer" xmlns="http://www.w3.org/2000/svg" width="4652" height="4766" viewBox="0 0 4652 4766" fill="none">
          <path data-street-name="Tole-Bi" d="M221 1539.5L4652 1115V1140.5L221 1564.5V1539.5Z" fill="#D9D9D9" />
          <path data-street-name="Abay" d="M3663 2012.5L3666.5 2038L377.5 2342L0.5 2422V2398L377.5 2316L3663 2012.5Z" fill="#D9D9D9" />
          <path data-street-name="Rozybaki" d="M414 1044.5L774.5 4766H731.5L389 1048L414 1044.5Z" fill="#D9D9D9" />
          <path data-street-name="Zharokov" d="M917 1477.5L1223.5 4598.5L1307 4764.5H1269L1193.5 4612L893 1479.5L917 1477.5Z" fill="#D9D9D9" />
          <path data-street-name="Timiryazev" d="M427.5 3197C427.5 3197 1844 3055.5 1898.5 3053.5C1953 3051.5 2284.5 3057.5 2303 3051C2321.5 3044.5 2946 2511 2946 2511L2965 2530C2965 2530 2337 3067 2312 3074C2287 3081 1947 3076 1898.5 3077.5C1850 3079 429.5 3220.5 429.5 3220.5L427.5 3197Z" fill="#D9D9D9" />
          <path data-street-name="Seifullin" d="M2791.5 2963.5C2814 3013 3070.5 3265 3070.5 3265L3051.5 3284C3051.5 3284 2797 3023 2769 2979.5C2741 2936 2608.5 2324.5 2604.5 2284.5C2600.5 2244.5 2412 26.5 2412 26.5H2428C2428 26.5 2626 2253.5 2628.5 2283C2631 2312.5 2769 2914 2791.5 2963.5Z" fill="#D9D9D9" />
          <path data-street-name="Dostyk" d="M3712.5 2428C3720 2507 3953 3315 3953 3315H3916C3916 3315 3686 2518 3677.5 2434C3669 2350 3557.5 1113.5 3557.5 1113.5L3587 1110.5C3587 1110.5 3705 2349 3712.5 2428Z" fill="#D9D9D9" />
          <path data-street-name="Al-Farabi" d="M4586.5 1909V1996C4586.5 1996 4209.5 2886 4146.5 2920C4083.5 2954 3144 2987 3056.5 3017C2969 3047 1661 4315 1661 4315L1648.5 4550L1484 4704L1289.5 4732L1275.5 4699.5L1454 4674.5L1612 4523.5L1627.5 4293.5C1627.5 4293.5 2928.5 3003 3041 2972.5C3153.5 2942 4077.5 2900 4123.5 2864C4169.5 2828 4586.5 1909 4586.5 1909Z" fill="#D9D9D9" />
          <path data-street-name="Shevchenko" d="M3766 1737L3772.5 1776.5L500 2082.5L496.5 2054.5L3766 1737Z" fill="#D9D9D9" />
          <path data-street-name="Zhambyl" d="M3550.5 1649.5L3552.5 1686L486 1973.5V1943.5L3550.5 1649.5Z" fill="#D9D9D9" />
          <path data-street-name="Satpay" d="M2.5 2604.5C2.5 2604.5 1417.5 2480 1476 2458.5C1534.5 2437 1566.5 2373 1623 2370C1679.5 2367 1700 2419 1765.5 2426C1831 2433 3688.5 2233.5 3688.5 2233.5V2267.5C3688.5 2267.5 1792.5 2476 1742 2467.5C1691.5 2459 1674 2411 1623 2416C1572 2421 1553.5 2467.5 1506.5 2488.5C1459.5 2509.5 2.5 2641 2.5 2641V2604.5Z" fill="#D9D9D9" />
          <path data-street-name="Gogol" d="M1081 1139.5L4036 837.5V873.5L1085 1170.5L1081 1139.5Z" fill="#D9D9D9" />
          <path data-street-name="Furmanov" d="M3101.5 149L3383.5 2986H3326.5L3067 149L3101.5 0.5H3139L3101.5 149Z" fill="#D9D9D9" />
          <path data-street-name="Makatay" d="M1665 813.5L3898 588.5V628L1669 850L1665 813.5Z" fill="#D9D9D9" />
          <path d="M4179 509L4285 545L4346 526.5L4381 590.5L4371.5 715L4403.5 831.5L4387.5 973L4309.5 957L4293.5 1044.5L4341 1058.5L4352 1108L4322 1134L4233 1153L4085 1164L4048 1103.5L4060.5 1035H4085L4094.5 919L4048 890L4135.7 584L4179 509Z" fill="#99EB92" />
          <path data-street-name="Zholdasbek" d="M3293 2613.5L3742 2567.5L3750 2590.5L3293 2635V2613.5Z" fill="#D9D9D9" />
          <path data-street-name="Zheltoksan" d="M2786 294L2984 2525.5H2954.5L2753 294H2786Z" fill="#D9D9D9" />
          <path data-street-name="Zhandos" d="M833.5 2841L115 3499.5H58L818.5 2807.5L1409 2501.5L1513 2491L833.5 2841Z" fill="#D9D9D9" />
          <path data-street-name="Mukan" d="M1666 877L1565.5 667H1524.5L1629.5 877L1761 2185.5H1789.5L1666 877Z" fill="#D9D9D9" />
          <path data-street-name="Kurmangazy" fillRule="evenodd" clipRule="evenodd" d="M3794.5 1880V1842.5L1750.5 2041V2078L3794.5 1880ZM1190 2143.5L1186.5 2100.5L504 2161.5V2200L1190 2143.5Z" fill="#D9D9D9" />
          <path data-street-name="Kabanbay-batyr" fillRule="evenodd" clipRule="evenodd" d="M4203 1477.5L2388.5 1659L2391 1690L4206 1506L4203 1477.5ZM946 1792L2231 1669.5L2233 1700.5L948.5 1818.5L946 1792ZM421 1844L836 1805L838.5 1831.5L424 1870.5L421 1844Z" fill="#D9D9D9" />
          <path data-street-name="Baitursyn" d="M2169.5 764.5L2330 2457L2699 2841L2679.5 2860L2298 2478.5L2126.5 768.5L2169.5 764.5Z" fill="#D9D9D9" />
          <path data-street-name="Bukhar-Zhyrau" d="M1022.5 2815.5L1982.5 2716.5L2317 2444.5L2340 2470.5L2001.5 2747L1025 2844.5L1022.5 2815.5Z" fill="#D9D9D9" />
          <path data-street-name="Gagarin" fillRule="evenodd" clipRule="evenodd" d="M696.5 1498L661 1501.5L783.5 2848L829.5 2843.5L696.5 1498ZM1001.5 4761.5L856 3155.5L819 3159L963 4761.5H1001.5Z" fill="#D9D9D9" />
          <path data-street-name="Auez" d="M1066.5 1103.5L900.5 772L929.5 758L1099 1083L1298 3133.5L1268 3136.5L1066.5 1103.5Z" fill="#D9D9D9" />
          <path data-street-name="Manas" d="M1390 1861L1509 3110.5L1470.5 3114L1358 1864L1390 1861Z" fill="#D9D9D9" />
          <path data-street-name="Kunay" d="M3267.5 249L3442 2058L3399.5 2061.5L3232.5 253L3267.5 249Z" fill="#D9D9D9" />
          <path data-street-name="Kazybek-bi" d="M1207 1336.5L4010 1070L4012.5 1098.5L1209.5 1363L1207 1336.5Z" fill="#D9D9D9" />
          <path data-street-name="Zhybek-zholy" fillRule="evenodd" clipRule="evenodd" d="M4084.5 711L4087 740L2321.5 899L2319.5 871L4084.5 711ZM2002.5 900.5L2006 928.5L1837 944.5L1834 918.5L2002.5 900.5ZM1726 958L1717.5 931L1640 940.5L1643.5 965.5L1726 958Z" fill="#D9D9D9" />
          <path data-street-name="Abylai-khan" d="M2847.5 158L3034 2095L2998 2098.5L2814.5 161.5L2847.5 158Z" fill="#D9D9D9" />
          <path data-street-name="Nauryzbai-batyr" d="M2623 319.5L2841 2630L2804.5 2633.5L2592.5 322.5L2623 319.5Z" fill="#D9D9D9" />
          <path data-street-name="Utep" d="M434.5 3613.5L439.5 3652L1120.5 3572.5L1230.5 3608L1225.5 3572.5L1116 3534L434.5 3613.5Z" fill="#D9D9D9" />
          <path data-street-name="Khodzha" d="M608 4136.5L610.5 4169.5L981 4133L1020 4149L1375.5 4112L1411.5 4198L1657.5 4397V4366L1435.5 4184.5L1394 4081.5L1017 4118.5L983.5 4102.5L608 4136.5Z" fill="#D9D9D9" />
          <path data-street-name="Bogenbai-batyr" fillRule="evenodd" clipRule="evenodd" d="M4389.5 1248.5L2375.5 1447V1467.5L4389.5 1274.5V1248.5ZM2196.5 1466L2199 1488L2329 1473.5L2326.5 1452L2196.5 1466ZM1816.5 1523L1814 1501L2141.5 1472.5L2143.5 1494L1816.5 1523ZM1182 1557L1185 1587L1790 1529L1787 1504L1182 1557ZM274.5 1639L277.5 1676.5L1147 1593.5L1144 1561L274.5 1639Z" fill="#D9D9D9" />
          <path data-street-name="Aiteke-bi" fillRule="evenodd" clipRule="evenodd" d="M4025 961.5L3715 988.5L3717.5 1013L4027.5 986L4025 961.5ZM2163.5 1131.5L3252.5 1035L3254 1057.5L2166 1154L2163.5 1131.5ZM2104 1140.5L2021 1148.5L2023 1172L2106 1163.5L2104 1140.5ZM1943 1156.5L1200 1225L1203 1251L1947 1181.5L1943 1156.5Z" fill="#D9D9D9" />
          <path data-street-name="Karasai-batyr" fillRule="evenodd" clipRule="evenodd" d="M3831.5 1402.5L3754.5 1407.5L3757.5 1445L3835.5 1439.5L3831.5 1402.5ZM3345.5 1449.5L3446 1442L3450 1477.5L3349 1485L3345.5 1449.5ZM3228 1458.5L3112 1470.5L3115 1504.5L3232.5 1494L3228 1458.5ZM2434.5 1544L219 1744.5V1785L2438.5 1580.5L2434.5 1544Z" fill="#D9D9D9" />
          <path data-street-name="Pushkin" fillRule="evenodd" clipRule="evenodd" d="M3496.5 926L3437 230.5L3403.5 233.5L3468 929L3496.5 926ZM3590 2000L3519 1223.5L3490 1226L3560 2002.5L3590 2000Z" fill="#D9D9D9" />
          <path data-street-name="Bayzak" fillRule="evenodd" clipRule="evenodd" d="M1603.5 1837L1516.5 1005L1519 680H1496.5L1491.5 1000L1576.5 1839L1603.5 1837ZM1625 2415.5L1683.5 2562.5L1727.5 3093L1757.5 3090L1706 2553.5L1654.5 2421.5L1714.5 2173L1633.5 1833.5L1605 1836L1683.5 2182L1625 2415.5Z" fill="#D9D9D9" />
          <path data-street-name="Masanchi" fillRule="evenodd" clipRule="evenodd" d="M2374.5 1249.5L2325.5 749L2299.5 751L2348 1252L2374.5 1249.5ZM2489 2396L2382 1333.5L2358.5 1336L2456.5 2399.5L2489 2396Z" fill="#D9D9D9" />
        </svg>
      </div>
    </div>
  );
};

export default Main;

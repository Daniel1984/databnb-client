import HouseImg from '../assets/house3.png';
import HouseImgShadow from '../assets/house3_shadow.png';

const houseIcon = L.icon({ // eslint-disable-line  no-undef
  iconUrl: HouseImg,
  shadowUrl: HouseImgShadow,
  iconSize: [35, 35],
  shadowSize: [35, 35],
  iconAnchor: [17, 17],
  shadowAnchor: [13, 17],
  popupAnchor: [0, -17],
});

export default houseIcon;

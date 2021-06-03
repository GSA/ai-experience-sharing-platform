/** istanbul ignore file */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faSquare,
  faDotCircle,
  faCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheckSquare as faCheckSquareSolid,
  faSquare as faSquareSolid,
  faDotCircle as faDotCircleSolid,
  faCircle as faCircleSolid,
  faList as faListSolid,
  faSearch as faSearchSolid,
  faTimes as faTimesSolid,
  faBars as faBarsSolid,
  faCheck as faCheckSolid,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  library.add(
    faCheckSquare,
    faSquare,
    faDotCircle,
    faCircle,

    faCheckSquareSolid,
    faSquareSolid,
    faDotCircleSolid,
    faCircleSolid,
    faListSolid,
    faSearchSolid,
    faTimesSolid,
    faBarsSolid,
    faCheckSolid,
  );
};

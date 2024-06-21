import {name} from "../../package.json";

export const getStaticUrl = (path: string) => (
  `/${name}${path}`
);

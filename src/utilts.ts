import { AnyObject } from "./types";
import { version } from "../package.json";

export const LIBRARY_NAME = "@june-so/analytics-node";

export const enhanceContext = (context: AnyObject): AnyObject => {
  return {
    ...context,
    library: {
      name: LIBRARY_NAME,
      version,
    },
  };
};

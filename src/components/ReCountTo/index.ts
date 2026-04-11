import reNormalCountTo from "./src/normal";
import reboundCountTo from "./src/rebound";
import { withInstall } from "@pureadmin/utils";

/** 普通数字動畫組件 */
const ReNormalCountTo = withInstall(reNormalCountTo);

/** 回彈式数字動畫組件 */
const ReboundCountTo = withInstall(reboundCountTo);

export { ReNormalCountTo, ReboundCountTo };

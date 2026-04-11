import control from "./src/Control.vue";
import nodePanel from "./src/NodePanel.vue";
import dataDialog from "./src/DataDialog.vue";
import { withInstall } from "@pureadmin/utils";

/** LogicFlow流程圖-控制面板 */
const Control = withInstall(control);

/** LogicFlow流程圖-拖拽面板 */
const NodePanel = withInstall(nodePanel);

/** LogicFlow流程圖-查看數據 */
const DataDialog = withInstall(dataDialog);

export { Control, NodePanel, DataDialog };

// LogicFlow流程圖文档：http://logic-flow.org/

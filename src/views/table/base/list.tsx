import Base from "./base.vue";
import Stripe from "./stripe.vue";
import Border from "./border.vue";
import Status from "./status.vue";
import FixHeader from "./fixHeader.vue";
import FixColumn from "./fixColumn.vue";
import FluidHeight from "./fluidHeight.vue";
import GroupHeader from "./groupHeader.vue";
import Radio from "./radio.vue";
import MultipleChoice from "./multipleChoice.vue";
import Sortable from "./sortable.vue";
import Filters from "./filters.vue";
import ColumnTemplate from "./column-template/index.vue";
import HeaderRenderer from "./header-renderer/index.vue";
import Expand from "./expand.vue";
import TreeTable from "./tree.vue";
import TotalRow from "./totalRow.vue";
import Merge from "./merge.vue";
import CustomIndex from "./customIndex.vue";
import Layout from "./layout.vue";
import NestProp from "./nestProp.vue";
import ImgPreview from "./imgPreview.vue";

const rendContent = (val: string) =>
  `程式碼位置：src/views/table/base/${val}.vue`;

export const list = [
  {
    key: "base",
    content: rendContent("base"),
    title: "基礎表格",
    component: Base
  },
  {
    key: "stripe",
    content: rendContent("stripe"),
    title: "帶斑马纹表格",
    component: Stripe
  },
  {
    key: "border",
    content: rendContent("border"),
    title: "帶边框表格",
    component: Border
  },
  {
    key: "status",
    content: rendContent("status"),
    title: "帶狀態表格",
    component: Status
  },
  {
    key: "fixHeader",
    content: rendContent("fixHeader"),
    title: "固定表頭",
    component: FixHeader
  },
  {
    key: "fixColumn",
    content: rendContent("fixColumn"),
    title: "固定列",
    component: FixColumn
  },
  {
    key: "fixColumnHeader",
    content: rendContent("fixColumn"),
    title: "固定列和表頭",
    component: () => <FixColumn height={"360"} />
  },
  {
    key: "groupHeader",
    content: rendContent("groupHeader"),
    title: "多級表頭（表頭分組）",
    component: GroupHeader
  },
  {
    key: "fluidHeight",
    content: rendContent("fluidHeight"),
    title: "流体高度",
    component: FluidHeight
  },
  {
    key: "radio",
    content: rendContent("radio"),
    title: "單選",
    component: Radio
  },
  {
    key: "multipleChoice",
    content: rendContent("multipleChoice"),
    title: "多選",
    component: MultipleChoice
  },
  {
    key: "sortable",
    content: rendContent("sortable"),
    title: "排序和格式化",
    component: Sortable
  },
  {
    key: "filters",
    content: rendContent("filters"),
    title: "筛选",
    component: Filters
  },
  {
    key: "column-template",
    content: rendContent("column-template/index"),
    title: "自定義列模板",
    component: ColumnTemplate
  },
  {
    key: "header-renderer",
    content: rendContent("header-renderer/index"),
    title: "自定義表頭",
    component: HeaderRenderer
  },
  {
    key: "expand",
    content: rendContent("expand"),
    title: "展開行",
    component: Expand
  },
  {
    key: "tree",
    content: rendContent("tree"),
    title: "树形數據与懒加載",
    component: TreeTable
  },
  {
    key: "totalRow",
    content: rendContent("totalRow"),
    title: "表尾合计行",
    component: TotalRow
  },
  {
    key: "merge",
    content: rendContent("merge"),
    title: "合併行或列",
    component: Merge
  },
  {
    key: "customIndex",
    content: rendContent("customIndex"),
    title: "自定義索引",
    component: CustomIndex
  },
  {
    key: "layout",
    content: rendContent("layout"),
    title: "表格布局",
    component: Layout
  },
  {
    key: "nestProp",
    content: rendContent("nestProp"),
    title: "多種數據格式（深層結构）",
    component: NestProp
  },
  {
    key: "imgPreview",
    content: rendContent("imgPreview"),
    title: "圖像預覽",
    component: ImgPreview
  }
];

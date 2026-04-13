import { $t } from "@/plugins/i18n";
import { form } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/form",
  redirect: "/form/index",
  meta: {
    icon: "ri/edit-box-line",
    title: $t("menus.pureSchemaForm"),
    rank: form
  },
  children: [
    {
      path: "/form/index",
      name: "SchemaForm",
      component: () => import("@/views/schema-form/index.vue"),
      meta: {
        title: $t("menus.pureSchemaForm"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;

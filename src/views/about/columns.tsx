export function useColumns() {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { version, engines } = pkg;
  const columns = [
    {
      label: "目前版本",
      minWidth: 100,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="text-base!">
            {version}
          </el-tag>
        );
      }
    },
    {
      label: "最後編譯時間",
      minWidth: 120,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="text-base!">
            {lastBuildTime}
          </el-tag>
        );
      }
    },
    {
      label: "推薦 node 版本",
      minWidth: 140,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="text-base!">
            {engines.node}
          </el-tag>
        );
      }
    },
    {
      label: "推薦 pnpm 版本",
      minWidth: 140,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="text-base!">
            {engines.pnpm}
          </el-tag>
        );
      }
    },
    {
      label: "完整版代碼地址",
      minWidth: 140,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/pure-admin/vue-pure-admin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">完整版程式碼連結</span>
          </a>
        );
      }
    },
    {
      label: "精簡版代碼地址",
      minWidth: 140,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/pure-admin/pure-admin-thin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">精簡版程式碼連結</span>
          </a>
        );
      }
    },
    {
      label: "文檔地址",
      minWidth: 100,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a href="https://pure-admin.cn/" target="_blank">
            <span style="color: var(--el-color-primary)">文件連結</span>
          </a>
        );
      }
    },
    {
      label: "預覽地址",
      minWidth: 100,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a href="https://pure-admin.github.io/vue-pure-admin" target="_blank">
            <span style="color: var(--el-color-primary)">預覽連結</span>
          </a>
        );
      }
    }
  ];

  return {
    columns
  };
}

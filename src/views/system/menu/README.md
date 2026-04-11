<!-- prettier-ignore-start -->

## 字段含义

| 字段              | 說明                                                         |
| :---------------- | :----------------------------------------------------------- |
| `menuType`        | 選單類型（`0`代表選單、`1`代表`iframe`、`2`代表外鏈、`3`代表按鈕） |
| `parentId`        |                                                              |
| `title`           | 選單名稱（兼容國際化、非國際化，如果用國際化的寫法就必须在根目录的`locales`文件夹下對應添加） |
| `name`            | 路由名稱（必须唯一并且和當前路由`component`字段對應的頁面里用`defineOptions`包起来的`name`保持一致） |
| `path`            | 路由路径                                                     |
| `component`       | 組件路径（传`component`組件路径，那么`path`可以随便寫，如果不传，`component`組件路径會跟`path`保持一致） |
| `rank`            | 選單排序（平台规定只有`home`路由的`rank`才能為`0`，所以后端在返回`rank`的時候需要从非`0`開始 [點選查看更多](https://pure-admin.cn/pages/routerMenu/#%E8%8F%9C%E5%8D%95%E6%8E%92%E5%BA%8F-rank)） |
| `redirect`        | 路由重定向                                                   |
| `icon`            | 選單圖标                                                     |
| `extraIcon`       | 右側圖标                                                     |
| `enterTransition` | 进场動畫（頁面加載動畫）                                     |
| `leaveTransition` | 離场動畫（頁面加載動畫）                                     |
| `activePath`      | 選單激活（將某个選單激活，主要用于通過`query`或`params`传参的路由，當它們通過配置`showLink: false`后不在選單中顯示，就不會有任何選單高亮，而通過設定`activePath`指定激活選單即可获得高亮，`activePath`為指定激活選單的`path`） |
| `auths`           | 權限标识（按鈕級别權限設定）                                 |
| `frameSrc`        | 鏈接地址（需要内嵌的`iframe`鏈接地址）                       |
| `frameLoading`    | 加載動畫（内嵌的`iframe`頁面是否開啟首次加載動畫）           |
| `keepAlive`       | 缓存頁面（是否缓存該路由頁面，開啟后會保存該頁面的整体狀態，刷新后會清空狀態） |
| `hiddenTag`       | 標籤頁（當前選單名稱或自定義信息禁止添加到標籤頁）           |
| `fixedTag`        | 固定標籤頁（當前選單名稱是否固定顯示在標籤頁且不可關閉）           |
| `showLink`        | 選單（是否顯示該選單）                                       |
| `showParent`      | 父級選單（是否顯示父級選單 [點選查看更多](https://pure-admin.cn/pages/routerMenu/#%E7%AC%AC%E4%B8%80%E7%A7%8D-%E8%AF%A5%E6%A8%A1%E5%BC%8F%E9%92%88%E5%AF%B9%E7%88%B6%E7%BA%A7%E8%8F%9C%E5%8D%95%E4%B8%8B%E5%8F%AA%E6%9C%89%E4%B8%80%E4%B8%AA%E5%AD%90%E8%8F%9C%E5%8D%95%E7%9A%84%E6%83%85%E5%86%B5-%E5%9C%A8%E5%AD%90%E8%8F%9C%E5%8D%95%E7%9A%84-meta-%E5%B1%9E%E6%80%A7%E4%B8%AD%E5%8A%A0%E4%B8%8A-showparent-true-%E5%8D%B3%E5%8F%AF)） |

<!-- prettier-ignore-end -->

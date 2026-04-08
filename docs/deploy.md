# WChoice Admin 部署指南 (GitHub Pages)

本文件紀錄了靜態站點自動部署至 GitHub Pages 的配置流程與疑難排解經驗。

## 🛠 1. 環境配置與多帳號處理

若開發環境同時存在多個 GitHub 帳號（如公司與私人帳號），請依照以下步驟確保權限正確：

### A. 設定專案局部身分

在專案根目錄執行，避免污染全域設定：

```powershell
git config --local user.name "wiejiechou"
git config --local user.email "wiejie.chou@gmail.com"
```

### B. 處理 HTTPS 403 權限錯誤

若推送時出現 `Permission denied to <another-user>`，請強制在 Remote URL 中指定使用者名稱：

```powershell
git remote set-url origin https://wiejiechou@github.com/wiejiechou/wchoice-admin.git
```

_推送到 GitHub 時，若跳出視窗請使用 `wiejiechou` 帳號或對應的 Personal Access Token (PAT)。_

---

## 🚀 2. 自動化部署配置 (GitHub Actions)

### A. GitHub 倉庫設定

1. 進入 Repository `Settings > Pages`。
2. 在 **Build and deployment > Source** 選擇 **「GitHub Actions」**。
   > [!IMPORTANT]
   > 必須選擇 GitHub Actions，否則系統會預設從分支 (gh-pages) 抓取，導致 404。

### B. 工作流設定 (`.github/workflows/pages.yml`)

使用 GitHub 官方推薦的部署方式，具備以下優點：

- **正確處理權限**：需宣告 `pages: write` 與 `id-token: write`。
- **處理子路徑問題**：透過 `sed` 指令動態修改 `.env.production` 中的 `VITE_PUBLIC_PATH = /wchoice-admin/`。
- **官方 Action**：使用 `actions/upload-pages-artifact` 與 `actions/deploy-pages`，效能與穩定性最佳。

---

## 🔍 3. 常見問題排解 (Q&A)

#### Q: 為什麼部署成功 (綠色打勾) 但網站顯示 404？

- **原因 1**：GitHub Pages 設定中的 Source 未切換為 GitHub Actions。
- **原因 2**：Pages 伺服器部署需要 1-2 分鐘快取更新。
- **原因 3**：`base` 路徑配置錯誤。請確認 `vite.config.ts` 有正確讀取 `VITE_PUBLIC_PATH`。

#### Q: 推送後 Actions 沒有觸發？

- 請確認 `.github/workflows/pages.yml` 中的 `on.push.branches` 是否與您目前推送的分支名稱（如 `master`）一致。

---

## 📖 相關連結

- **Actions 監控**：[GitHub Actions List](https://github.com/wiejiechou/wchoice-admin/actions)
- **站點網址**：[https://wiejiechou.github.io/wchoice-admin/](https://wiejiechou.github.io/wchoice-admin/)

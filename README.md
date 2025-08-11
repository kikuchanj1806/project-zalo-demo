# Zalo mini app - Angular Monorepo

- [Angular CLI](https://github.com/angular/angular-cli)  17.3.0
- Repo code: https://github.com/

## Reference

- [Angular](https://angular.dev/overview):  17.3.0
- [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html): ~5.4.2
- [Fontawesome](https://fontawesome.com/v6/icons): 6x
- [Javascript](https://www.w3schools.com/js/js_intro.asp): Kiến thức nền tảng để xử lý công việc trong angular
- [RxJS](https://rxjs.dev/guide/operators): ~7.8.0 Thư viện cung cấp các toán tử để xử lý dữ liệu kết hợp với Observer
- Giao diện:  Sử dụng kết hợp Bootstrap
  - [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/): Version 5

## Project structure

- `src/libs/core`: Folder chứa code xử lý logic chung của project không phụ thuộc bất kỳ feature nào.
- `src/libs/shared`: Folder chứa code tái sử dụng trong các feature để tránh việc lặp lại code
- `src/apps`: Folder chứa các app của project.

### Plain text structure

```
.
├─ apps/                                  # Chứa các app con
│  ├─ zalo-app1/                         
│  │  └─ src/
│  │     ├─ .env                          # Biến môi trường riêng cho app
│  │     ├─ app-config.json               # Cấu hình của app
│  │     ├─ tsconfig.app.json             # TS config khi build/chạy app
│  │     └─ tsconfig.spec.json            # TS config cho unit test
│  └─ zalo-app2/                          
│     └─ src/
│        ├─ .env                          # Biến môi trường riêng cho app
│        ├─ app-config.json               # Cấu hình của app
│        ├─ tsconfig.app.json             # TS config khi build/chạy app
│        └─ tsconfig.spec.json            # TS config cho unit test
├─ dist/                                   # Thư mục output sau build
├─ libs/                                   # Libs dùng chung cho nhiều app
│  ├─ core/                               
│  │  ├─ interceptors/                     # HTTP interceptors
│  │  ├─ models/                           # Interfaces/types chung
│  │  ├─ services/                         # Singleton services (Auth, API…)
│  │  ├─ utils/                            # Helpers, tiện ích
│  │  └─ core.module.ts                    
│  └─ share/                               # Thành phần tái sử dụng (UI/logic)
│     ├─ components/                       # Reusable UI components
│     ├─ directives/                       # Reusable directives
│     ├─ models/                           # Models cho layer share
│     ├─ pipes/                            # Reusable pipes
│     ├─ services/                         # Services hỗ trợ cho share
│     ├─ index.ts                          # Barrel file export public API
│     └─ shared-common.module.ts           # NgModule export components/pipes/directives
├─ node_modules/                           # Dependencies cài qua npm/pnpm
├─ .editorconfig                           # Quy ước format code cho editor
├─ .env                                    # Biến môi trường root (dùng chung; app có thể override)
├─ .gitignore                              # Bỏ qua file/thư mục khi commit Git
├─ angular.json                            # Cấu hình Angular workspace
├─ app-config.json                         # Cấu hình mẫu/dùng chung; script đồng bộ vào app con
├─ package.json                            # Metadata, scripts, dependencies
├─ package-lock.json                       # Khóa phiên bản dependencies
├─ README.md                               # Tài liệu dự án
├─ tsconfig.json                           # TS config gốc (các tsconfig khác extends)
├─ update-app-config.js                    # Script đồng bộ/cập nhật app-config cho từng app
├─ webpack.extra.js                        # Webpack override/merge (alias, loader, define env…)
└─ zmp.config.js                           # Cấu hình Zalo Mini App / ZMP CLI (dev, build, pages, plugins)
```

## Chuẩn bị môi trường
- Node.js: khuyến nghị LTS 18.x
- Angular CLI: cài đúng version dự án (ví dụ 17.x): `npm i -g @angular/cli@17.3.0`
- Zalo Mini App CLI (zmp): cài và đăng nhập theo hướng dẫn mới nhất trên developers.zalo.me `npm install -g zmp-cli`
- cross-env (phục vụ build nhiều app): `npm i -D cross-env` (Lưu ý: Với window thì mới cần cài và cần bổ sung thêm cross-env vào build:app1:prod, còn với macos thì không cần)

## Config project

### Setting up localhost
- Checkout code từ repo github về.
- Cài đặt NodeJS ([tải tại đây](https://nodejs.org/en/blog/release/v20.18.1)) để làm máy chủ chạy code.
- Mở folder chứa code hoặc mở code qua IDE
  - Cài đặt package cho dự án: `npm i`.
  - Setup file env cho local đọc trong file: `src/environments/environment.example.ts`
  - Khởi chạy dự án: `npm run start:app1`
### Config môi trường deploy zalo app
- Cần truy cập developers.zalo.me để tạo app trước khi thực hiện các bước tiếp theo
- Trỏ vào app cần config để thực hiện khởi tạo môi trường `zmp init` (thực hiện theo các bước, Lưu ý với bước "What action you want to do?" thì cần chọn "Using ZMP to deploy only" vì dự án hiện đang là dạng chuyển đổi 1 web app thành zalo mini app ) => sau khi chạy xong lệnh thì app sẽ tự tạo app-config và .env
- Gõ lệnh `zmp deploy` để thực hiện deploy app lên zalo.(Thực hiện ở root của project, và lưu ý chỉ thực hiện deploy sau khi đã build production)
  - step1: Chọn deploy your existing project
  - step2: Where is your dist folder? => dist/zalo-app1 (trỏ tới static file)
  - step3: Có 2 option là Development và Testing
    - Development: Sẽ build ứng dụng và tạo ra một mã QR code để bạn có thể scan và test được trên tài khoản zalo sở hữu app. Lưu ý giới hạn 300 phiên bản trong 1 tháng
    - Testing: Sẽ upload ứng dụng lên zalo mini app và có thể share cho user(được cấp quyền) có thể testing. Lưu ý giới hạn 60 phiên bản trong 1 tháng
  - step4: Nhập mô tả deploy
- Lưu ý: 
  - Cần thực hiện build production trước khi deploy zalo app
  - zmp init chỉ chạy 1 lần duy nhất ở bước khởi tạo app (trường hợp muốn update lại config app thì mới thực hiện khởi tạo lại)

### Build production server
- Gõ lệnh `npm run build:app1:prod` sau khi build code sẽ được để trong thư mục `dist/`.
- Gõ lệnh `npm run update-config:zalo-app1` để update file app-config và env tại root (Hiện tại thì zalo mini app chi deploy được khi app-config và env nằm tại root của project)





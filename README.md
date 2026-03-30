# Humble Human — Playwright QA Automation

Bộ test tự động end-to-end cho website [humblehuman.vn](https://humblehuman.vn), sử dụng **Playwright + TypeScript**.  
Thiết kế theo mô hình **Scenario-Driven**: bạn chỉ cần viết test case dưới dạng JSON, hệ thống tự động generate ra code `.spec.ts` để chạy.

---

## Mục lục

- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Workflow sử dụng](#workflow-sử-dụng)
- [Viết Test Case mới](#viết-test-case-mới)
- [Actions hỗ trợ](#actions-hỗ-trợ)
- [Chạy Tests](#chạy-tests)
- [Xem Report](#xem-report)
- [Test Suites hiện có](#test-suites-hiện-có)

---

## Yêu cầu hệ thống

| Tool    | Version |
| ------- | ------- |
| Node.js | ≥ 18    |
| npm     | ≥ 9     |

---

## Cài đặt

```bash
# 1. Clone repo
git clone https://github.com/sontung0511/humblehumanTest.git
cd humblehumanTest

# 2. Cài dependencies
npm install

# 3. Cài Chromium browser
npx playwright install chromium
```

---

## Cấu trúc dự án

```
humblehumanTest/
│
├── scenarios/                  # ✏️  Viết test case tại đây (JSON)
│   ├── template.json           #    Template + tài liệu tất cả actions
│   ├── header.scenarios.json   #    Global Header (Desktop + Mobile)
│   ├── home.scenarios.json     #    Trang chủ
│   ├── collection.scenarios.json  # Trang danh mục sản phẩm
│   ├── product.scenarios.json  #    Trang chi tiết sản phẩm
│   ├── cart.scenarios.json     #    Giỏ hàng
│   ├── search.scenarios.json   #    Tìm kiếm & điều hướng
│   └── login.scenarios.json    #    Đăng nhập / Tài khoản
│
├── tests/generated/            # ⚙️  Auto-generated (không sửa tay)
│   ├── header.spec.ts
│   ├── home.spec.ts
│   ├── collection.spec.ts
│   ├── product.spec.ts
│   ├── cart.spec.ts
│   ├── search.spec.ts
│   └── login.spec.ts
│
├── pages/                      # 📄  Page Object Models
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── CollectionPage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   ├── SearchPage.ts
│   └── LoginPage.ts
│
├── scripts/
│   └── generate-tests.ts       # 🔧  Script sinh code từ JSON scenario
│
├── playwright.config.ts        # Cấu hình Playwright (projects, timeout...)
├── tsconfig.json
└── package.json
```

---

## Workflow sử dụng

```
Viết scenario JSON  →  Generate code  →  Chạy tests  →  Xem report
     (bạn làm)           (1 lệnh)          (1 lệnh)       (1 lệnh)
```

**Bước 1 — Viết test case** trong file `scenarios/*.scenarios.json`  
**Bước 2 — Generate** ra file `.spec.ts`:

```bash
npm run generate
```

**Bước 3 — Chạy tests:**

```bash
npm test
```

---

## Viết Test Case mới

### Thêm vào file scenario hiện có

Mở file trong `scenarios/` và thêm object vào mảng `scenarios`:

```json
{
  "id": "TC_XXX_001",
  "name": "Mô tả ngắn gọn test case",
  "tags": ["smoke", "regression"],
  "steps": [
    { "action": "navigate", "url": "/" },
    { "action": "expect_visible", "selector": "h1" },
    { "action": "expect_text_visible", "value": "Humble Human" }
  ]
}
```

### Tạo file scenario mới

```bash
cp scenarios/template.json scenarios/ten-tinh-nang.scenarios.json
```

Sửa `suiteName` và thêm scenarios, rồi chạy:

```bash
npm run generate
```

> **Lưu ý:** File trong `tests/generated/` được tạo tự động — **không sửa tay** vì sẽ bị ghi đè khi generate lại.

---

## Actions hỗ trợ

Xem đầy đủ trong [`scenarios/template.json`](scenarios/template.json). Dưới đây là tóm tắt:

### Điều hướng & tương tác

| Action          | Mô tả                    | Tham số bắt buộc    |
| --------------- | ------------------------ | ------------------- |
| `navigate`      | Mở URL                   | `url`               |
| `click`         | Click theo CSS selector  | `selector`          |
| `click_text`    | Click theo text hiển thị | `text`              |
| `fill`          | Nhập text vào input      | `selector`, `value` |
| `press_key`     | Nhấn phím                | `selector`, `key`   |
| `select_option` | Chọn dropdown            | `selector`, `value` |
| `hover`         | Rê chuột                 | `selector`          |
| `scroll_to`     | Cuộn đến element         | `selector`          |
| `scroll_by`     | Cuộn trang (pixel)       | `x`, `y`            |
| `set_viewport`  | Đổi kích thước viewport  | `width`, `height`   |

### Chờ đợi

| Action              | Mô tả                 | Tham số    |
| ------------------- | --------------------- | ---------- |
| `wait`              | Chờ N milliseconds    | `ms`       |
| `wait_for_url`      | Chờ URL chứa chuỗi    | `url`      |
| `wait_for_selector` | Chờ element xuất hiện | `selector` |

### Kiểm tra (Expect / Assert)

| Action                      | Mô tả                        | Tham số                                                   |
| --------------------------- | ---------------------------- | --------------------------------------------------------- |
| `expect_url`                | URL bằng đúng                | `url`                                                     |
| `expect_url_contains`       | URL chứa chuỗi               | `url`                                                     |
| `expect_title_contains`     | Title trang chứa text        | `value`                                                   |
| `expect_visible`            | Element hiển thị             | `selector`                                                |
| `expect_not_visible`        | Element không hiển thị       | `selector`                                                |
| `expect_text`               | Element chứa text            | `selector`, `value`                                       |
| `expect_text_visible`       | Text hiển thị trên trang     | `value`                                                   |
| `expect_count`              | Số lượng element             | `selector`, `count`, `operator`                           |
| `expect_enabled`            | Element được enable          | `selector`                                                |
| `expect_disabled`           | Element bị disable           | `selector`                                                |
| `expect_in_viewport`        | Element nằm trong viewport   | `selector`                                                |
| `expect_css_property`       | CSS property đúng giá trị    | `selector`, `property`, `value_contains` hoặc `value_gte` |
| `expect_center_aligned`     | Element canh giữa viewport   | `selector`                                                |
| `expect_no_overflow`        | Element không bị tràn layout | `selector`                                                |
| `expect_no_reload_on_click` | Click không gây full reload  | `selector`                                                |
| `expect_menu_order`         | Menu đúng thứ tự             | `items: string[]`                                         |

> **`operator`** cho `expect_count`: `eq` \| `gte` \| `lte` \| `gt` \| `lt`

---

## Chạy Tests

```bash
# Tất cả tests
npm test

# Chỉ header tests
npm run test:header

# Header - Desktop only
npm run test:header:desktop

# Header - Mobile only
npm run test:header:mobile

# Chạy có giao diện trình duyệt (headed)
npm run test:headed

# Playwright UI mode (interactive)
npm run test:ui

# Debug mode
npm run test:debug

# Lọc theo tên test (grep)
npx playwright test tests/generated/ --grep smoke
npx playwright test tests/generated/ --grep "TC_HDR_D_006"
```

---

## Generate Tests

```bash
# Generate tất cả scenarios
npm run generate

# Generate 1 file cụ thể
npm run generate:file scenarios/header.scenarios.json

# Generate chỉ các TC có tag cụ thể
npm run generate:tag smoke
```

---

## Xem Report

```bash
# Mở HTML report sau khi chạy test
npm run test:report
```

Report lưu tại `playwright-report/index.html`.  
Artifacts (screenshot, video khi fail) lưu tại `test-results/`.

---

## Test Suites hiện có

| File Scenario               | Suite                            | Số TC             |
| --------------------------- | -------------------------------- | ----------------- |
| `header.scenarios.json`     | Global Header (Desktop + Mobile) | 52                |
| `home.scenarios.json`       | Trang chủ                        | 6                 |
| `collection.scenarios.json` | Danh mục sản phẩm                | 7                 |
| `product.scenarios.json`    | Chi tiết sản phẩm                | 10                |
| `cart.scenarios.json`       | Giỏ hàng                         | 6                 |
| `search.scenarios.json`     | Tìm kiếm & Navigation            | 6                 |
| `login.scenarios.json`      | Đăng nhập / Tài khoản            | 4                 |
| **Tổng**                    |                                  | **91 test cases** |

### Tags phổ biến

| Tag          | Ý nghĩa                         |
| ------------ | ------------------------------- |
| `smoke`      | Kiểm tra cơ bản, chạy nhanh     |
| `regression` | Full regression test            |
| `ui`         | Kiểm tra giao diện              |
| `navigation` | Kiểm tra điều hướng URL         |
| `desktop`    | Viewport desktop (1280×720)     |
| `mobile`     | Viewport mobile (390×844)       |
| `burger`     | Burger menu mobile              |
| `cart`       | Liên quan giỏ hàng              |
| `search`     | Chức năng tìm kiếm              |
| `auth`       | Đăng nhập / tài khoản           |
| `edge`       | Edge case / trường hợp biên     |
| `config`     | Kiểm tra config-driven behavior |
| `theme`      | Kiểm tra giao diện theme        |

---

## Playwright Config

Cấu hình trong `playwright.config.ts`:

| Setting            | Giá trị                                 |
| ------------------ | --------------------------------------- |
| Base URL           | `https://humblehuman.vn`                |
| Projects           | Desktop Chrome, Mobile Chrome (Pixel 5) |
| Action timeout     | 15s                                     |
| Navigation timeout | 30s                                     |
| Test timeout       | 60s                                     |
| Retry on CI        | 2 lần                                   |
| Screenshot         | Chỉ khi fail                            |
| Video              | Khi retry                               |
| Trace              | Khi retry                               |

---

## Liên hệ

Repo: [github.com/sontung0511/humblehumanTest](https://github.com/sontung0511/humblehumanTest)

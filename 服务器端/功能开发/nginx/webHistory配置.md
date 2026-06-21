前端使用 `Vue Router` 的 `createWebHistory()` 配置，需要 Nginx 配置支持 history 路由。要求服务器把任意路由都回退到 index.html。

**Nginx 配置**
如果站点部署在域名根路径，例如 `https://example.com/`：

```nginx
server {
    listen 80;
    server_name example.com;

    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

关键是这一行：

```nginx
try_files $uri $uri/ /index.html;
```

它的意思是：先找真实文件，找不到就回退到 `index.html`。

**部署到子目录**
如果部署到 `https://example.com/company/`，Vite 也要设置：

```env
VITE_APP_PUBLIC_BASE=/company/
```

Nginx 示例：

```nginx
location /company/ {
    alias /path/to/dist/;
    try_files $uri $uri/ /company/index.html;
}
```

同时 Vue Router 建议用 base：

```ts
createWebHistory(import.meta.env.BASE_URL)
```

**http-server 本地测试**
`npx http-server dist` 默认不支持 SPA fallback，所以 `/products` 会 404。更适合用 Vite 自带预览：

```bash
pnpm build
pnpm preview
```

或者使用支持 SPA fallback 的静态服务器，例如：

```bash
npx serve dist -s
```

如果继续用 `http-server`，需要改成 hash 路由 `createWebHashHistory()`，访问会变成 `/#/products`，就不需要服务器 fallback，但 URL 会带 `#`。
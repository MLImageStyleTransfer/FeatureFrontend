# Feature Frontend

### Setup 
```bash
npm install
```

### Run service
```bash
npm run start
```

### Resource sharing (Linux)
```bash
npx http-server -p 3010 ./src/common/static/resources/
```

### Environment (TODO)

`.env` file contains config

Example
```dotenv
PORT=3000
```

### Architecture (src general points only)
```text
.
├── apps
│   ├── feature
│   │   ├── api
│   │   ├── components
│   │   │   └── content-box
│   │   ├── feature-root.css
│   │   ├── feature-root.tsx
│   │   └── storage
│   ├── machine
│   │   ├── api
│   │   ├── components
│   │   │   └── load-box
│   │   ├── machine-root.css
│   │   └── machine-root.tsx
│   └── users
│       ├── account
│       │   ├── account-root.module.css
│       │   └── account-root.tsx
│       ├── api
│       ├── sign-up
│       │   ├── sign-up-root.tsx
│       │   └── sign-up.module.css
│       └── sing-in
│           └── sign-in-root.tsx
├── common
│   ├── api
│   ├── components
│   │   ├── about
│   │   ├── content-title
│   │   ├── content-wrapper
│   │   ├── header
│   │   ├── home
│   │   ├── not-found
│   │   └── secondary-title
│   ├── helpers
│   │   ├── URLToBase64.ts
│   │   ├── base64ToURL.ts
│   │   └── createBlob.ts
│   ├── history
│   └── static
│       ├── images
│       └── resources
├── general
│   ├── App.css
│   └── App.tsx
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
└── setupTests.ts
```
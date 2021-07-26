# Notion API ❤️ Next.js example!

This is a collection of `React`, `Next.js` usage examples by `notion-api` written with `typescript`.

I'm still writing various examples, so if you find a problem, please leave an issue!

## Pages

### Index

rendering `NOTION_INDEX_PAGE` with `SSG`

- src : [`pages/index.tsx`](pages/index.tsx)

- demo site : https://nextjs-notion-api.vercel.app/
- original Notion Page : https://www.notion.so/Notion-API-Next-js-INDEX-PAGE-13cb8d2d3328425e815a1896267f5906

### /pages/[page_id]

rendering notion page for `[page_id]` with `SSG`

- src : [`pages/pages/[page_id].ts`](pages/pages/[page_id].ts)
- example demo site : https://nextjs-notion-api.vercel.app/pages/e3739c70-85d9-4cbf-9713-909a27e4093c
- example Notion Page : https://www.notion.so/SubPage-e3739c7085d94cbf9713909a27e4093c

## API

### /api/pages/[page_id]

- `GET`
- success - `200` :

  ```js
  {
    "page": Page // https://developers.notion.com/reference/page;
  }
  ```
- error - `500` :

  ```js
  {
    "page": null,
    "error": string,
    "code": ClientErrorCode | APIErrorCode,
  }
  ```

### /api/databases/[database_id]

- `GET`
- success - `200` :

  ```js
  {
    "database": Database // https://developers.notion.com/reference/get-database;
  }
  ```
- error - `500` :

  ```js
  {
    "database": null,
    "error": string,
    "code": ClientErrorCode | APIErrorCode,
  }
  ```

### /api/databases/[database_id]/pages

- `GET`
- `query`
  - start_cursor?: string;
  - page_size?: string;
- success - `200` :

  ```js
  {
    "pages": Page[] // https://developers.notion.com/reference/page;
  }
  ```
- error - `500` :

  ```js
  {
    "pages": null,
    "error": string,
    "code": ClientErrorCode | APIErrorCode,
  }
  ```

## Components

### RichText

- src : [`components/notion/RichText/RichText.tsx`](components/notion/RichText/RichText.tsx)

#### Props

- value : `RichText`

### Block

- src : [`components/notion/Block/Block.tsx`](components/notion/Block/Block.tsx)

#### Props

- value : `Block`

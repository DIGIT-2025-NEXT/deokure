# User Post App

このプロジェクトは、ユーザーが写真や文章を投稿できるアプリケーションです。Supabaseをバックエンドとして使用し、Prisma ORMを利用してデータベースとのやり取りを行います。

## 機能

- ユーザーは投稿を作成し、写真や文章を共有できます。
- 投稿はリスト形式で表示され、他のユーザーが閲覧できます。
- ユーザー認証機能を提供し、ログインやサインアップが可能です。

## ファイル構成

```
user-post-app
├── src
│   ├── pages
│   │   ├── index.tsx        // ホームページ
│   │   ├── post.tsx         // 投稿フォーム
│   │   └── auth.tsx         // 認証フォーム
│   ├── components
│   │   ├── PostForm.tsx     // 投稿フォームコンポーネント
│   │   ├── PostList.tsx      // 投稿リストコンポーネント
│   │   └── AuthForm.tsx      // 認証フォームコンポーネント
│   ├── lib
│   │   ├── supabaseClient.ts // Supabaseクライアント設定
│   │   └── prisma.ts        // Prismaクライアント設定
│   ├── styles
│   │   └── globals.css      // グローバルスタイル
│   └── types
│       └── index.ts         // 型定義
├── prisma
│   └── schema.prisma        // Prismaスキーマ定義
├── package.json              // npm設定ファイル
├── tsconfig.json             // TypeScript設定ファイル
└── README.md                 // プロジェクトドキュメント
```

## セットアップ手順

1. リポジトリをクローンします。
   ```
   git clone <repository-url>
   ```

2. 依存関係をインストールします。
   ```
   npm install
   ```

3. 環境変数を設定します。`.env`ファイルを作成し、SupabaseのURLとAPIキーを追加します。

4. データベースをマイグレーションします。
   ```
   npx prisma migrate dev
   ```

5. アプリケーションを起動します。
   ```
   npm run dev
   ```

## 使用技術

- **Next.js**: フロントエンドフレームワーク
- **Supabase**: バックエンドサービス
- **Prisma**: ORM
- **TypeScript**: 型安全なJavaScript

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。
# ktneh

[![](https://img.shields.io/github/license/altair77/ktneh)](https://github.com/altair77/ktneh/blob/master/LICENSE)
[![gh-pages](https://github.com/altair77/ktneh/workflows/gh-pages/badge.svg)](https://github.com/altair77/ktneh/actions?query=workflow:gh-pages)

Keep Talking and Nobody Explodes Helper

## 概要
ゲーム「完全爆弾解除マニュアル：Keep Talking and Nobody Explodes」のツールです。  
ウェブアプリケーションで動作し、「分析担当者」の爆弾解除方法を特定する補助を行います。

## デモ
<https://altair77.github.io/ktneh>

## 機能

* バージョン1-ja に対応しています。

* 特殊モジュールを除く、全てのモジュールに対応しています。
  * ワイヤ
  * ボタン
  * キーパッド
  * サイモンゲーム
  * 表比較
  * 記憶
  * モールス信号
  * 複雑ワイヤ
  * 順番ワイヤ
  * 迷路
  * パスワード

* 一度入力した追加情報(電池の数等)を他のモジュールに共有できます。

* 同種のモジュールを複数開くことができます。

## 要求

以下の環境で動作確認しています。

|名前|バージョン|
|:--|:--|
|Node.js|12.18.3 LTS|
|yarn|1.22.4|
|Firefox|79.0|

## インストール

このアプリケーションはNuxt.jsで作成されています。

プロジェクトを配置の上、`yarn`コマンドにて必要なライブラリはインストールできます。

```bash
$ yarn install
```

開発用にサーバーを起動するには、`dev`タスクを実行します。

```bash
$ yarn dev
```

<http://localhost:3000>にアクセスします。
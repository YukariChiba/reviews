# 0x7f Reviews

个人点评收集站点，使用 Nuxt 4 + Vuetify 4 + Nuxt Content 3 构建。

## 技术栈

- **框架**: Nuxt 4
- **UI**: Vuetify 4 (Material Design 3)
- **内容**: Nuxt Content 3 + SQLite
- **字体**: Noto Sans SC
- **状态管理**: Pinia
- **OG 图片**: nuxt-og-image

## 分数参照

- <=1 这就是史！[豆瓣 <= 5]
- <=2 难以下咽 [豆瓣 <= 5.5]
- <=3 非常烂 [豆瓣 <= 6]
- <=4 乏善可陈 [豆瓣 <= 6.5]
- <=5 不尽人意 [豆瓣 <= 7]
- <=6 勉勉强强 [豆瓣 <= 7.5]
- <=7 中规中矩 [豆瓣 <= 8]
- <=8 值得一试 [豆瓣 <= 8.5]
- <=9 优秀佳作 [豆瓣 <= 9]
- \>9 神作！ [豆瓣 > 9]

## 内容字段

Markdown 文件使用 Front Matter 定义元数据：

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标题（必填） |
| `type` | string | 类型（必填） |
| `date` | date | 日期（必填） |
| `score` | number | 评分（可选） |
| `recommend` | boolean | 是否推荐（可选） |
| `status` | string | 状态（可选） |
| `image` | string | 封面图（可选） |
| `hidden` | boolean | 是否隐藏（可选） |

## 命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 静态生成
npm run generate

# 预览
npm run preview

# 代码检查
npm run lint
npm run lint:fix
```

## License

AGPL v3

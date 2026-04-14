export function getScoreInfo(score: number) {
  // 1分及以下：深紫色 (最低级)
  if (score <= 1) return { color: '#4A148C', colorName: 'purple-darken-4', text: '这就是史！' }
  
  // 2分：暗红色
  if (score <= 2) return { color: '#B71C1C', colorName: 'red-darken-4', text: '难以下咽' }
  
  // 3分：红色
  if (score <= 3) return { color: '#D32F2F', colorName: 'red-darken-2', text: '非常烂' }
  
  // 4分：深橘色
  if (score <= 4) return { color: '#E64A19', colorName: 'deep-orange-darken-2', text: '乏善可陈' }
  
  // 5分：橘色
  if (score <= 5) return { color: '#F57C00', colorName: 'orange-darken-1', text: '不尽人意' }
  
  // 6分：黄色/琥珀色 (这里选用暗黄色保证文字可读性)
  if (score <= 6) return { color: '#FBC02D', colorName: 'yellow-darken-2', text: '勉勉强强' }
  
  // 7分：黄绿色
  if (score <= 7) return { color: '#AFB42B', colorName: 'lime-darken-2', text: '中规中矩' }
  
  // 8分：浅绿色
  if (score <= 8) return { color: '#7CB342', colorName: 'light-green-darken-1', text: '值得一试' }
  
  // 9分：绿色
  if (score <= 9) return { color: '#388E3C', colorName: 'green-darken-2', text: '优秀佳作' }
  
  // 10分 (大于9分)：深绿色
  return { color: '#1B5E20', colorName: 'green-darken-4', text: '神作！' }
}

export function getTypeIcon(type: string) {
  const map: Record<string, string> = {
    'game': 'mdi-gamepad-variant',
    'tv-series': 'mdi-television',
    'movie': 'mdi-movie',
    'book': 'mdi-book-open-variant',
    'others': 'mdi-file'
  }
  return map[type] || 'mdi-file'
}

export function getTypeName(type: string) {
  const map: Record<string, string> = {
    'game': '游戏',
    'tv-series': '剧集',
    'movie': '电影',
    'book': '书籍',
    'others': '其他'
  }
  return map[type] || type
}

export function getStatusIcon(status: string) {
  const map: Record<string, string> = {
    'finished': 'mdi-check-circle',
    'ongoing': 'mdi-progress-clock',
    'abandoned': 'mdi-close-circle'
  }
  return map[status] || 'mdi-help-circle'
}

export function getStatusName(status: string) {
  const map: Record<string, string> = {
    'finished': '已完成',
    'ongoing': '进行中',
    'abandoned': '已弃坑'
  }
  return map[status] || status
}

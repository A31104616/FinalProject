interface DrawItem {
  id: string;
  name: string;
  path: string;
  date: string;
  tags: string[];
  model?: string;
  artist?: string;
  like: number;
  status?: string;
}

interface photoItem {
  id: string;
  place: string[];
  path: string;
  date: string;
  tags: string[];
  model?: string;
  artist?: string;
  like: number;
  status?: string;
}

export const drawData: { [key: string]: DrawItem } = {
    'draw': {
    id: 'draw',
    name: '多兒友情提醒該畫畫囉',
    path: '/draw/draw.png',
    date: '2025/05/22',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Horror', 'Bird'],
    status: '只是多兒友情提醒該畫畫囉，相信他手上拿的只是沾了番茄醬的玩具對吧'
    },
    'ducktaro': {
    id: 'ducktaro',
    name: '鴨太郎',
    path: '/draw/ducktaro.png',
    date: '2025/05/20',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Jojo', 'Bird', 'Kujo Jotaro'],
    status: '看起來會一邊以歐拉歐拉的叫聲，一邊把敵人啄飛的鳥'
    },
    'pic': {
    id: 'Hi',
    name: '嗨',
    path: '/draw/pic.png',
    date: '2024/03/01',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl', 'Script'],
    status: '莫名出現在畫布角落的奇妙生物'
    },
    'HappyBaby': {
    id: 'HappyBaby',
    name: '快樂鷺鷹龍',
    path: '/draw/HappyBaby.png',
    date: '2025/03/16',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['MHWs', 'Monster Hunter', 'Dragon'],
    status: '只是一隻快樂路過的可愛的鷺鷹龍寶寶'
    },
    'owo': {
    id: 'owo',
    name: 'OwO',
    path: '/draw/owo.png',
    date: '2025/03/20',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl'],
    status: '某個被蜘蛛抓起的可憐人，因為沒辦法掙扎，所以只能用可愛的表情來掩飾自己的悲傷'
    },
    'SUN_v1': {
    id: 'SUN_v1',
    name: '日落',
    path: '/draw/SUN_v1.png',
    date: '2025/06/01',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Sun', 'Landscape', 'Background'],
    status: '風景練習，畫師本人畫到一半差點被太陽閃瞎'
    },
    'YA': {
    id: 'YA',
    name: '快樂仙人掌',
    path: '/draw/YA.png',
    date: '2025/01/16',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Plant', 'Cactus'],
    status: '一隻看起來在享受陽光的快樂仙人掌'
    },
    '夜鷺': {
    id: '夜鷺',
    name: '夜鷺',
    path: '/draw/夜鷺.png',
    date: '2025/03/28',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Bird', 'Script'],
    status: '一隻拉長脖子的夜鷺，似乎下一秒就要啄向獵物'
    },
    '勇者': {
    id: '勇者',
    name: '勇者',
    path: '/draw/勇者.png',
    date: '2022/10/01',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl', 'Pixel'],
    status: '像素風格練習'
    },
    'Archer': {
    id: 'Archer',
    name: 'Archer',
    path: '/draw/Archer.png',
    date: '2025/04/22',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl'],
    status: '拿著弓的少女'
    },
    '不熬夜A少女': {
    id: '不熬夜A少女',
    name: '不熬夜A少女',
    path: '/draw/不熬夜A少女.png',
    date: '2020/05/21',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl', 'Student'],
    status: '高中時某個每天熬夜的可憐人，她的願望是能夠睡飽'
    },
    '禿髮A少女': {
    id: '禿髮A少女',
    name: '禿髮A少女',
    path: '/draw/禿髮A少女.png',
    date: '2020/05/21',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl', 'Student'],
    status: '高中時某個每天都在擔心自己要禿頭的可憐人'
    },
    '眼睛': {
    id: '眼睛',
    name: 'Cosmos',
    path: '/draw/眼睛.png',
    date: '2023/06/15',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Girl'],
    status: '風景練習，畫師本人畫到一半差點被太陽閃瞎'
    },
    '插圖': {
    id: '插圖',
    name: '星空',
    path: '/draw/插圖.png',
    date: '2023/09/01',
    model: '繪圖',
    artist: 'Sonatiya',
    like: 0,
    tags: ['Original', 'Landscape', 'Background'],
    status: '久違的銀河練習'
    }
}

export const photoData: { [key: string]: photoItem } = {
    'P_20240214_164812': {
        id: 'P_20240214_164812',
        place: ['宜蘭', '頭城', '外澳'],
        path: '/photo/P_20240214_164812.jpg',
        date: '2024/02/14',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['Landscape'],
        status: ''
    }, 
    'P_20240228_183127': {
        id: 'P_20240228_183127',
        place: ['日本', '大阪'],
        path: '/photo/P_20240228_183127.jpg',
        date: '2024/02/28',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['cityscape', 'night'],
        status: ''
    }, 
    'P_20240711_171232_1': {
        id: 'P_20240711_171232_1',
        place: ['桃園', '中壢', '中原大學'],
        path: '/photo/P_20240711_171232_1.jpg',
        date: '2024/07/11',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['cityscape', 'sky'],
        status: ''
    }, 
    'P_20240814_183151': {
        id: 'P_20240814_183151',
        place: ['桃園', '中壢'],
        path: '/photo/P_20240814_183151.jpg',
        date: '2024/08/14',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['food'],
        status: '澗水藍的義大利麵'
    }, 
    'P_20240824_172910': {
        id: 'P_20240824_172910',
        place: ['宜蘭', '頭城', '烏石港'],
        path: '/photo/P_20240824_172910.jpg',
        date: '2024/08/24',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['Landscape', 'sky'],
        status: ''
    }, 
    'P_20241124_160640': {
        id: 'P_20241124_160640',
        place: ['臺北', '信義區', '大安森林公園'],
        path: '/photo/P_20241124_160640.jpg',
        date: '2024/11/24',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['animal', 'bird'],
        status: '黑冠麻鷺'
    }, 
    'P_20250525_152638': {
        id: 'P_20250525_152638',
        place: ['澎湖', '馬公', '桶盤嶼'],
        path: '/photo/P_20250525_152638.jpg',
        date: '2025/05/25',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['stone', 'landscape'],
        status: '柱狀玄武岩'
    }, 
    'P_20250525_161445': {
        id: 'P_20250525_161445',
        place: ['澎湖', '馬公', '虎井嶼'],
        path: '/photo/P_20250525_161445.jpg',
        date: '2025/05/25',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['animal', 'cat'],
        status: ''
    }, 
    'P_20240727_184339': {
        id: 'P_20240727_184339',
        place: ['宜蘭', '宜蘭市', '宜蘭河'],
        path: '/photo/P_20240727_184339.jpg',
        date: '2025/05/25',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['animal', 'bird'],
        status: '棕背伯勞'
    }, 
    'P_20250510_164314': {
        id: 'P_20250510_164314',
        place: ['宜蘭', '礁溪鄉', '龍潭湖'],
        path: '/photo/P_20250510_164314.jpg',
        date: '2025/05/10',
        model: '攝影',
        artist: 'Sonatiya',
        like: 0,
        tags: ['animal', 'bird'],
        status: '亞成鳥夜鷺'
    }
}
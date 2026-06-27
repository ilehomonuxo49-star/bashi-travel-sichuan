document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800, 
        easing: 'ease-in-out',
        once: true, 
        offset: 100
    });
    const { createApp } = Vue;
    createApp({
        data() {
            return {
                currentLang: localStorage.getItem('siteLang') || 'cn',
                langData: {},
                langDict: {
                    cn: {
                        siteName: "巴适游四川",
                        navHome: "首页",
                        navStrategy: "热门攻略",
                        navCommunity: "智能问答",
                        navShare: "分享攻略",
                        welcome: "欢迎，",
                        logout: "退出",
                        loginBtn: "登录/注册",
                        loginTitle: "欢迎来到巴适游四川",
                        registerTitle: "新用户注册",
                        accountLabel: "账号",
                        accountPlaceholder: "请输入用户名",
                        pwdLabel: "密码",
                        pwdPlaceholder: "请输入密码",
                        loginSubmit: "登录",
                        registerSubmit: "立即注册",
                        haveAccountTip: "已有账号？立即登录",
                        noAccountTip: "没有账号？点击注册",
                        menuHot: "热门攻略",
                        menuShare: "分享攻略",
                        menuMap: "旅行地图",
                        menuCommunity: "智能问答",
                        menuCollect: "我的收藏",
                        introTitle: "四川简介",
                        introText1: "四川，简称“川”或“蜀”，位于中国西南腹地，长江上游，素有“天府之国”的美誉。这里历史文化悠久，拥有九寨沟、黄龙、峨眉山-乐山大佛、青城山-都江堰等众多世界级自然与文化遗产。",
                        introText2: "无论是充满人间烟火气的成都街头，还是壮丽神秘的川西雪山高原，四川总能带给你最安逸、最巴适的文旅新体验。",
                        travelSeason: "宜游季节：四季皆宜",
                        slogan: "巴适得板",
                        videoTitle: "魅力四川宣传片",
                        mapTitle: "四川旅游热度数据地图与风情导览",
                        cityCard: "旅游名片",
                        scenicLabel: "经典胜地",
                        foodLabel: "地道美食",
                        routeLabel: "推荐路线",
                        mapTipLine1: "点击左侧地图上的高亮城市，",
                        mapTipLine2: "即可在此联动查看该地区的景点与美食哦！",
                        spotTitle: "热门景点推荐",
                        aiBtnTip: "AI 旅行助手（点击进入智能问答）",
                        footerSlogan: "探索四川，遇见美好",
                        footerQuickNav: "快速导航",
                        footerDestTitle: "热门目的地",
                        footerContactTitle: "联系我们",
                        footerTel: "客服热线",
                        footerMail: "邮箱",
                        footerQrTip: "关注我们获取更多旅行资讯",
                        footerCopyright: "探索四川的奥秘，遇见更好的自己",
                        bannerAlt1: "大美四川",
                        bannerAlt2: "烟火成都",
                        bannerAlt3: "绝美川蜀",
                        slidePrev: "上一张",
                        slideNext: "下一张",
                        destJiuzhaigou: "九寨沟",
                        destEmei: "峨眉山",
                        destYading: "稻城亚丁",
                        icpText: "蜀ICP备20240001号",
                        tipHotGuideDev: "热门攻略页面待开发",
                        tipShareDev: "分享攻略页面待开发",
                        tipQaDev: "智能问答页面待开发",
                        tipCollectLogin: "请先登录后再进行收藏！",
                        tipCollectEnter: "已进入我的收藏，可查看收藏景点",
                        tipCityDataLoading: "{cityName}的数据正在火热搜集中，先看看其他高亮城市吧！",
                        tipUserExist: "该用户名已被占用！",
                        tipRegSuccess: "注册成功！已切换到登录界面。",
                        tipAuthFail: "账号或密码错误！",
                        tipLogoutSuccess: "已安全退出登录",
                        tipAddCollect: "成功收藏 {spotName} ！",
                        tipRemoveCollect: "已将 {spotName} 移出收藏夹",
                        mapLoadErr: "地图资源加载异常，请确保在 VS Code Live Server 等本地服务器环境下运行",
                        mapHeatTextHigh: "热度极高",
                        mapHeatTextLow: "热度普通",
                        mapHeatLabel: "旅游热度指数",
                        mapNoDataTip: "暂未录入热度数据"
                    },
                    en: {
                        siteName: "Bashi Travel Sichuan",
                        navHome: "Home",
                        navStrategy: "Travel Guides",
                        navCommunity: "Smart Q&A",
                        navShare: "Share Guide",
                        welcome: "Welcome, ",
                        logout: "Logout",
                        loginBtn: "Login / Register",
                        loginTitle: "Welcome to Bashi Travel Sichuan",
                        registerTitle: "New User Register",
                        accountLabel: "Account",
                        accountPlaceholder: "Input your username",
                        pwdLabel: "Password",
                        pwdPlaceholder: "Input your password",
                        loginSubmit: "Login",
                        registerSubmit: "Register Now",
                        haveAccountTip: "Already have account? Login now",
                        noAccountTip: "No account? Register here",
                        menuHot: "Hot Guides",
                        menuShare: "Share Guide",
                        menuMap: "Travel Map",
                        menuCommunity: "Smart Q&A",
                        menuCollect: "My Collection",
                        introTitle: "About Sichuan",
                        introText1: "Sichuan, abbreviated as Chuan or Shu, is located in the hinterland of southwest China, upper reaches of the Yangtze River, known as the 'Land of Abundance'. It boasts profound history and culture, with numerous world natural & cultural heritage sites including Jiuzhaigou, Huanglong, Mount Emei & Leshan Giant Buddha, Mount Qingcheng & Dujiangyan.",
                        introText2: "Whether the lively streets of Chengdu, or the magnificent snow mountains of western Sichuan, Sichuan will bring you the most comfortable travel experience.",
                        travelSeason: "Best Travel Time: All Seasons",
                        slogan: "Wonderful Sichuan",
                        videoTitle: "Charming Sichuan Promo",
                        mapTitle: "Sichuan Tourism Heat Map & Guide",
                        cityCard: "City Profile",
                        scenicLabel: "Famous Scenic Spots",
                        foodLabel: "Local Cuisine",
                        routeLabel: "Recommended Route",
                        mapTipLine1: "Click highlighted cities on the left map,",
                        mapTipLine2: "to view local scenic spots & food here.",
                        spotTitle: "Popular Attractions",
                        aiBtnTip: "AI Travel Assistant (Click to enter Q&A)",
                        footerSlogan: "Explore Sichuan, Discover Beauty",
                        footerQuickNav: "Quick Nav",
                        footerDestTitle: "Popular Destinations",
                        footerContactTitle: "Contact Us",
                        footerTel: "Service Hotline",
                        footerMail: "Email",
                        footerQrTip: "Scan QR to get travel news",
                        footerCopyright: "Discover the charm of Sichuan, find a better you",
                        bannerAlt1: "Beautiful Sichuan",
                        bannerAlt2: "Chengdu City Life",
                        bannerAlt3: "Stunning Sichuan Scenery",
                        slidePrev: "Previous",
                        slideNext: "Next",
                        destJiuzhaigou: "Jiuzhaigou",
                        destEmei: "Mount Emei",
                        destYading: "Daocheng Yading",
                        icpText: "Sichuan ICP No.20240001",
                        tipHotGuideDev: "Hot Guide page under construction",
                        tipShareDev: "Share Guide page under construction",
                        tipQaDev: "Smart Q&A page under construction",
                        tipCollectLogin: "Please login before collecting!",
                        tipCollectEnter: "Entered my collection, view saved spots",
                        tipCityDataLoading: "Data of {cityName} is being collected, check other highlighted cities!",
                        tipUserExist: "Username already exists!",
                        tipRegSuccess: "Register success! Switch to login page.",
                        tipAuthFail: "Wrong username or password!",
                        tipLogoutSuccess: "Logged out successfully",
                        tipAddCollect: "Collected {spotName} !",
                        tipRemoveCollect: "Removed {spotName} from favorites",
                        mapLoadErr: "Map load error, run with Live Server",
                        mapHeatTextHigh: "High Heat",
                        mapHeatTextLow: "Normal Heat",
                        mapHeatLabel: "Tour Heat Index",
                        mapNoDataTip: "No heat data recorded"
                    }
                },
                spotDict: {
    cn: [
        { 
            id: 1, 
            name: '峨眉山', 
            desc: '峨眉山为中国四大佛教名山，世界文化与自然双重遗产，山势巍峨秀丽，金顶云海佛光闻名天下，普贤菩萨道场，山林清幽，四季景色各有韵味，是礼佛与观光必去胜地。', 
            img: '../images/spot/emei.png' 
        },
        { 
            id: 2, 
            name: '乐山大佛', 
            desc: '依凌云山岩壁凿刻而成的千年弥勒大佛，临江而立气势磅礴，历经千年风雨保存完好，三江汇流的独特地理格局，造就了震撼的人文奇观，是石刻艺术的巅峰之作。', 
            img: '../images/spot/leshan.png' 
        },
        { 
            id: 3, 
            name: '都江堰', 
            desc: '战国时期修建的无坝引水水利奇迹，两千多年持续灌溉成都平原，造就天府之国。工程构思巧夺天工，兼顾防洪灌溉，是古人顺应自然的智慧结晶。', 
            img: '../images/spot/dujiangyan.png' 
        },
        { 
            id: 4, 
            name: '稻城亚丁', 
            desc: '坐落于甘孜川西高原，三座神山巍峨圣洁，海子碧蓝纯净，草甸辽阔原始，被誉为蓝色星球最后净土，雪山、湖泊、林海融为一体，是户外爱好者的天堂。', 
            img: '../images/spot/yading.png' 
        }
    ],
    en: [
        { 
            id: 1, 
            name: 'Mount Emei', 
            desc: "One of China's Four Great Buddhist Mountains and a World Mixed Heritage. Famous for golden summit sea of clouds and Buddha light. Quiet forests and sacred Buddhist culture attract tourists and pilgrims all year round.", 
            img: '../images/spot/emei.png' 
        },
        { 
            id: 2, 
            name: 'Leshan Giant Buddha', 
            desc: "A huge Maitreya Buddha carved into cliff beside three converging rivers. Built over 1300 years ago, it represents top ancient Chinese stone carving art with grand and shocking momentum.", 
            img: '../images/spot/leshan.png' 
        },
        { 
            id: 3, 
            name: 'Dujiangyan', 
            desc: "A world-famous ancient dam-free irrigation project. It has benefited Chengdu Plain for over 2000 years, fully reflecting ancient Chinese wisdom of living in harmony with nature.", 
            img: '../images/spot/dujiangyan.png' 
        },
        { 
            id: 4, 
            name: 'Daocheng Yading', 
            desc: "Known as the last pure land on earth, located in Garzê western Sichuan plateau. Snowy holy mountains, crystal alpine lakes and primitive meadows form breathtaking alpine scenery for outdoor travel.", 
            img: '../images/spot/yading.png' 
        }
    ]
},
                cityInfoDict: {
                    cn: {
                        成都: {
                            img: "../images/city/chengdu.jpg",
                            scenic: ["宽窄巷子", "锦里", "武侯祠", "大熊猫繁育研究基地"],
                            food: ["火锅", "兔头", "龙抄手", "担担面"],
                            route: "成都三日游：市区人文+熊猫基地休闲路线"
                        },
                        乐山: {
                            img: "../images/city/leshan.jpg",
                            scenic: ["乐山大佛", "峨眉山"],
                            food: ["钵钵鸡", "跷脚牛肉", "甜皮鸭"],
                            route: "乐峨两日祈福游"
                        },
                        阿坝: {
                            img: "../images/city/aba.jpg",
                            scenic: ["九寨沟", "黄龙", "四姑娘山"],
                            food: ["藏式土火锅", "牦牛肉", "酥油茶"],
                            route: "阿坝川西风光五日环线"
                        },
                        甘孜: {
                            img: "../images/city/ganzi.jpg",
                            scenic: ["稻城亚丁", "海螺沟", "新都桥"],
                            food: ["糌粑", "藏包子", "高原牦牛肉汤锅"],
                            route: "甘孜川西秘境七日自驾线"
                        },
                        绵阳: {
                            img: "../images/city/mianyang.jpg",
                            scenic: ["越王楼", "九皇山", "李白故里"],
                            food: ["绵阳米粉", "江油肥肠", "冷沾沾"],
                            route: "绵阳人文山水两日游"
                        },
                        雅安: {
                            img: "../images/city/yaan.jpg",
                            scenic: ["碧峰峡", "蒙顶山", "上里古镇"],
                            food: ["雅鱼", "雅安挞挞面", "蒙顶山茶"],
                            route: "雅安生态休闲两日游"
                        }
                    },
                    en: {
                        成都: {
                            img: "../images/city/chengdu.jpg",
                            scenic: ["Kuanzhai Alley", "Jinli Ancient Street", "Wuhou Shrine", "Giant Panda Breeding Research Base"],
                            food: ["Hot Pot", "Rabbit Head", "Shrimp Wonton", "Dan Dan Noodles"],
                            route: "3-Day Chengdu Tour: City Culture & Panda Base Leisure Trip"
                        },
                        乐山: {
                            img: "../images/city/leshan.jpg",
                            scenic: ["Leshan Giant Buddha", "Mount Emei"],
                            food: ["Boboji Chicken", "Qiaojiao Beef", "Sweet Crispy Duck"],
                            route: "2-Day Blessing Tour of Leshan & Emei"
                        },
                        阿坝: {
                            img: "../images/city/aba.jpg",
                            scenic: ["Jiuzhaigou", "Huanglong", "Siguniang Mountain"],
                            food: ["Tibetan Hot Pot", "Yak Meat", "Butter Tea"],
                            route: "5-Day Western Sichuan Scenic Loop of Aba"
                        },
                        甘孜: {
                            img: "../images/city/ganzi.jpg",
                            scenic: ["Daocheng Yading", "Hailuogou", "Xinduqiao"],
                            food: ["Tsampa", "Tibetan Bun", "Plateau Yak Hot Pot"],
                            route: "7-Day Self-Driving Tour of Garzê Western Sichuan Secret Land"
                        },
                        绵阳: {
                            img: "../images/city/mianyang.jpg",
                            scenic: ["Wangyue Tower", "Jiuhuang Mountain", "Li Bai Hometown"],
                            food: ["Mianyang Rice Noodles", "Jiangyou Pork Intestine", "Cold Dipping Skewers"],
                            route: "2-Day Mianyang Culture & Mountain Tour"
                        },
                        雅安: {
                            img: "../images/city/yaan.jpg",
                            scenic: ["Bifeng Gorge", "Mengding Mountain", "Shangli Ancient Town"],
                            food: ["Ya Fish", "Yaan Noodles", "Mengding Mountain Tea"],
                            route: "2-Day Yaan Eco Leisure Tour"
                        }
                    }
                },
                cityNameMap: {
                    cn: {
                        成都: "成都",乐山:"乐山",阿坝:"阿坝",甘孜:"甘孜",绵阳:"绵阳",雅安:"雅安"
                    },
                    en: {
                        成都: "Chengdu",乐山:"Leshan",阿坝:"Aba",甘孜:"Garzê",绵阳:"Mianyang",雅安:"Yaan"
                    }
                },
                hotData: [
                    { name: "成都", value: 230 },
                    { name: "乐山", value: 180 },
                    { name: "阿坝", value: 280 },
                    { name: "甘孜", value: 270 },
                    { name: "绵阳", value: 120 },
                    { name: "雅安", value: 150 }
                ],
                isRegisterMode: false, 
                authForm: { username: '', password: '' },
                currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
                selectedCity: '成都'
            }
        },
        computed: {
            spotList() {
                return this.spotDict[this.currentLang];
            }
        },
        mounted() {
            this.langData = this.langDict[this.currentLang];
            this.initEChartsMap();
        },
        methods: {
            getCityName(cityKey) {
                return this.cityNameMap[this.currentLang][cityKey] || cityKey;
            },
            switchLang(lang) {
                this.currentLang = lang;
                this.langData = this.langDict[lang];
                localStorage.setItem('siteLang', lang);
                this.$nextTick(() => {
                    this.initEChartsMap();
                })
            },
            // 新增AI跳转QA方法
            jumpQA(){
                window.open('./QA.html','_blank');
            },
            clickHot(){
                window.open('./strategy.html','_blank');
            },
            clickShare(){
                window.open('./share.html','_blank');
            },
            jumpTravelMap(){
                const mapDom = document.getElementById('echarts-container');
                if(mapDom){
                    mapDom.scrollIntoView({behavior:'smooth'});
                }
            },
            jumpMyCollect(){
                if(!this.currentUser){
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    loginModal.show();
                    alert(this.langData.tipCollectLogin);
                }else{
                    alert(this.langData.tipCollectEnter);
                    document.querySelector('.user-center')?.scrollIntoView({behavior:'smooth'});
                }
            },
            initEChartsMap() {
                const chartDom = document.getElementById('echarts-container');
                if (!chartDom) return;
                const myChart = echarts.init(chartDom);
                fetch('../data/sichuan.json')
                    .then(response => response.json())
                    .then(geoJson => {
                        geoJson.features.forEach(feature => {
                            let rawName = feature.properties.name;
                            feature.properties.name = rawName.replace(/市|藏族羌族自治州|藏族自治州|彝族自治州/g, '');
                        });
                        echarts.registerMap('sichuan', geoJson);
                        const option = {
                            tooltip: {
                                trigger: 'item',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                textStyle: { color: '#333' },
                                formatter: (params) => {
                                    const cityName = this.getCityName(params.name);
                                    if (params.value) {
                                        return `<strong>${cityName}</strong><br/>${this.langData.mapHeatLabel}: <span class="text-danger fw-bold">${params.value}</span>`;
                                    }
                                    return `<strong>${cityName}</strong><br/>${this.langData.mapNoDataTip}`;
                                }
                            },
                            visualMap: {
                                min: 100,
                                max: 300,
                                left: '5%',
                                bottom: '5%',
                                text: [this.langData.mapHeatTextHigh, this.langData.mapHeatTextLow],
                                calculable: true,
                                inRange: {
                                    color: ['#e3f2fd', '#90caf9', '#42a5f5', '#1e88e5', '#1565c0']
                                },
                                textStyle: {
                                    color: '#333'
                                }
                            },
                            series: [
                                {
                                    name: this.currentLang === 'cn' ? '四川旅游热度分布图' : 'Sichuan Tourism Heat Map',
                                    type: 'map',
                                    map: 'sichuan',
                                    roam: false, 
                                    label: {
                                        show: true,
                                        fontSize: 10,
                                        color: '#333'
                                    },
                                    itemStyle: {
                                        borderColor: 'rgba(255,255,255,0.8)',
                                        borderWidth: 1.5
                                    },
                                    emphasis: {
                                        label: { 
                                            show: true, 
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        },
                                        itemStyle: { 
                                            areaColor: '#ff7a8c', 
                                            shadowBlur: 10,
                                            shadowColor: 'rgba(0, 0, 0, 0.15)'
                                        }
                                    },
                                    data: this.hotData
                                }
                            ]
                        };
                        myChart.setOption(option);
                        myChart.on('click', (params) => {
                            if (this.cityInfoDict[this.currentLang][params.name]) {
                                this.selectedCity = params.name;
                            } else {
                                const tip = this.langData.tipCityDataLoading.replace('{cityName}', this.getCityName(params.name));
                                alert(tip);
                            }
                        });
                        window.addEventListener('resize', () => myChart.resize());
                    })
                    .catch(err => {
                        console.error("地图资源加载异常:", err);
                        chartDom.innerHTML = `<div class="text-center py-5 text-danger"><i class="fa-solid fa-triangle-exclamation fa-2x"></i><br>${this.langData.mapLoadErr}</div>`;
                    });
            },
            handleAuth() {
                let users = JSON.parse(localStorage.getItem('web_users')) || [];
                if (this.isRegisterMode) {
                    let exists = users.find(u => u.username === this.authForm.username);
                    if (exists) {
                        alert(this.langData.tipUserExist);
                        return;
                    }
                    let newUser = {
                        username: this.authForm.username,
                        password: this.authForm.password,
                        favorites: []
                    };
                    users.push(newUser);
                    localStorage.setItem('web_users', JSON.stringify(users));
                    alert(this.langData.tipRegSuccess);
                    this.isRegisterMode = false;
                } else {
                    let user = users.find(u => u.username === this.authForm.username && u.password === this.authForm.password);
                    if (user) {
                        this.currentUser = user;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        alert(this.currentLang === "en" ? "Login success!" : "登录成功！");
                        const modalElement = document.getElementById('loginModal');
                        const modalInstance = bootstrap.Modal.getInstance(modalElement);
                        if(modalInstance) modalInstance.hide();
                    } else {
                        alert(this.langData.tipAuthFail);
                    }
                }
                this.authForm.username = '';
                this.authForm.password = '';
            },
            logout() {
                this.currentUser = null;
                localStorage.removeItem('currentUser');
                alert(this.langData.tipLogoutSuccess);
            },
            toggleFavorite(spot) {
                if (!this.currentUser) {
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    loginModal.show();
                    alert(this.langData.tipCollectLogin);
                    return;
                }
                let users = JSON.parse(localStorage.getItem('web_users')) || [];
                let userInList = users.find(u => u.username === this.currentUser.username);
                if (!userInList.favorites) userInList.favorites = [];
                let index = userInList.favorites.findIndex(item => item.id === spot.id);
                if (index > -1) {
                    userInList.favorites.splice(index, 1);
                    const tip = this.langData.tipRemoveCollect.replace('{spotName}', spot.name);
                    alert(tip);
                } else {
                    userInList.favorites.push(spot);
                    const tip = this.langData.tipAddCollect.replace('{spotName}', spot.name);
                    alert(tip);
                }
                this.currentUser = userInList;
                localStorage.setItem('currentUser', JSON.stringify(userInList));
                localStorage.setItem('web_users', JSON.stringify(users));
            },
            isFavorite(spot) {
                if (!this.currentUser || !this.currentUser.favorites) return false;
                return this.currentUser.favorites.some(item => item.id === spot.id);
            }
        }
    }).mount('#app');
});
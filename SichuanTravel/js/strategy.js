document.addEventListener('DOMContentLoaded', function() {
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
                        bannerAlt1: "大美四川",
                        bannerAlt2: "烟火成都",
                        bannerAlt3: "绝美川蜀",
                        slidePrev: "上一张",
                        slideNext: "下一张",
                        destJiuzhaigou: "九寨沟",
                        destEmei: "峨眉山",
                        destYading: "稻城亚丁",
                        icpText: "蜀ICP备20240001号",
                        footerSlogan: "探索四川，遇见美好",
                        footerQuickNav: "快速导航",
                        footerDestTitle: "热门目的地",
                        footerContactTitle: "联系我们",
                        footerTel: "客服热线",
                        footerMail: "邮箱",
                        footerQrTip: "关注我们获取更多旅行资讯",
                        footerCopyright: "探索四川的奥秘，遇见更好的自己",
                        strategyTitle: "旅游攻略中心",
                        searchLabel: "想去哪儿？",
                        searchPlaceholder: "🔍 搜索目的地、景点或攻略",
                        searchBtn: "搜索",
                        hotTagTitle: "热门搜索",
                        categoryTitle: "热门分类",
                        allCat: "全部",
                        recTitle: "今日推荐",
                        defaultRec: "精选路线",
                        viewDetail: "查看详情",
                        strategyHotTitle: "热门攻略",
                        loadMore: "加载更多",
                        noDataTip: "暂无符合条件的攻略，换个关键词试试！",
                        viewUnit: "浏览",
                        collectUnit: "收藏",
                        rankTitle: "本周热门排行榜",
                        fullRank: "查看完整榜单",
                        tipsTitle: "攻略小贴士",
                        shareTitle: "分享你的旅行故事",
                        shareDesc: "发布攻略，帮助更多旅行者",
                        shareBtn: "去分享",
                        modalTitle: "路线详情",
                        routeIntro: "路线介绍",
                        commentArea: "评论区",
                        commentPlaceholder: "写下你的游玩感受...",
                        submitComment: "提交",
                        collectTxt: "收藏",
                        collectedTxt: "已收藏",
                        backTop: "回到顶部"
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
                        bannerAlt1: "Beautiful Sichuan",
                        bannerAlt2: "Chengdu City Life",
                        bannerAlt3: "Stunning Sichuan",
                        slidePrev: "Previous",
                        slideNext: "Next",
                        destJiuzhaigou: "Jiuzhaigou",
                        destEmei: "Mount Emei",
                        destYading: "Daocheng Yading",
                        icpText: "Sichuan ICP No.20240001",
                        footerSlogan: "Explore Sichuan, Discover Beauty",
                        footerQuickNav: "Quick Nav",
                        footerDestTitle: "Popular Destinations",
                        footerContactTitle: "Contact Us",
                        footerTel: "Service Hotline",
                        footerMail: "Email",
                        footerQrTip: "Scan QR to get travel news",
                        footerCopyright: "Discover the charm of Sichuan, find a better you",
                        strategyTitle: "Travel Guide Center",
                        searchLabel: "Where to go?",
                        searchPlaceholder: "🔍 Search spots & travel guides",
                        searchBtn: "Search",
                        hotTagTitle: "Hot Search",
                        categoryTitle: "Categories",
                        allCat: "All",
                        recTitle: "Today's Picks",
                        defaultRec: "Recommended Route",
                        viewDetail: "View Details",
                        strategyHotTitle: "Popular Guides",
                        loadMore: "Load More",
                        noDataTip: "No matching guides, try another keyword!",
                        viewUnit: "Views",
                        collectUnit: "Favorites",
                        rankTitle: "Weekly Ranking",
                        fullRank: "Full List",
                        tipsTitle: "Travel Tips",
                        shareTitle: "Share Your Trip",
                        shareDesc: "Post guides to help other travelers",
                        shareBtn: "Share Now",
                        modalTitle: "Route Details",
                        routeIntro: "Route Introduction",
                        commentArea: "Comments",
                        commentPlaceholder: "Share your travel experience...",
                        submitComment: "Submit",
                        collectTxt: "Favorite",
                        collectedTxt: "Favorited",
                        backTop: "Back to Top"
                    }
                },
                currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
                slideIndex: 0,
                autoTimer: null,
                searchKeyword: "",
                currentCat: "all",
                currentItem: null,
                isCollected: false,
                collectNum: 0,
                commentText: "",
                commentList: [],
                hotTags: ["九寨沟","峨眉山","乐山大佛","稻城亚丁","都江堰","成都"],
                categoryList: [
                    {key:"all", label:"allCat"},
                    {key:"成都", label:"成都"},
                    {key:"九寨沟", label:"九寨沟"},
                    {key:"峨眉山", label:"峨眉山"},
                    {key:"稻城亚丁", label:"稻城亚丁"},
                    {key:"亲子游", label:"亲子游"},
                    {key:"摄影", label:"摄影"},
                    {key:"美食", label:"美食"},
                    {key:"自驾游", label:"自驾游"}
                ],
                strategyData: [
                    {
                        id: 1,
                        title: {cn:"成都三日游经典路线", en:"3-Day Classic Chengdu Trip"},
                        subTitle: {cn:"宽窄巷子 · 锦里 · 武侯祠", en:"Kuanzhai Alley · Jinli · Wuhou Shrine"},
                        days: "3天2晚",
                        budget: "1200",
                        views: 12800,
                        collections: 2300,
                        badge: "热门TOP1",
                        categories: ["all", "成都", "美食", "亲子游"],
                        tags: [
                            {cn:"美食",en:"Food"},
                            {cn:"人文",en:"Culture"},
                            {cn:"亲子",en:"Family"}
                        ],
                        imgSrc: "../images/jingdian/kuanzhaixiangzi1.jpg",
                        desc: {
                            cn:"成都经典人文路线，打卡千年古巷，品尝地道川味，适合家庭亲子出行，节奏舒缓不累。",
                            en:"Classic Chengdu cultural route, taste authentic Sichuan food, great for family trips."
                        },
                        comments: [
                            {user:"游客小周",text:"宽窄巷子拍照超出片，晚上夜景更好看！"},
                            {user:"阿川",text:"锦里小吃很多，人均50吃到撑。"}
                        ]
                    },
                    {
                        id: 2,
                        title: {cn:"九寨沟五日深度游", en:"5-Day Jiuzhaigou In-depth Tour"},
                        subTitle: {cn:"九寨沟 · 黄龙 · 松潘古城", en:"Jiuzhaigou · Huanglong · Songpan Ancient Town"},
                        days: "5天4晚",
                        budget: "3200",
                        views: 9600,
                        collections: 1800,
                        badge: "热度TOP2",
                        categories: ["all", "九寨沟", "摄影", "自驾游"],
                        tags: [
                            {cn:"风景",en:"Scenery"},
                            {cn:"摄影",en:"Photography"},
                            {cn:"纯玩",en:"No Shopping"}
                        ],
                        imgSrc: "../images/jingdian/jiuzhaigou.jpg",
                        desc: {
                            cn:"被誉为人间瑶池，海子色彩层次丰富，秋季景色最佳，全程纯玩无购物，适合摄影爱好者。",
                            en:"Known as paradise on earth, best visited in autumn, perfect for photographers."
                        },
                        comments: [
                            {user:"摄影老王",text:"10月去水色最蓝，一定要带长焦镜头。"},
                            {user:"乐乐",text:"黄龙海拔偏高，慢慢走不要剧烈运动。"}
                        ]
                    },
                    {
                        id: 3,
                        title: {cn:"峨眉山乐山两日游", en:"2-Day Emei & Leshan Tour"},
                        subTitle: {cn:"乐山大佛 · 峨眉金顶", en:"Leshan Giant Buddha · Emei Golden Summit"},
                        days: "2天1晚",
                        budget: "880",
                        views: 7200,
                        collections: 1100,
                        badge: "热度TOP3",
                        categories: ["all", "峨眉山", "自驾游"],
                        tags: [
                            {cn:"佛教文化",en:"Buddhism"},
                            {cn:"日出",en:"Sunrise"},
                            {cn:"登山",en:"Hiking"}
                        ],
                        imgSrc: "../images/spot/emei.png",
                        desc: {
                            cn:"世界双遗产路线，瞻仰世界最大石刻大佛，登顶峨眉山金顶看云海日出，祈福必去。",
                            en:"World dual heritage, watch sea of clouds on Emei summit for pilgrims."
                        },
                        comments: [
                            {user:"静心",text:"金顶看日出要早起，山顶很冷记得带外套。"}
                        ]
                    },
                    {
                        id: 4,
                        title: {cn:"稻城亚丁四日摄影游", en:"4-Day Daocheng Yading Photo Trip"},
                        subTitle: {cn:"牛奶海 · 五色海 · 珍珠海", en:"Milk Lake · Five-color Lake · Pearl Lake"},
                        days: "4天3晚",
                        budget: "2800",
                        views: 6100,
                        collections: 980,
                        badge: "",
                        categories: ["all", "稻城亚丁", "摄影"],
                        tags: [
                            {cn:"雪山",en:"Snow Mountain"},
                            {cn:"圣湖",en:"Holy Lake"},
                            {cn:"徒步",en:"Hike"}
                        ],
                        imgSrc: "../images/jingdian/daochengyading.jpg",
                        desc: {
                            cn:"蓝色星球最后一片净土，三座神山环绕三大圣湖，徒步风景绝美，适合深度户外玩家。",
                            en:"Last pure land on blue planet, stunning alpine lakes for outdoor lovers."
                        },
                        comments: [
                            {user:"徒步阿泽",text:"长线徒步很累，体力一般建议只走珍珠海。"}
                        ]
                    },
                    {
                        id: 5,
                        title: {cn:"都江堰+青城山一日游", en:"1-Day Dujiangyan & Qingcheng"},
                        subTitle: {cn:"千年水利工程 · 道教圣地", en:"Ancient Irrigation · Taoist Mountain"},
                        days: "1天",
                        budget: "298",
                        views: 5400,
                        collections: 860,
                        badge: "",
                        categories: ["all", "成都"],
                        tags: [
                            {cn:"避暑",en:"Summer Retreat"},
                            {cn:"历史",en:"History"},
                            {cn:"问道",en:"Taoism"}
                        ],
                        imgSrc: "../images/spot/dujiangyan.png",
                        desc: {
                            cn:"两千年前伟大水利工程，青城山林木清幽避暑绝佳，距离成都市区仅1小时车程，一日往返轻松。",
                            en:"2000-year irrigation project, cool mountain for one-day trip from Chengdu."
                        },
                        comments: [
                            {user:"文史爱好者",text:"讲解员讲水利历史很有意思，值得一听。"}
                        ]
                    },
                    {
                        id: 6,
                        title: {cn:"成都亲子游三日游", en:"3-Day Chengdu Family Trip"},
                        subTitle: {cn:"熊猫基地 · 科技馆 · 欢乐谷", en:"Panda Base · Science Museum · Happy Valley"},
                        days: "3天2晚",
                        budget: "1500",
                        views: 4900,
                        collections: 750,
                        badge: "",
                        categories: ["all", "成都", "亲子游"],
                        tags: [
                            {cn:"国宝大熊猫",en:"Giant Panda"},
                            {cn:"游乐园",en:"Amusement Park"},
                            {cn:"研学",en:"Study Tour"}
                        ],
                        imgSrc: "../images/spot/panda.jpg",
                        desc: {
                            cn:"专为小朋友设计路线，早上看熊猫进食，科技馆科普互动，欢乐谷游乐项目丰富，亲子出行首选。",
                            en:"Kid-friendly itinerary with pandas and amusement facilities for families."
                        },
                        comments: [
                            {user:"宝妈晴晴",text:"熊猫基地早上8点去，熊猫最活跃。"}
                        ]
                    }
                ]
            }
        },
        computed: {
            langData() {
                return this.langDict[this.currentLang];
            },
            filterStrategy() {
                return this.strategyData.filter(item => {
                    const matchCat = this.currentCat === "all" || item.categories.includes(this.currentCat);
                    const kw = this.searchKeyword.trim();
                    const matchKw = !kw 
                        || item.title[this.currentLang].includes(kw) 
                        || item.subTitle[this.currentLang].includes(kw);
                    return matchCat && matchKw;
                })
            },
            recommendList() {
                return this.strategyData.slice(0,3);
            },
            top5List() {
                return [...this.strategyData].sort((a,b)=>b.views - a.views).slice(0,5);
            },
            tipsList() {
                const base = [
                    {cn:"四川昼夜温差大，记得带外衣",en:"Big temperature gap, bring jacket"},
                    {cn:"高海拔地区注意防晒和预防高反",en:"Sun protection & anti-altitude sickness"},
                    {cn:"提前预订景区门票更优惠",en:"Book tickets in advance for discount"},
                    {cn:"品尝美食时注意适量，避免肠胃不适",en:"Eat spicy food moderately"}
                ]
                return base;
            }
        },
        mounted() {
            this.langData = this.langDict[this.currentLang];
            const newGuideStr = localStorage.getItem('newPublishGuide');
            if(newGuideStr) {
                const newGuide = JSON.parse(newGuideStr);
                // 兜底默认图片，无封面自动填充宽窄巷子
                if(!newGuide.imgSrc || newGuide.imgSrc === "") {
                    newGuide.imgSrc = "../images/jingdian/kuanzhaixiangzi1.jpg";
                }
                this.strategyData.unshift(newGuide);
                localStorage.removeItem('newPublishGuide');
            }
            this.startCarousel();
            this.modal = new bootstrap.Modal(document.getElementById('detailModal'), {backdrop:true});
        },
        methods: {
            // 封装滚动到攻略列表公共方法，搜索/分类共用
            scrollToStrategyList() {
                this.$nextTick(() => {
                    const anchorDom = document.getElementById('strategyListAnchor');
                    if(anchorDom) {
                        anchorDom.scrollIntoView({behavior:"smooth", block:"start"});
                    }
                })
            },
            // 新增：切换分类并滚动到卡片区域
            changeCat(key) {
                this.currentCat = key;
                this.scrollToStrategyList();
            },
            switchLang(lang) {
                this.currentLang = lang;
                localStorage.setItem('siteLang', lang);
                this.langData = this.langDict[lang];
                this.slideIndex = 0;
                this.$nextTick(()=>{
                    this.startCarousel();
                })
            },
            startCarousel() {
                clearInterval(this.autoTimer);
                this.autoTimer = setInterval(()=>{
                    if(this.slideIndex >= this.recommendList.length -1) this.slideIndex = 0;
                    else this.slideIndex ++;
                },4000)
            },
            prevSlide() {
                clearInterval(this.autoTimer);
                this.slideIndex = this.slideIndex <=0 ? this.recommendList.length-1 : this.slideIndex -1;
                this.startCarousel();
            },
            nextSlide() {
                clearInterval(this.autoTimer);
                this.slideIndex = this.slideIndex >= this.recommendList.length-1 ? 0 : this.slideIndex +1;
                this.startCarousel();
            },
            doSearch() {
                this.currentCat = "all";
                this.scrollToStrategyList();
            },
            openModal(item) {
                this.currentItem = JSON.parse(JSON.stringify(item));
                this.collectNum = item.collections;
                this.isCollected = false;
                this.commentList = item.comments;
                this.commentText = "";
                this.modal.show();
            },
            toggleCollect() {
                this.isCollected = !this.isCollected;
                if(this.isCollected) this.collectNum ++;
                else this.collectNum --;
            },
            submitComment() {
                const txt = this.commentText.trim();
                if(!txt) return;
                this.commentList.unshift({user:"我", text:txt});
                this.commentText = "";
            },
            scrollTop() {
                window.scrollTo({top:0, behavior:"smooth"});
            },
            logout() {
                this.currentUser = null;
                localStorage.removeItem('currentUser');
                alert(this.currentLang === "cn" ? "已安全退出登录" : "Logged out successfully");
            }
        }
    }).mount('#app');
});

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
                        strategyTitle: "旅游攻略",
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
                        backTop: "回到顶部",
                        sharePageTitle: "分享你的旅行故事",
                        sharePageDesc: "记录旅途中的美好，分享给更多热爱四川的人",
                        baseInfo: "基础信息",
                        titleTip: "给你的攻略起一个吸引人的标题吧 (5-50字)",
                        destTip: "目的地",
                        travelDate: "出行时间",
                        travelDays: "行程天数",
                        costLabel: "人均消费",
                        costTip: "输入本次旅行人均花费（元）",
                        contentTip: "分享你的行程安排、景点推荐、美食体验、交通住宿、避坑指南...",
                        uploadTip: "点击或拖拽图片到此处上传",
                        uploadLimit: "支持 JPG / PNG 格式\n单张不超过 10MB",
                        tagTip: "标签 (可多选)",
                        starTip: "点击星星评分 (可选)",
                        saveDraft: "保存草稿",
                        preview: "预览",
                        publishNow: "立即发布",
                        agreeRule: "发布即代表同意 《用户协议》 和 《社区规范》",
                        publishTipTitle: "发布小贴士",
                        tip1Title: "真实分享",
                        tip1Desc: "分享真实的旅行体验，对他人更有帮助",
                        tip2Title: "图文并茂",
                        tip2Desc: "多上传美图，让攻略更吸引人",
                        tip3Title: "信息完整",
                        tip3Desc: "包含交通、住宿、美食等实用信息",
                        tip4Title: "文明友善",
                        tip4Desc: "遵守社区规范，友善交流",
                        coverTipTitle: "封面建议",
                        coverDesc: "优质的封面图能显著提升攻略的浏览量哦~",
                        setCover: "设为封面",
                        draftBoxTitle: "草稿箱",
                        draftLastSave: "上次保存：刚刚",
                        draftAutoSave: "已自动保存到草稿箱",
                        viewDraft: "查看草稿",
                        previewEffectTitle: "发布预览效果"
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
                        strategyTitle: "Travel Guide",
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
                        backTop: "Back to Top",
                        sharePageTitle: "Share Your Travel Stories",
                        sharePageDesc: "Record beautiful moments and share with Sichuan travel lovers",
                        baseInfo: "Basic Info",
                        titleTip: "Write an attractive title (5-50 words)",
                        destTip: "Destination",
                        travelDate: "Travel Date",
                        travelDays: "Trip Duration",
                        costLabel: "Per Capita Cost",
                        costTip: "Enter average spending per person (CNY)",
                        contentTip: "Share itinerary, attractions, food, accommodation & travel tips...",
                        uploadTip: "Click or drag images here to upload",
                        uploadLimit: "JPG / PNG only\nMax 10MB per image",
                        tagTip: "Tags (Multiple select)",
                        starTip: "Click stars to rate (Optional)",
                        saveDraft: "Save Draft",
                        preview: "Preview",
                        publishNow: "Publish Now",
                        agreeRule: "By publishing you agree to User Agreement & Community Rules",
                        publishTipTitle: "Publishing Tips",
                        tip1Title: "Real Experience",
                        tip1Desc: "Share real travel experience to help others",
                        tip2Title: "Rich Images",
                        tip2Desc: "Upload photos to make your guide attractive",
                        tip3Title: "Complete Info",
                        tip3Desc: "Include transport, hotel and food info",
                        tip4Title: "Be Polite",
                        tip4Desc: "Follow community rules and communicate nicely",
                        coverTipTitle: "Cover Suggestion",
                        coverDesc: "High-quality cover will greatly boost views",
                        setCover: "Set As Cover",
                        draftBoxTitle: "Draft Box",
                        draftLastSave: "Last saved: Just now",
                        draftAutoSave: "Automatically saved to draft box",
                        viewDraft: "View Drafts",
                        previewEffectTitle: "Publish Preview Effect"
                    }
                },
                currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
                formData: {
                    title: '',
                    dest: '',
                    travelTime: '',
                    day: '2-3天',
                    cost: 0,
                    content: '',
                    tags: [],
                    star: 0,
                    uploadFiles: []
                },
                coverIndex: null,
                titleWord: 0,
                editorWord: 0,
                dayList: [
                    {val: '1日以内', name: '1日以内'},
                    {val: '2-3天', name: '2-3天'},
                    {val: '4-5天', name: '4-5天'},
                    {val: '6天以上', name: '6天以上'}
                ],
                tagList: [
                    '摄影','徒步','亲子游','自驾游','美食','文化体验','避坑指南','交通攻略',
                    '住宿推荐','朋友聚会','情侣出游','学生党','自由行'
                ],
                hoverStarNum: 0
            }
        },
        computed: {
            langData() {
                return this.langDict[this.currentLang];
            }
        },
        mounted() {
            this.langData = this.langDict[this.currentLang];
            // 修复：读取编辑草稿
            const draftIndexStr = localStorage.getItem('editDraftIndex');
            if (draftIndexStr && draftIndexStr !== '' && this.currentUser) {
                try {
                    const draftIndex = Number(draftIndexStr);
                    if (!isNaN(draftIndex) && draftIndex >= 0) {
                        const userListStr = localStorage.getItem('web_users');
                        if (userListStr) {
                            const userList = JSON.parse(userListStr);
                            const targetUser = userList.find(u => u.username === this.currentUser.username);
                            if (targetUser && Array.isArray(targetUser.draftList) && targetUser.draftList[draftIndex]) {
                                const draftItem = targetUser.draftList[draftIndex];
                                if (draftItem.formData) {
                                    // 回填表单文字信息
                                    this.formData = JSON.parse(JSON.stringify(draftItem.formData));
                                    this.coverIndex = draftItem.coverIndex ?? null;
                                    // 刷新字数统计
                                    this.countTitleWord();
                                    this.countEditorWord();
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log("草稿读取异常：", e);
                } finally {
                    // 读取完成立刻清除标记，防止刷新重复读取
                    localStorage.removeItem('editDraftIndex');
                }
            }
        },
        methods: {
            switchLang(lang) {
                this.currentLang = lang;
                localStorage.setItem('siteLang', lang);
                this.langData = this.langDict[lang];
            },
            scrollTop() {
                window.scrollTo({top:0, behavior:"smooth"});
            },
            logout() {
                this.currentUser = null;
                localStorage.removeItem('currentUser');
                alert(this.currentLang === "cn" ? "已安全退出登录" : "Logged out successfully");
            },
            switchDay(val) {
                this.formData.day = val;
            },
            toggleTag(tag) {
                const idx = this.formData.tags.indexOf(tag);
                if(idx > -1) {
                    this.formData.tags.splice(idx, 1);
                } else {
                    this.formData.tags.push(tag);
                }
            },
            setStar(num) {
                this.formData.star = num;
            },
            hoverStar(num) {
                this.hoverStarNum = num;
            },
            resetStarHover() {
                this.hoverStarNum = 0;
            },
            triggerUpload() {
                this.$refs.fileInput.click();
            },
            getPreviewUrl(file) {
                return URL.createObjectURL(file);
            },
            setCover(index) {
                this.coverIndex = index;
            },
            removeFile(index) {
                URL.revokeObjectURL(this.formData.uploadFiles[index]);
                this.formData.uploadFiles.splice(index, 1);
                if(this.coverIndex === index) {
                    this.coverIndex = null;
                } else if(this.coverIndex > index) {
                    this.coverIndex -= 1;
                }
            },
            handleFileSelect(e) {
                const files = e.target.files;
                const maxCount = 8;
                const maxSize = 10 * 1024 * 1024;
                if(this.formData.uploadFiles.length + files.length > maxCount) {
                    alert(this.currentLang === 'cn' ? '最多只能上传8张图片！' : 'Max 8 images allowed!');
                    return;
                }
                for(let file of files) {
                    if(file.size > maxSize) {
                        alert(`${file.name}${this.currentLang === 'cn' ? '超过10MB限制！' : ' exceeds 10MB limit!'}`);
                        continue;
                    }
                    if(!['image/jpeg','image/png'].includes(file.type)) {
                        alert(`${this.currentLang === 'cn' ? '仅支持JPG/PNG格式，' : 'Only JPG/PNG supported, '}${file.name}${this.currentLang === 'cn' ? '格式不支持' : ' format invalid'}`);
                        continue;
                    }
                    this.formData.uploadFiles.push(file);
                }
                alert(`${this.currentLang === 'cn' ? '成功上传' : 'Uploaded '}${files.length}${this.currentLang === 'cn' ? '张图片，当前共' : ' images, total '}${this.formData.uploadFiles.length}`);
                e.target.value = '';
            },
            countTitleWord() {
                this.titleWord = this.formData.title.length;
            },
            countEditorWord() {
                this.editorWord = this.formData.content.length;
            },
            saveDraft() {
                if (!this.currentUser) {
                    alert(this.currentLang === 'cn' ? '请先登录账号，才能保存草稿！' : 'Please login first to save draft!');
                    return;
                }
                const draftInfo = {
                    formData: JSON.parse(JSON.stringify(this.formData)),
                    coverIndex: this.coverIndex,
                    saveTime: new Date().toLocaleString()
                };
                const userList = JSON.parse(localStorage.getItem('web_users')) || [];
                const targetUser = userList.find(item => item.username === this.currentUser.username);
                if (!targetUser) return alert(this.currentLang === 'cn' ? '用户信息异常！' : 'User info error!');
                if (!targetUser.draftList) targetUser.draftList = [];
                targetUser.draftList.unshift(draftInfo);
                localStorage.setItem('web_users', JSON.stringify(userList));
                this.currentUser = targetUser;
                localStorage.setItem('currentUser', JSON.stringify(targetUser));
                alert(this.currentLang === 'cn' ? '表单草稿已成功保存到你的账号草稿箱！前往个人中心查看' : 'Draft saved to your account! Check in user center');
            },
            previewArticle() {},
            // 发布转base64，解决跨页面图片失效
            submitPublish() {
                const {title, dest, travelTime, cost, content, day, tags} = this.formData;
                if (!title) return alert(this.currentLang === 'cn' ? '请填写攻略标题！' : 'Please fill guide title!');
                if (!dest) return alert(this.currentLang === 'cn' ? '请选择目的地！' : 'Please select destination!');
                if (!travelTime) return alert(this.currentLang === 'cn' ? '请选择出行时间！' : 'Please select travel date!');
                if (!cost || cost <= 0) return alert(this.currentLang === 'cn' ? '请填写人均消费！' : 'Please fill per capita cost!');
                if (!content) return alert(this.currentLang === 'cn' ? '请填写正文内容！' : 'Please fill content!');

                const newGuideId = Date.now();
                const tagObjList = tags.map(tag => ({cn: tag, en: tag}));
                // 无封面使用默认图
                if(this.coverIndex === null || !this.formData.uploadFiles[this.coverIndex]) {
                    const newGuide = {
                        id: newGuideId,
                        title: {cn: title, en: title},
                        subTitle: {cn: dest + " · " + day, en: dest + " · " + day},
                        days: day,
                        budget: String(cost),
                        views: 0,
                        collections: 0,
                        badge: "",
                        categories: ["all", dest],
                        tags: tagObjList,
                        imgSrc: "../images/jingdian/kuanzhaixiangzi1.jpg",
                        desc: {
                            cn: content,
                            en: content
                        },
                        comments: []
                    };
                    localStorage.setItem('newPublishGuide', JSON.stringify(newGuide));
                    alert(this.currentLang === 'cn' ? '发布成功！跳转至攻略列表页' : 'Publish success, jump to guide list page');
                    window.location.href = './strategy.html';
                    return;
                }
                // 存在封面，转base64永久存储
                const file = this.formData.uploadFiles[this.coverIndex];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const newGuide = {
                        id: newGuideId,
                        title: {cn: title, en: title},
                        subTitle: {cn: dest + " · " + day, en: dest + " · " + day},
                        days: day,
                        budget: String(cost),
                        views: 0,
                        collections: 0,
                        badge: "",
                        categories: ["all", dest],
                        tags: tagObjList,
                        imgSrc: reader.result,
                        desc: {
                            cn: content,
                            en: content
                        },
                        comments: []
                    };
                    localStorage.setItem('newPublishGuide', JSON.stringify(newGuide));
                    alert(this.currentLang === 'cn' ? '发布成功！跳转至攻略列表页' : 'Publish success, jump to guide list page');
                    window.location.href = './strategy.html';
                }
            },
            openDraft() {
                window.location.href = './user.html';
            }
        }
    }).mount('#app');
});

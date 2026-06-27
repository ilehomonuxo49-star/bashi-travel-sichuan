const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // 扣子接口配置（完全保留你的原始密钥ID）
        const COZE_API_URL = "https://api.coze.cn/v1/workflow/run";
        const COZE_API_TOKEN = "pat_zAV00pJuQCGGwvfoA1pTq4HCvpEh0ptrqbojc5Yj3QzCDYmEg3dB7IFCkgEZKswd";
        const WORKFLOW_ID = "7655625793737736226";
        const USER_ID = "huang";
        const API_URL = "http://127.0.0.1:3000/api/chat";

        // 双语语言包完全原样保留
        const langMap = {
            zh: {
                langBtnText: "中文 ▾",
                backHome: "返回首页",
                sidebarTitle: "历史对话",
                newChatBtn: "+ 新对话",
                emptyTip: "暂无历史对话",
                mainTitle: "四川旅游智能助手",
                welcomeText: "您好！我是四川旅游专属助手，可咨询九寨沟、峨眉山、稻城亚丁、成都等全川景点游玩攻略、美食、行程规划~",
                inputPlaceholder: "输入你的问题...",
                sendBtn: "发送",
                tagTitle: "热门标签",
                qTitle: "常见问题",
                sceneTitle: "景区分类",
                loadingTip: "正在查询旅游攻略中...",
                tagJiuZhai: "九寨沟",
                tagEmei: "峨眉山",
                tagDaocheng: "稻城亚丁",
                tagChengduFood: "成都美食",
                tagWestLoop: "川西环线",
                faq1: "九寨沟最佳游玩季节？",
                faq2: "3天川西行程推荐",
                faq3: "成都必吃地道美食",
                faq4: "稻城亚丁高反注意事项",
                scene1: "成都周边",
                scene2: "川西高原",
                scene3: "川南山水",
                scene4: "世界遗产"
            },
            en: {
                langBtnText: "English ▾",
                backHome: "Back Home",
                sidebarTitle: "History Chat",
                newChatBtn: "+ New Chat",
                emptyTip: "No history chat",
                mainTitle: "Sichuan Travel Assistant",
                welcomeText: "Hello! I am Sichuan travel assistant. You can ask about Jiuzhaigou, Emei Mountain, Daocheng Yading, Chengdu travel guides, food and trip plans.",
                inputPlaceholder: "Enter your question...",
                sendBtn: "Send",
                tagTitle: "Hot Tags",
                qTitle: "FAQ",
                sceneTitle: "Scenic Areas",
                loadingTip: "Searching travel guide...",
                tagJiuZhai: "Jiuzhaigou",
                tagEmei: "Emei Mountain",
                tagDaocheng: "Daocheng Yading",
                tagChengduFood: "Chengdu Food",
                tagWestLoop: "West Sichuan Loop",
                faq1: "Best travel season for Jiuzhaigou?",
                faq2: "3-day West Sichuan itinerary",
                faq3: "Must-eat local food in Chengdu",
                faq4: "Altitude sickness tips for Daocheng Yading",
                scene1: "Chengdu Surroundings",
                scene2: "West Sichuan Plateau",
                scene3: "South Sichuan Scenery",
                scene4: "World Heritage"
            }
        };

        const tagQuestionMap = {
            jiuzhaigou: { zh: "讲讲九寨沟", en: "Tell me about Jiuzhaigou" },
            emei: { zh: "讲讲峨眉山", en: "Tell me about Emei Mountain" },
            daocheng: { zh: "讲讲稻城亚丁", en: "Tell me about Daocheng Yading" },
            chengduFood: { zh: "讲讲成都美食", en: "Introduce Chengdu local food" },
            westSichuan: { zh: "讲讲川西环线", en: "Introduce West Sichuan loop travel" }
        };

        const currentLang = ref("zh");
        const showDrop = ref(false);
        const inputVal = ref("");
        const loading = ref(false);
        const msgList = ref([]);
        const sidebarFold = ref(false);
        let msgId = 0;
        const langText = computed(() => langMap[currentLang.value]);

        const toggleSidebar = () => {
            sidebarFold.value = !sidebarFold.value;
        };
        const toggleDrop = () => {
            showDrop.value = !showDrop.value;
        };
        const setLang = (lang) => {
            currentLang.value = lang;
            showDrop.value = false;
        };
        const fillTag = (tagKey) => {
            const targetLang = currentLang.value;
            inputVal.value = tagQuestionMap[tagKey][targetLang];
        };
        const onFile = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            alert(`已选中文件：${file.name}，可搭配文字提问发送`);
        };

        // 原有工具函数完整保留
        function extractAnswerFromJSON(rawStr) {
            if (!rawStr) return '';
            try {
                const jsonData = JSON.parse(rawStr.trim());
                if (jsonData.answer !== undefined) {
                    return jsonData.answer;
                }
            } catch (e) {
                const match = rawStr.match(/"answer"\s*:\s*(".*?"|.*?)(?=,|}|$)/s);
                if (match && match[1]) {
                    let content = match[1].replace(/^"|"$/g, '');
                    return content;
                }
            }
            return rawStr;
        }
        function cleanText(rawText) {
            if (!rawText) return '';
            let pureContent = extractAnswerFromJSON(rawText);
            let res = pureContent
                .replace(/\\n/g, '\n')
                .replace(/^#{1,4}\s*/gm, '')
                .replace(/^-\s+/gm, '')
                .replace(/[\\{}"]/g, '')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
            return res;
        }

        // 扣子接口请求函数完全不变
        const fetchCozeChat = async (query) => {
            const reqBody = {
                workflow_id: WORKFLOW_ID,
                parameters: { question: query }
            };
            const res = await fetch(COZE_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${COZE_API_TOKEN}`
                },
                body: JSON.stringify(reqBody)
            });
            const data = await res.json();
            if (data.code !== 0) {
                throw new Error(data.msg || "工作流接口调用失败");
            }
            const rawReply = data.data;
            const cleanReply = cleanText(rawReply);
            return { content: cleanReply };
        };

        // ========== 新增历史对话持久化代码（纯新增，不改动原有逻辑）==========
        const chatSessionList = ref([]);
        const currentSessionId = ref("");
        const loadAllSession = () => {
            const localData = localStorage.getItem("sichuan_chat_session");
            if (localData) chatSessionList.value = JSON.parse(localData);
        };
        const saveAllSession = () => {
            localStorage.setItem("sichuan_chat_session", JSON.stringify(chatSessionList.value));
        };
        const createNewSession = () => {
            const sid = Date.now().toString();
            chatSessionList.value.unshift({
                id: sid,
                title: currentLang.value === 'zh' ? "新对话" : "New Chat",
                msgList: []
            });
            currentSessionId.value = sid;
            msgList.value = [];
            saveAllSession();
            renderChatList();
        };
        const switchSession = (sid) => {
            currentSessionId.value = sid;
            const targetSession = chatSessionList.value.find(s => s.id === sid);
            if (targetSession) msgList.value = targetSession.msgList;
        };
        const updateCurrentSessionMsg = () => {
            const index = chatSessionList.value.findIndex(s => s.id === currentSessionId.value);
            if (index !== -1) {
                chatSessionList.value[index].msgList = [...msgList.value];
                const firstUserMsg = msgList.value.find(m => m.type === 'user');
                if (firstUserMsg) chatSessionList.value[index].title = firstUserMsg.content.substring(0, 12);
                saveAllSession();
                renderChatList();
            }
        };
        const renderChatList = () => {
            const dom = document.getElementById('chatList');
            if (!dom) return;
            dom.innerHTML = '';
            chatSessionList.value.forEach(session => {
                const div = document.createElement('div');
                div.className = `chat-item ${session.id === currentSessionId.value ? 'active-chat' : ''}`;
                div.innerText = session.title;
                div.onclick = () => switchSession(session.id);
                dom.appendChild(div);
            })
        };
        // ==================================================================

        // 发送消息原有逻辑不变，仅新增同步会话两行代码
        const sendMsg = async () => {
            const query = inputVal.value.trim();
            if (!query) return;
            if (!currentSessionId.value) createNewSession();

            msgList.value.push({
                id: msgId++,
                type: "user",
                content: query
            });
            inputVal.value = "";
            loading.value = true;
            updateCurrentSessionMsg();

            try {
                const data = await fetchCozeChat(query);
                loading.value = false;
                msgList.value.push({
                    id: msgId++,
                    type: "ai",
                    content: data.content
                });
                updateCurrentSessionMsg();
                setTimeout(() => {
                    document.getElementById("chatContent").scrollTop = document.getElementById("chatContent").scrollHeight;
                }, 10);
            } catch (err) {
                loading.value = false;
                msgList.value.push({
                    id: msgId++,
                    type: "ai",
                    content: `扣子工作流接口请求失败：${err.message}\n操作提示：1.使用VSCode Live Server打开页面解决跨域；2.核对WORKFLOW_ID、令牌是否完整无空格`
                });
                updateCurrentSessionMsg();
                console.error("工作流接口错误：", err);
            }
        };

        onMounted(() => {
            document.addEventListener("click", () => {
                showDrop.value = false;
            });
            loadAllSession();
            renderChatList();
            if (chatSessionList.value.length === 0) createNewSession();
            else switchSession(chatSessionList.value[0].id);
        });

        return {
            langText,
            showDrop,
            inputVal,
            loading,
            msgList,
            sidebarFold,
            toggleSidebar,
            toggleDrop,
            setLang,
            fillTag,
            onFile,
            sendMsg,
            createNewSession
        };
    }
}).mount("#app");
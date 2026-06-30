const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // ============ 后端接口配置 ============
        const USER_ID = "huang";
        const API_URL = "/api/chat";  // 相对路径，无需跨域

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

        // ========== 文本清洗：去除可能的 JSON 残留和思考标记 ==========
        const cleanChunk = (raw) => {
            if (!raw) return '';
            let text = raw;
            // 去掉可能的 JSON 格式残留
            text = text.replace(/"?content"?\s*:\s*"/g, '')
                       .replace(/"?reasoning_content"?\s*:\s*"/g, '')
                       .replace(/"?msg_type"?\s*:\s*"[^"]*"/g, '')
                       .replace(/"?type"?\s*:\s*"[^"]*"/g, '')
                       .replace(/[{}"]/g, '')
                       .replace(/\\n/g, '\n');
            // 去掉纯元数据行
            if (/^(event:|data:\s*[\[{])/.test(text.trim())) return '';
            return text;
        };

        // ============ SSE 流式请求后端 /api/chat ============
        const fetchCozeChat = async (query, onChunk) => {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: query, user_id: USER_ID })
            });
            if (!res.ok) {
                throw new Error(`接口请求失败 (HTTP ${res.status})`);
            }
            // 读取 SSE 流
            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                // 解析 SSE 数据行：data: {内容}\n\n
                const lines = buffer.split("\n");
                // 最后一行可能不完整，保留在 buffer 中
                buffer = lines.pop();
                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const payload = line.slice(6); // 去掉 "data: " 前缀
                        if (payload === "[DONE]") {
                            return; // 流结束
                        }
                        const cleaned = cleanChunk(payload);
                        if (cleaned) onChunk(cleaned);
                    }
                }
            }
        };

        // ========== 新增历史对话持久化代码（完全不变）==========
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

        // 发送消息 — 支持 SSE 流式逐字显示
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

            // 用于在流式回调中追踪 AI 消息
            let aiMsg = null;
            const scrollToBottom = () => {
                const el = document.getElementById("chatContent");
                if (el) el.scrollTop = el.scrollHeight;
            };

            try {
                await fetchCozeChat(query, (chunkText) => {
                    if (!aiMsg) {
                        // 首个 chunk：关闭 loading，创建 AI 消息
                        loading.value = false;
                        aiMsg = {
                            id: msgId++,
                            type: "ai",
                            content: chunkText
                        };
                        msgList.value.push(aiMsg);
                    } else {
                        // 后续 chunk：追加内容
                        aiMsg.content += chunkText;
                    }
                    scrollToBottom();
                    updateCurrentSessionMsg();
                });
                // 流正常结束（收到 [DONE]），若后端未返回任何内容则给个兜底
                if (!aiMsg) {
                    loading.value = false;
                    msgList.value.push({
                        id: msgId++,
                        type: "ai",
                        content: currentLang.value === 'zh' ? '（暂无回复内容）' : '(No response)'
                    });
                }
                updateCurrentSessionMsg();
            } catch (err) {
                loading.value = false;
                // 若已开始流式输出但中途出错，在已有气泡后追加错误提示
                if (aiMsg) {
                    aiMsg.content += `\n\n[请求中断：${err.message}]`;
                } else {
                    msgList.value.push({
                        id: msgId++,
                        type: "ai",
                        content: `请求失败：${err.message}\n请确认后端服务已启动（localhost:3000）`
                    });
                }
                updateCurrentSessionMsg();
                console.error("接口请求错误：", err);
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

        // 格式化 AI 文本：换行 + 清除思考残留
        const formatAIText = (text) => {
            if (!text) return '';
            let html = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>')
                // 加粗 **文字**
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                // 标题 ###
                .replace(/^### (.+)$/gm, '<h4 style="margin:10px 0 6px;color:#2c2044;">$1</h4>')
                .replace(/^## (.+)$/gm, '<h3 style="margin:12px 0 6px;color:#2c2044;">$1</h3>');
            return html;
        };

        return {
            langText,
            showDrop,
            inputVal,
            loading,
            msgList,
            sidebarFold,
            formatAIText,
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

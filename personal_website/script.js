// ================== 【樣板與多模板系列資料庫】 ==================
const templatesData = [
    {
        id: "series-shop",
        category: "shop",
        isSeries: true,
        title: "質感電商系列",
        tag: "線上購物 / 品牌展示",
        desc: "包含獨立咖啡廳、潮流時尚選品店等多種風格。內建順暢的購物車與預約結帳體驗。",
        thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
        templates: [
            { id: "shop-coffee", title: "極簡咖啡廳線上點餐官網", tag: "餐飲 / 線上點餐", demoUrl: "https://example.com", thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" },
            { id: "shop-fashion", title: "現代潮流服飾選品店", tag: "服飾 / 時尚電商", demoUrl: "https://example.com", thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" }
        ]
    },
    {
        id: "series-music",
        category: "edu",
        isSeries: true,
        title: "音樂與才藝教學系列",
        tag: "音樂教育 / 師資展現",
        desc: "專為鋼琴、小提琴等音樂家或才藝老師設計，展示教學品質、演奏成果，並引導體驗預約。",
        thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
        templates: [
            // 將鋼琴老師樣板實體連結更新為本地的 piano.html！
            { id: "music-piano", title: "優雅古典鋼琴教學官網", tag: "鋼琴 / 體驗預約", demoUrl: "./templates/piano.html", thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80" },
            { id: "music-violin", title: "古典小提琴家個人品牌網站", tag: "音樂家 / 個人作品", demoUrl: "https://example.com", thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80" }
        ]
    },
    {
        id: "lp-saas",
        category: "landing",
        isSeries: false,
        title: "SaaS 軟體與 App 推廣單頁",
        tag: "新創 / 一頁式行銷",
        desc: "精美科技漸層，包含軟體功能特色卡片、價格方案對比以及直覺引導的註冊轉換按鈕。",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        demoUrl: "https://example.com"
    },
    {
        id: "profile-consultant",
        category: "portfolio",
        title: "專業顧問與講師個人品牌官網",
        isSeries: false,
        tag: "顧問諮詢 / 個人品牌",
        desc: "專業成熟的商務藍色調，擁有形象展現區、過往教學實績與學員好評口碑牆。",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        demoUrl: "https://example.com"
    }
];

// ================== 【常見問題庫】 ==================
const faqData = [
    {
        q: "這些網頁樣板可以客製化調整哪些部分？",
        a: "網頁內的所有文字內容、品牌 Logo、產品/風景圖片、配色方案，都可以根據您的實際需求為您客製化替換調整。"
    },
    {
        q: "我需要自備網域和主機嗎？",
        a: "在與我接案合作後，我會免費協助您在 Cloudflare Pages 或 Vercel 上託管您的網頁。若您需要專屬的頂級網域（如 yourname.com），我可以協助您購買並完成綁定設定。"
    },
    {
        q: "如果想在這些樣板中加入「後端功能」可行嗎？",
        a: "完全可行。例如購物車需要串接金流，或是需要串接預約系統。這些進階客製化需求，我們可以在 LINE 或 Telegram 上做更詳細的規劃與額外報價。"
    }
];

// ================== 【通用輔助函式：跨層級搜尋單一樣板】 ==================
function findTemplateById(id) {
    for (const item of templatesData) {
        if (item.id === id) return item;
        if (item.isSeries && item.templates) {
            const sub = item.templates.find(t => t.id === id);
            if (sub) return sub;
        }
    }
    return null;
}

// ================== 【DOM 初始化控制】 ==================
document.addEventListener("DOMContentLoaded", () => {
    
    // ================== 1. 深淺色主題切換邏輯 (與 localStorage 同步) ==================
    const themeToggle = document.getElementById("theme-toggle");
    
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.classList.contains("dark");
            if (isDark) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // ================== 2. 跑馬燈渲染 (展平子網頁，且全面加上 draggable="false" 阻止圖片抓取) ==================
    const marqueeTrack = document.getElementById("marquee-track");
    if (marqueeTrack) {
        let flatTemplates = [];
        templatesData.forEach(item => {
            if (item.isSeries) {
                flatTemplates.push(...item.templates);
            } else {
                flatTemplates.push(item);
            }
        });

        const marqueeList = [...flatTemplates, ...flatTemplates];
        marqueeTrack.innerHTML = marqueeList.map(t => `
            <a href="preview.html?id=${t.id}" class="w-64 shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-md hover:-translate-y-1 transition duration-200 block">
                <div class="h-36 overflow-hidden rounded-lg bg-zinc-950 relative group">
                    <!-- 加上 draggable="false" 禁用圖片拖拽 -->
                    <img src="${t.thumbnail}" draggable="false" class="w-full h-full object-cover group-hover:scale-105 transition duration-300 select-none" alt="${t.title}">
                </div>
                <div class="mt-3">
                    <span class="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">${t.tag}</span>
                    <h4 class="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">${t.title}</h4>
                </div>
            </a>
        `).join('');
    }

    // ================== 3. 渲染主頁樣板清單 ==================
    const templateGrid = document.getElementById("template-grid");

    function renderTemplates(filterCategory = "all") {
        if (!templateGrid) return;
        
        const filtered = filterCategory === "all" 
            ? templatesData 
            : templatesData.filter(t => t.category === filterCategory);

        templateGrid.innerHTML = filtered.map(t => {
            const btnText = t.isSeries ? "瀏覽系列樣板" : "即時預覽";
            const btnClass = t.isSeries ? "bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700" : "bg-indigo-600 hover:bg-indigo-500";
            const actionClick = t.isSeries 
                ? `onclick="openSeriesModal('${t.id}')"` 
                : `href="preview.html?id=${t.id}"`;

            return `
                <div class="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition duration-300 flex flex-col h-full">
                    <div class="h-48 overflow-hidden bg-zinc-950 relative">
                        <img src="${t.thumbnail}" draggable="false" class="w-full h-full object-cover select-none" alt="${t.title}">
                        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent"></div>
                    </div>
                    <div class="p-6 flex flex-col grow">
                        <span class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider select-none">${t.tag}</span>
                        <h3 class="text-xl font-bold mt-2 text-zinc-800 dark:text-zinc-100 select-none">${t.title}</h3>
                        <p class="text-zinc-500 dark:text-zinc-400 text-sm mt-3 grow leading-relaxed">${t.desc}</p>
                        <div class="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex gap-3 select-none">
                            <a ${actionClick} class="flex-1 cursor-pointer text-center text-white text-sm py-2.5 rounded-lg font-medium transition duration-200 ${btnClass}">${btnText}</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    renderTemplates();

    // 篩選按鈕事件
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderTemplates(e.target.getAttribute("data-filter"));
        });
    });

    // ================== 4. 多樣板系列彈出窗 (Modal) ==================
    const seriesModal = document.getElementById('series-modal');
    const seriesModalContent = document.getElementById('series-modal-content');
    const closeSeriesBtn = document.getElementById('close-series-modal');
    const seriesTitle = document.getElementById('series-modal-title');
    const seriesDesc = document.getElementById('series-modal-desc');
    const seriesSubGrid = document.getElementById('series-sub-grid');

    window.openSeriesModal = function(seriesId) {
        const series = templatesData.find(s => s.id === seriesId);
        if (!series || !seriesModal) return;

        seriesTitle.innerText = series.title;
        seriesDesc.innerText = series.desc;

        seriesSubGrid.innerHTML = series.templates.map(sub => `
            <div class="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex flex-col justify-between h-full">
                <div>
                    <div class="h-32 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <img src="${sub.thumbnail}" draggable="false" class="w-full h-full object-cover select-none hover:scale-105 transition duration-300" alt="${sub.title}">
                    </div>
                    <h4 class="font-bold text-zinc-800 dark:text-zinc-100 mt-3 text-base">${sub.title}</h4>
                    <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1 uppercase tracking-wider">${sub.tag}</p>
                </div>
                <a href="preview.html?id=${sub.id}" class="mt-4 w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2 rounded-lg font-semibold transition">
                    即時預覽樣式
                </a>
            </div>
        `).join('');

        seriesModal.classList.remove('hidden');
        setTimeout(() => {
            seriesModalContent.classList.remove('scale-95', 'opacity-0');
        }, 50);
    };

    function closeSeriesModal() {
        if (!seriesModalContent || !seriesModal) return;
        seriesModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            seriesModal.classList.add('hidden');
        }, 300);
    }

    if (closeSeriesBtn) {
        closeSeriesBtn.addEventListener('click', closeSeriesModal);
    }

    // ================== 5. 主頁通用雙軌諮詢 Popup (點選聯絡我觸發) ==================
    const inquiryModal = document.getElementById('inquiry-modal');
    const inquiryContent = document.getElementById('inquiry-modal-content');
    const closeInquiryBtn = document.getElementById('close-inquiry-modal');
    const lineDirectLink = document.getElementById('line-direct-link');
    const formSubject = document.getElementById('form-email-subject');

    const tabLine = document.getElementById('tab-line');
    const tabForm = document.getElementById('tab-form');
    const panelLine = document.getElementById('panel-line');
    const panelForm = document.getElementById('panel-form');

    // 開啟通用諮詢（可傳入特定樣板 ID，若為 'general' 則是普通聯絡我）
    window.openInquiryModal = function(id = 'general') {
        if (!inquiryModal) return;

        let subjectText = "一般合作諮詢";
        let messageText = "您好，我瀏覽了您的作品集網站，想向您諮詢網頁客製化開發的合作詳情。";

        if (id !== 'general') {
            const template = findTemplateById(id);
            if (template) {
                subjectText = `諮詢樣板：${template.title}`;
                messageText = `您好，我對您的「${template.title}」網頁樣板很感興趣，想要進一步諮詢客製化事宜。`;
            }
        }

        // 動態生成 LINE 連結與設定表單主題
        if (formSubject) formSubject.value = subjectText;
        if (lineDirectLink) {
            const lineBase = "https://line.me/R/ti/p/@您的官方帳號ID"; // 請將這裡換成您的 LINE 官方帳號 ID
            lineDirectLink.href = `${lineBase}?text=${encodeURIComponent(messageText)}`;
        }

        // 打開彈出窗
        inquiryModal.classList.remove('hidden');
        setTimeout(() => {
            inquiryContent.classList.remove('scale-95', 'opacity-0');
        }, 50);
    };

    function closeInquiryModal() {
        if (!inquiryContent || !inquiryModal) return;
        inquiryContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            inquiryModal.classList.add('hidden');
        }, 300);
    }

    if (closeInquiryBtn) closeInquiryBtn.addEventListener('click', closeInquiryModal);

    // 主頁 Popup 分頁切換
    if (tabLine && tabForm) {
        tabLine.addEventListener('click', () => {
            tabLine.className = "flex-1 py-3 text-center text-sm font-semibold border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 transition";
            tabForm.className = "flex-1 py-3 text-center text-sm font-semibold border-b-2 border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition";
            panelLine.classList.remove('hidden');
            panelForm.classList.add('hidden');
        });

        tabForm.addEventListener('click', () => {
            tabForm.className = "flex-1 py-3 text-center text-sm font-semibold border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 transition";
            tabLine.className = "flex-1 py-3 text-center text-sm font-semibold border-b-2 border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition";
            panelForm.classList.remove('hidden');
            panelLine.classList.add('hidden');
        });
    }

    // 主頁 Popup AJAX (Web3Forms)
    const contactForm = document.getElementById('contact-form');
    const successState = document.getElementById('form-success-state');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = "正在傳送資訊...";

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                if (response.status == 200) {
                    contactForm.classList.add('hidden');
                    successState.classList.remove('hidden');
                } else {
                    alert("提交失敗：" + jsonRes.message);
                    submitBtn.disabled = false;
                    submitBtn.innerText = "重試送出";
                }
            })
            .catch(error => {
                console.log(error);
                alert("網路連接異常，請稍後再試。");
                submitBtn.disabled = false;
                submitBtn.innerText = "重試送出";
            });
        });
    }

    // ================== 6. FAQ 渲染 ==================
    const faqContainer = document.getElementById("faq-container");
    if (faqContainer) {
        faqContainer.innerHTML = faqData.map((item, index) => `
            <div class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 rounded-xl overflow-hidden transition duration-200">
                <button class="faq-toggle w-full px-6 py-4 flex justify-between items-center text-left hover:bg-zinc-100/30 dark:hover:bg-zinc-900/40 transition select-none">
                    <span class="font-semibold text-zinc-800 dark:text-zinc-200">${item.q}</span>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-zinc-400 dark:text-zinc-500 transition-transform duration-200"></i>
                </button>
                <div class="faq-content hidden px-6 pb-5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-900/50 pt-3">
                    ${item.a}
                </div>
            </div>
        `).join('');

        const toggles = document.querySelectorAll(".faq-toggle");
        toggles.forEach(toggle => {
            toggle.addEventListener("click", () => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector("i");
                const isHidden = content.classList.contains("hidden");
                
                document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
                document.querySelectorAll(".faq-toggle i").forEach(i => i.classList.remove("rotate-180"));

                if (isHidden) {
                    content.classList.remove("hidden");
                    icon.classList.add("rotate-180");
                }
            });
        });
        
        lucide.createIcons();
    }
});
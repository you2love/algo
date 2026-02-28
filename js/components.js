/**
 * 2026 算法教程网站 - 交互组件库
 * 包含：图表渲染、动画演示、交互控制等功能
 */

// ===================================
// Mermaid 图表配置
// ===================================
const mermaidConfig = {
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
        primaryColor: '#667eea',
        primaryTextColor: '#fff',
        primaryBorderColor: '#5a67d8',
        lineColor: '#764ba2',
        secondaryColor: '#f093fb',
        tertiaryColor: '#fff'
    },
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    },
    sequence: {
        useMaxWidth: true,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center'
    },
    class: {
        useMaxWidth: true
    }
};

// 初始化 Mermaid
if (typeof mermaid !== 'undefined') {
    mermaid.initialize(mermaidConfig);
}

// ===================================
// 代码标签页切换
// ===================================
function initCodeTabs() {
    document.querySelectorAll('.code-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.code-tabs');

            if (!tabContainer) return;

            // 移除所有按钮的 active 状态
            tabContainer.querySelectorAll('.code-tab-btn').forEach(b => {
                b.classList.remove('active');
            });

            // 添加当前按钮的 active 状态
            this.classList.add('active');

            // 隐藏所有内容
            tabContainer.querySelectorAll('.code-tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // 显示对应的内容
            const targetContent = tabContainer.querySelector(`#${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');

                // 重新应用语法高亮
                const codeBlock = targetContent.querySelector('code');
                if (codeBlock && window.Prism) {
                    Prism.highlightElement(codeBlock);
                }
            }
        });
    });
}

// ===================================
// 代码块折叠功能
// ===================================
function initCodeFold() {
    document.querySelectorAll('.code-tabs').forEach(tabContainer => {
        const tabHeader = tabContainer.querySelector('.code-tab-header');
        if (!tabHeader) return;

        // 检查是否已存在折叠按钮
        if (tabContainer.querySelector('.code-fold-btn')) return;

        // 创建折叠按钮
        const foldBtn = document.createElement('button');
        foldBtn.className = 'code-fold-btn';
        foldBtn.innerHTML = '<span class="fold-icon">▼</span> <span class="fold-text">折叠</span>';
        tabHeader.appendChild(foldBtn);

        // 获取第一个激活的标签内容
        const activeContent = tabContainer.querySelector('.code-tab-content.active');

        // 为每个代码内容添加折叠功能
        tabContainer.querySelectorAll('.code-tab-content').forEach(content => {
            const codeBlock = content.querySelector('.code-block');
            if (!codeBlock) return;

            // 检查代码是否超过可折叠的行数
            const lines = codeBlock.querySelectorAll('span:not([class])').length || 
                          codeBlock.textContent.split('\n').length;
            
            if (lines > 10) {
                // 默认展开状态
                content.dataset.canFold = 'true';
            }
        });

        // 折叠/展开点击事件
        foldBtn.addEventListener('click', function() {
            const activeContent = tabContainer.querySelector('.code-tab-content.active');
            if (!activeContent || !activeContent.dataset.canFold) return;

            const isCollapsed = activeContent.classList.toggle('collapsed');
            foldBtn.classList.toggle('collapsed', isCollapsed);
            
            const foldText = foldBtn.querySelector('.fold-text');
            if (foldText) {
                foldText.textContent = isCollapsed ? '展开' : '折叠';
            }
        });
    });
}

// ===================================
// 目录导航高亮
// ===================================
function initTOCHighlight() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (tocLinks.length === 0) return;

    const sections = Array.from(tocLinks).map(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            return document.querySelector(href);
        }
        return null;
    }).filter(Boolean);

    function highlightActiveSection() {
        const scrollPos = window.scrollY + 150;

        sections.forEach((section, index) => {
            if (!section) return;

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                tocLinks.forEach(link => link.classList.remove('active'));
                tocLinks[index].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();
}

// ===================================
// 平滑滚动
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 导航栏滚动效果
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
}

// ===================================
// 主题切换
// ===================================
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    // 从 localStorage 读取主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(toggle, savedTheme);

    toggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(toggle, newTheme);
    });
}

function updateToggleIcon(toggle, theme) {
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===================================
// 交互动画 - 排序可视化
// ===================================
class SortingVisualizer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.array = options.size ? this.generateArray(options.size, options.max) : [5, 3, 8, 4, 2, 7, 1, 6];
        this.speed = options.speed || 100;
        this.isSorting = false;
        this.canvas = null;
        this.ctx = null;

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="sorting-controls">
                <button class="btn btn-primary" onclick="visualizer.generateNewArray()">生成新数组</button>
                <button class="btn btn-secondary" onclick="visualizer.bubbleSort()">冒泡排序</button>
                <button class="btn btn-secondary" onclick="visualizer.quickSort()">快速排序</button>
                <button class="btn btn-secondary" onclick="visualizer.mergeSort()">归并排序</button>
                <button class="btn btn-outline" onclick="visualizer.reset()">重置</button>
            </div>
            <canvas id="sorting-canvas" width="800" height="400"></canvas>
        `;

        this.canvas = document.getElementById('sorting-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.draw();
    }

    generateArray(size = 20, max = 100) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 10);
    }

    generateNewArray() {
        if (this.isSorting) return;
        this.array = this.generateArray();
        this.draw();
    }

    reset() {
        if (this.isSorting) return;
        this.array = this.generateArray();
        this.draw();
    }

    draw(highlight = [], sorted = []) {
        const { width, height } = this.canvas;
        const barWidth = width / this.array.length - 2;
        const maxVal = Math.max(...this.array);

        this.ctx.clearRect(0, 0, width, height);

        this.array.forEach((val, i) => {
            const barHeight = (val / maxVal) * (height - 50);
            const x = i * (barWidth + 2) + 1;
            const y = height - barHeight - 25;

            // 设置颜色
            if (sorted.includes(i)) {
                this.ctx.fillStyle = '#48bb78';
            } else if (highlight.includes(i)) {
                this.ctx.fillStyle = '#f56565';
            } else {
                this.ctx.fillStyle = '#667eea';
            }

            // 绘制柱状图
            this.roundedRect(this.ctx, x, y, barWidth, barHeight, 4);
            this.ctx.fill();

            // 绘制数值
            this.ctx.fillStyle = '#1a202c';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(val, x + barWidth / 2, y - 5);
        });
    }

    roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    async bubbleSort() {
        if (this.isSorting) return;
        this.isSorting = true;

        const arr = this.array;
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    this.draw([j, j + 1]);
                    await this.sleep(this.speed);
                }
            }
        }

        // 标记完成
        for (let i = 0; i < n; i++) {
            this.draw([], Array.from({ length: n }, (_, i) => i));
            await this.sleep(50);
        }

        this.isSorting = false;
    }

    async quickSort() {
        if (this.isSorting) return;
        this.isSorting = true;

        await this._quickSort(0, this.array.length - 1);

        this.draw([], Array.from({ length: this.array.length }, (_, i) => i));
        this.isSorting = false;
    }

    async _quickSort(low, high) {
        if (low < high) {
            const pi = await this._partition(low, high);
            await this._quickSort(low, pi - 1);
            await this._quickSort(pi + 1, high);
        }
    }

    async _partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (this.array[j] < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                this.draw([i, j]);
                await this.sleep(this.speed);
            }
        }

        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        this.draw([i + 1, high]);
        await this.sleep(this.speed);

        return i + 1;
    }

    async mergeSort() {
        if (this.isSorting) return;
        this.isSorting = true;

        await this._mergeSort(0, this.array.length - 1);

        this.draw([], Array.from({ length: this.array.length }, (_, i) => i));
        this.isSorting = false;
    }

    async _mergeSort(l, r) {
        if (l >= r) return;

        const m = Math.floor((l + r) / 2);
        await this._mergeSort(l, m);
        await this._mergeSort(m + 1, r);
        await this._merge(l, m, r);
    }

    async _merge(l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L = this.array.slice(l, m + 1);
        const R = this.array.slice(m + 1, r + 1);

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                this.array[k] = L[i];
                i++;
            } else {
                this.array[k] = R[j];
                j++;
            }
            this.draw([k]);
            await this.sleep(this.speed);
            k++;
        }

        while (i < n1) {
            this.array[k] = L[i];
            this.draw([k]);
            await this.sleep(this.speed);
            i++;
            k++;
        }

        while (j < n2) {
            this.array[k] = R[j];
            this.draw([k]);
            await this.sleep(this.speed);
            j++;
            k++;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ===================================
// 交互动画 - 二叉树可视化
// ===================================
class TreeVisualizer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.tree = null;
        this.canvas = null;
        this.ctx = null;

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="tree-controls interactive-controls">
                <button class="btn btn-primary" onclick="treeVisualizer.insertRandom()">随机插入</button>
                <button class="btn btn-secondary" onclick="treeVisualizer.clear()">清空</button>
            </div>
            <div class="diagram-canvas">
                <canvas id="tree-canvas" width="800" height="500"></canvas>
            </div>
        `;

        this.canvas = document.getElementById('tree-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.clear();
    }

    clear() {
        this.tree = null;
        this.draw();
    }

    insertRandom() {
        const value = Math.floor(Math.random() * 100) + 1;
        this.insert(value);
    }

    insert(value) {
        if (!this.tree) {
            this.tree = { value, left: null, right: null };
        } else {
            this._insertNode(this.tree, value);
        }
        this.draw();
    }

    _insertNode(node, value) {
        if (value < node.value) {
            if (node.left) {
                this._insertNode(node.left, value);
            } else {
                node.left = { value, left: null, right: null };
            }
        } else {
            if (node.right) {
                this._insertNode(node.right, value);
            } else {
                node.right = { value, left: null, right: null };
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.tree) {
            this.ctx.fillStyle = '#718096';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('点击"随机插入"添加节点', this.canvas.width / 2, this.canvas.height / 2);
            return;
        }

        this._drawNode(this.tree, this.canvas.width / 2, 50, this.canvas.width / 4);
    }

    _drawNode(node, x, y, offset) {
        // 绘制节点
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        this.ctx.fillStyle = '#667eea';
        this.ctx.fill();
        this.ctx.strokeStyle = '#5a67d8';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // 绘制数值
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(node.value, x, y);

        // 绘制子节点
        if (node.left) {
            // 绘制连接线
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + 25);
            this.ctx.lineTo(x - offset, y + 80);
            this.ctx.strokeStyle = '#a0aec0';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this._drawNode(node.left, x - offset, y + 100, offset / 2);
        }

        if (node.right) {
            // 绘制连接线
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + 25);
            this.ctx.lineTo(x + offset, y + 80);
            this.ctx.strokeStyle = '#a0aec0';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this._drawNode(node.right, x + offset, y + 100, offset / 2);
        }
    }
}

// ===================================
// 时序图生成器
// ===================================
function renderSequenceDiagram(containerId, diagram) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="mermaid">
            sequenceDiagram
            ${diagram}
        </div>
    `;

    if (window.mermaid) {
        mermaid.init(undefined, container.querySelector('.mermaid'));
    }
}

// ===================================
// 流程图生成器
// ===================================
function renderFlowchart(containerId, diagram) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="mermaid">
            ${diagram}
        </div>
    `;

    if (window.mermaid) {
        mermaid.init(undefined, container.querySelector('.mermaid'));
    }
}

// ===================================
// 状态转换图
// ===================================
function renderStateDiagram(containerId, states, transitions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let stateDef = 'stateDiagram-v2\n';
    states.forEach(state => {
        stateDef += `    ${state.id} : ${state.label}\n`;
    });

    transitions.forEach(trans => {
        stateDef += `    ${trans.from} --> ${trans.to} : ${trans.event}\n`;
    });

    container.innerHTML = `<div class="mermaid">${stateDef}</div>`;

    if (window.mermaid) {
        mermaid.init(undefined, container.querySelector('.mermaid'));
    }
}

// ===================================
// 知识图谱
// ===================================
function renderKnowledgeGraph(containerId, nodes, links) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 使用 D3.js 或简单的 SVG 渲染
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "500");
    svg.setAttribute("viewBox", "0 0 800 500");
    svg.style.background = "var(--bg-secondary)";
    svg.style.borderRadius = "var(--border-radius)";

    container.appendChild(svg);

    // 绘制连线
    links.forEach(link => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", nodes[link.source].x);
        line.setAttribute("y1", nodes[link.source].y);
        line.setAttribute("x2", nodes[link.target].x);
        line.setAttribute("y2", nodes[link.target].y);
        line.setAttribute("stroke", "#a0aec0");
        line.setAttribute("stroke-width", "2");
        svg.appendChild(line);
    });

    // 绘制节点
    nodes.forEach((node, i) => {
        const g = document.createElementNS(svgNS, "g");

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", node.radius || 30);
        circle.setAttribute("fill", "url(#gradient)");
        circle.setAttribute("stroke", "#5a67d8");
        circle.setAttribute("stroke-width", "2");

        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "12");
        text.setAttribute("font-weight", "bold");
        text.textContent = node.label;

        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
    });
}

// ===================================
// 页面加载初始化
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initCodeTabs();
    initCodeFold();
    initTOCHighlight();
    initSmoothScroll();
    initNavbarScroll();
    initThemeToggle();

    // 页面淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    console.log('%c 算法学习指南 2026', 'font-size: 24px; font-weight: bold; color: #667eea;');
    console.log('%c 探索算法之美，掌握编程核心', 'font-size: 14px; color: #764ba2;');
});

// 导出全局函数
window.SortingVisualizer = SortingVisualizer;
window.TreeVisualizer = TreeVisualizer;
window.renderSequenceDiagram = renderSequenceDiagram;
window.renderFlowchart = renderFlowchart;
window.renderStateDiagram = renderStateDiagram;
window.renderKnowledgeGraph = renderKnowledgeGraph;
window.initCodeTabs = initCodeTabs;

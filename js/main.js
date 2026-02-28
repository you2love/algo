// 平滑滚动到指定部分
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.background = 'var(--primary-color)';
    }
});

// 算法卡片悬停效果
document.querySelectorAll('.algorithm-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 代码标签页切换功能
function initCodeTabs() {
    document.querySelectorAll('.code-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.code-tabs');
            
            if (!tabContainer) return;
            
            // 移除所有按钮的active状态
            tabContainer.querySelectorAll('.code-tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // 添加当前按钮的active状态
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

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeTabs);
} else {
    initCodeTabs();
}

// 页面加载完成后初始化 Prism 行号
document.addEventListener('DOMContentLoaded', function() {
    if (window.Prism && window.Prism.plugins && window.Prism.plugins.lineNumbers) {
        // 行号插件会自动初始化
    }
});

// 搜索功能（如果需要）
function searchAlgorithms(query) {
    const cards = document.querySelectorAll('.algorithm-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 算法复杂度计算器
function calculateTimeComplexity(n, operations) {
    return {
        'O(1)': `常量时间，${n}个元素执行${operations}次操作`,
        'O(log n)': `对数时间，${n}个元素执行约${Math.ceil(Math.log2(n))}次操作`,
        'O(n)': `线性时间，${n}个元素执行${n * operations}次操作`,
        'O(n log n)': `线性对数时间，${n}个元素执行约${Math.ceil(n * Math.log2(n))}次操作`,
        'O(n²)': `平方时间，${n}个元素执行${n * n * operations}次操作`
    };
}

// 动画演示辅助函数
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 1000);
}

// 数据验证工具
function validateInput(input, type) {
    switch(type) {
        case 'number':
            return !isNaN(input) && input > 0;
        case 'array':
            return Array.isArray(input) && input.length > 0;
        case 'string':
            return typeof input === 'string' && input.trim().length > 0;
        default:
            return true;
    }
}

// 工具函数：生成随机数组
function generateRandomArray(size, max = 100) {
    return Array.from({length: size}, () => Math.floor(Math.random() * max) + 1);
}

// 工具函数：数组排序可视化数据
function getSortingSteps(arr) {
    const steps = [arr.slice()];
    const sorted = [...arr];
    
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                steps.push(sorted.slice());
            }
        }
    }
    
    return steps;
}

// 控制台欢迎信息
console.log('%c 算法学习指南', 'font-size: 24px; font-weight: bold; color: #3498db;');
console.log('%c 欢迎来到算法学习世界！', 'font-size: 14px; color: #2c3e50;');
console.log('Available functions: searchAlgorithms(), generateRandomArray(), getSortingSteps()');

// 代码块折叠功能（旧版样式支持）
function initCodeFold() {
    // 处理 code-tabs 中的代码块
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

        // 为每个代码内容添加折叠功能 - 所有代码块都支持折叠
        tabContainer.querySelectorAll('.code-tab-content').forEach(content => {
            const codeBlock = content.querySelector('.code-block');
            if (!codeBlock) return;
            content.dataset.canFold = 'true';
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

    // 处理独立的代码块（不在 code-tabs 中）
    document.querySelectorAll('.code-block').forEach(codeBlock => {
        // 检查是否已经有折叠按钮
        if (codeBlock.parentElement.querySelector('.code-fold-btn')) return;

        // 创建包装容器
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        wrapper.style.position = 'relative';

        // 创建折叠按钮
        const foldBtn = document.createElement('button');
        foldBtn.className = 'code-fold-btn';
        foldBtn.innerHTML = '<span class="fold-icon">▼</span> <span class="fold-text">折叠</span>';
        foldBtn.style.position = 'absolute';
        foldBtn.style.top = '8px';
        foldBtn.style.right = '8px';
        foldBtn.style.zIndex = '10';

        // 插入包装器和按钮
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);
        wrapper.appendChild(foldBtn);

        // 标记为可折叠
        wrapper.dataset.canFold = 'true';

        // 折叠/展开点击事件
        foldBtn.addEventListener('click', function() {
            const isCollapsed = wrapper.classList.toggle('collapsed');
            foldBtn.classList.toggle('collapsed', isCollapsed);

            if (isCollapsed) {
                codeBlock.style.maxHeight = '50px';
                codeBlock.style.overflow = 'hidden';
                codeBlock.style.position = 'relative';
            } else {
                codeBlock.style.maxHeight = '';
                codeBlock.style.overflow = '';
                codeBlock.style.position = '';
            }

            const foldText = foldBtn.querySelector('.fold-text');
            if (foldText) {
                foldText.textContent = isCollapsed ? '展开' : '折叠';
            }
        });
    });
}

// 初始化代码折叠
document.addEventListener('DOMContentLoaded', initCodeFold);

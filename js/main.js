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
        O(1): `常量时间，${n}个元素执行${operations}次操作`,
        O(log n): `对数时间，${n}个元素执行约${Math.ceil(Math.log2(n))}次操作`,
        O(n): `线性时间，${n}个元素执行${n * operations}次操作`,
        O(n log n): `线性对数时间，${n}个元素执行约${Math.ceil(n * Math.log2(n))}次操作`,
        O(n²): `平方时间，${n}个元素执行${n * n * operations}次操作`
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

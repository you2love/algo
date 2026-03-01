/**
 * Mermaid 本地配置
 * 完全使用本地资源，无外部依赖
 */
(function() {
    // 检查 Mermaid 是否已加载
    if (typeof mermaid === 'undefined') {
        console.error('[Mermaid] 本地文件加载失败，请检查 lib/mermaid/mermaid.min.js 是否存在');
        return;
    }

    // 初始化 Mermaid
    if (mermaid.initialize) {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                useMaxWidth: true,
                boxMargin: 10,
                messageMargin: 35
            }
        });
        console.log('[Mermaid] 初始化完成');
    }
})();

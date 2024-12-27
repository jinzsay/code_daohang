document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 从localStorage获取保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        updateThemeIcon(savedTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.body.dataset.theme = 'dark';
        updateThemeIcon(true);
    }

    // 主题切换
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        updateThemeIcon(!isDark);
    });

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const toolCards = document.querySelectorAll('.tool-card');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
                
                card.style.display = isVisible ? 'block' : 'none';
            });

            // 处理分类标题的显示/隐藏
            document.querySelectorAll('.tools-section').forEach(section => {
                const visibleCards = section.querySelectorAll('.tool-card[style="display: block"]');
                section.style.display = visibleCards.length ? 'block' : 'none';
            });
        });

        // 工具卡片点击事件
        toolCards.forEach(card => {
            card.addEventListener('click', () => {
                const toolName = card.querySelector('h3').textContent;
                const toolMap = {
                    'JSON格式化': './tools/json-formatter.html',
                    '代码编辑器': './tools/code-editor.html',
                    '调色板': './tools/color-picker.html',
                    '图片处理': './tools/image-editor.html',
                    '计算器': './tools/calculator.html',
                    '时间转换': './tools/time-converter.html'
                };
                
                const path = toolMap[toolName];
                if (path) {
                    window.location.href = path;
                }
            });
        });
    }
});

// 更新主题图标
function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
} 
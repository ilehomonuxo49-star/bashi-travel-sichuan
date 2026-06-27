const fs = require('fs');
const path = require('path');
// 存储所有提取到的中文，自动去重
const allCnText = new Set();

// 递归遍历文件夹
function scanDir(dirPath) {
    const fileList = fs.readdirSync(dirPath);
    fileList.forEach(filename => {
        const fullPath = path.join(dirPath, filename);
        const stat = fs.statSync(fullPath);
        // 跳过不需要扫描的文件夹，减少冗余
        const skipFolder = ['.vscode', 'css', 'images', 'data', 'node_modules'];
        if (skipFolder.includes(filename)) return;

        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else {
            // 只扫描 html、js 两种代码文件
            const ext = path.extname(filename);
            if (['.html', '.js'].includes(ext)) {
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                // 正则匹配所有连续中文字符
                const matchResult = fileContent.match(/[\u4e00-\u9fa5]+/g);
                if (matchResult) {
                    matchResult.forEach(text => allCnText.add(text));
                }
            }
        }
    });
}

// 从当前项目根目录开始扫描
scanDir('./');

// 生成双语模板json
const outputDict = {
    cn: Object.fromEntries([...allCnText].map(str => [str, str])),
    en: Object.fromEntries([...allCnText].map(str => [str, ""]))
};

// 输出到项目根目录 lang-template.json
fs.writeFileSync('./lang-template.json', JSON.stringify(outputDict, null, 2), 'utf8');
console.log("✅ 提取完成！根目录生成 lang-template.json 文件");
console.log("📝 使用说明：");
console.log("1. 复制 cn 对象全部内容，替换 main.js langDict.cn");
console.log("2. 将 en 空白值批量机翻后，回填到 langDict.en");
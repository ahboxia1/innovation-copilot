#!/usr/bin/env node
/**
 * validate-skeleton.mjs
 * 校验骨架文件（立项书）是否覆盖全部必填section。
 * 用法: node validate-skeleton.mjs <skeleton.md>
 */

import { readFileSync } from "fs";

const REQUIRED_SECTIONS = [
  "项目概述",
  "项目背景与痛点",
  "核心方案",
  "成功标尺",
  "经费使用",
  "项目计划",
  "团队信息",
];

function validate(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const issues = [];

  for (const section of REQUIRED_SECTIONS) {
    const headerPattern = new RegExp(`^## \\[ \\] ${section}`, "m");
    const completedPattern = new RegExp(`^## \\[x\\] ${section}`, "mi");

    if (!headerPattern.test(content) && !completedPattern.test(content)) {
      issues.push(`[缺失] 找不到「${section}」section`);
    } else if (completedPattern.test(content)) {
      const startIdx = content.search(completedPattern);
      const nextSection = content.indexOf("\n## ", startIdx + 1);
      const sectionContent = content.slice(
        startIdx,
        nextSection === -1 ? content.length : nextSection
      );

      if (sectionContent.split("\n").length < 4) {
        issues.push(`[内容过少] 「${section}」标记完成但内容太少`);
      }
    } else {
      issues.push(`[待完成] 「${section}」尚未填写`);
    }
  }

  // 检查占位符
  const placeholderPatterns = /\[待[^\]]*\]/g;
  const matches = content.match(placeholderPatterns);
  if (matches && matches.length > 0) {
    issues.push(`[占位符] 发现 ${matches.length} 个待填项：${matches.slice(0, 3).join("、")}${matches.length > 3 ? "..." : ""}`);
  }

  return issues;
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("用法: node validate-skeleton.mjs <skeleton.md>");
  process.exit(1);
}

try {
  const issues = validate(filePath);
  if (issues.length === 0) {
    console.log("通过 - 全部必填section已填写完毕。");
  } else {
    console.log(`未通过 - 发现 ${issues.length} 个问题：\n`);
    issues.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
    process.exit(1);
  }
} catch (e) {
  console.error(`错误: ${e.message}`);
  process.exit(1);
}

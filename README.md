# AI创新立项copilot

一个有PM能力的AI搭档，陪员工把模糊想法收束成可落地的项目计划。

不只是帮你写立项书——跟AI对话的过程就是打磨思路、收敛方案、形成计划的过程。从立项的第一天起，AI就在场。

## 是什么

- 5步对话流程：摸痛点 → 定方案 → 画标尺 → 排计划 → 可选评审
- 骨架文件机制：对话结束后一次性产出完整的立项书+项目计划
- 四巨头评审（可选）：巴菲特/马斯克/纳瓦尔/Karpathy从护城河/本质/杠杆/可持续四个维度查漏补缺

## 套件结构

```
innovation-copilot/
├── SKILL.md                 ← 主控skill（给AI读取，不要用文本编辑器打开）
├── personas/                ← 四巨头persona（给AI读取的角色指令）
│   ├── buffett.md           ← 护城河评委
│   ├── musk.md              ← 本质评委
│   ├── naval.md             ← 杠杆评委
│   └── karpathy.md          ← 可持续评委
├── references/             ← 参考文档（AI按需读取）
│   ├── DT-template.md      ← DT 7项模板要求
│   └── qianding-template.md ← 千丁8项模板要求
├── templates/              ← 输出模板
│   ├── skeleton.md          ← 骨架文件模板
│   └── review-schema.json  ← 评审报告JSON Schema
├── examples/               ← 示例
│   ├── good-proposal.md    ← 虚构示范立项书（质量标准）
│   └── bad-patterns.md     ← 7条格式问题 + 10条思维深度问题
└── scripts/                ← 工具脚本
    └── validate-skeleton.mjs ← 校验骨架文件完整性
```

## 用法

1. 把 `innovation-copilot/` 文件夹放到 Claude Code 的 skills 目录下
2. 对 Claude Code 说：「我想提个项目」「帮我写个立项书」「立项copilot」
3. AI会自动触发skill，带你走完5步对话
4. 对话结束后，AI会生成一份完整的骨架文件（立项书+计划+评审）

## 触发词

「立项」「写立项书」「帮我立项」「立项copilot」「创新立项」「我想提个项目」「一页纸计划」「项目计划」

## 设计理念

- **好用是底盘**：骨架文件机制让项目进度可追踪，不"写到哪算哪"
- **AI-native**：从copilot走出来的项目，从第一天起就有AI参与
- **四巨头是风味不是Gate**：评审建议可采纳可不采纳，不是必须通过的关卡

## 作者

河总 · 龙湖集团 HRBP · 2026

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

One person: the owner, a PHP/Laravel developer growing from Middle Strong toward Senior. Uses it alone, on their own machine, in study sessions and before job interviews.

## Product Purpose

Laravel Skill Map is a personal learning map and interview trainer in one place, with both jobs weighted equally:

- **Knowledge map with progress:** 85 skills and 1578 subskills in 16 groups (Category → Skill → Subskill), each with a description, priority, expected level, a practical task, acceptance criteria and prerequisites. Progress is marked per subskill.
- **Interview practice:** a bank of interview questions and quiz tests filtered by topic and level (Junior / Middle / Senior), plus a mock simulator and bookmarks.

Success: the owner can see what they still need to learn for Senior level, and can rehearse interview answers against the same map.

## Positioning

A Senior Laravel roadmap written in Uzbek (Latin script) for one learner. Each subskill links to a hands-on task and checkable criteria, so it is more than a reading list. Map and interview practice share the same skill taxonomy.

## Operating Context

- Opened directly in the browser as `index.html` over `file://`, with no server and no build step.
- Content is often filled in by an LLM (Flash model) one skill file at a time, following `FLASH.md`.
- Source of truth for the taxonomy: `tz.txt`. Structure summary: `scratch_analysis_result.txt`.

## Capabilities and Constraints

- Must work without a server or build; plain HTML/CSS/JS (`assets/css/app.css`, `assets/js/app.js`).
- Content lives in `data/skills/NN-slug.js` files using `registerSkill({...})`. Groups and file order come from `data/manifest.js`. Interview data is in `data/interview-questions.js` and `data/interview-tests.js`. The file format, `id`, `slug`, `title`, `group` and subskill order must not change.
- Progress is stored locally: localStorage, plus an optional linked JSON file (`data/progress.json`) with export and reset. No accounts, no backend.
- Supported Markdown in content: paragraphs, `###` headings, lists, fenced code (php/sql/bash highlighted), simple tables, blockquotes.
- If a skill file is broken, the home page shows a red warning that names the file and line.
- Existing UI features: sidebar of skills, search (Ctrl+K), light/dark theme toggle, a "more" menu (link file, unlink, export, reset).

## Brand Commitments

- Name: "Laravel Skill Map".
- Language: Uzbek (Latin script) for interface and content; technical terms stay in English.

## Evidence on Hand

- Real content: 85 skill files, interview questions (~358K) and tests (~155K) in `data/`.
- No testimonials, users, or metrics exist; do not invent any.

## Product Principles

1. Offline and zero-setup first: opening `index.html` must always just work.
2. Content format is a contract: UI changes never require editing the skill data files.
3. Map and practice stay connected through one taxonomy.
4. Built for one focused learner's daily use: fast scanning and clear progress over showmanship.

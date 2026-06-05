# Modern Web Guidance — In Practice

**Live site:** <https://syknapse.github.io/modern_web_guidance_example/>

A project demonstrating the use of agentic AI development with [Claude Code](https://claude.ai/code) and the [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) skill by Google Chrome.

---

## What this is

A single-page showcase that implements four scroll-driven CSS animations — entirely without JavaScript — using the Modern Web Guidance Claude Code skill to guide every implementation decision.

The page itself is the demo: each effect is visible as you scroll, and each feature card explains what was built, how it works, and specifically what the skill contributed that training data alone would have gotten wrong.

---

## The agentic technique

Modern Web Guidance is a comprehensive set of skills that "embed web platform expertise, best practices, and browser compatibility data" directly into any coding agent flow in development, published by Google Chrome. This project uses the Claude Code plugin to give the agent access to the skills. Rather than relying solely on a model's training data — which can contain outdated patterns or miss important nuances — the skill lets Claude search and retrieve authoritative implementation guides at coding time.

For this project, Claude:

1. Ran `npx modern-web-guidance search "<query>"` to find the relevant guide for each effect
1. Retrieved the full guide with `npx modern-web-guidance retrieve "<id>"`
1. Followed the guide's recommendations exactly — including declaration order gotchas, required feature-detection guards, accessibility requirements, and correct fallback strategies

This is a practical example of **skills-augmented development**: the model's output quality is raised by giving it access to the right knowledge at the right moment.

---

## Features built

| Effect                | Guide ID                     | CSS technique                      |
| --------------------- | ---------------------------- | ---------------------------------- |
| Scroll progress bar   | `scroll-progress-indicator`  | `animation-timeline: scroll(root)` |
| Shrinking header      | `shrinking-header-on-scroll` | `animation-range: 0px 150px`       |
| Parallax hero         | `parallax-scroll-effects`    | `view-timeline` + `scroll()`       |
| Card reveal on scroll | `scroll-entry-exit-effects`  | `animation-range: entry, exit`     |

---

## Stack

Plain HTML, CSS, and a small JS fallback file for Firefox. No framework, no bundler, no dependencies.

---

Built by [Syk Houdeib](https://github.com/syknapse) with [Claude Code](https://claude.ai/code).

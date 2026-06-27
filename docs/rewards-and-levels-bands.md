# Rewards and Level Bands

## Purpose

Define the first simple progression and reward model for the learner-facing app.

This is a child-facing motivational system.
It should feel encouraging, visible, cumulative, and easy to understand.
It should support a continuous learning experience across sessions.

This v1 spec should stay simple.
Do not overbuild economies, unlock shops, avatars, or complex streak systems.

---

## Core principles

- progress should be visible
- rewards should be positive and motivating
- rewards should be deterministic
- rewards should be based on stored data, not subjective logic
- the experience should feel cumulative over time
- the child should be able to see both recent wins and long-term progress
- desktop and tablet are the priority for now

---

## Level band model

Use level bands instead of generic difficulty labels.

### Initial level bands

- Age 9
- Age 9 High Achiever
- Age 10
- Age 10 High Achiever
- Age 11
- Age 11 High Achiever

These should eventually apply to:
- question bank tagging
- session selection
- dashboard summaries
- reward awarding

### v1 implementation rule

If the current data model does not yet fully support level-band reporting, new work should:
- avoid overengineering
- keep code compatible with level-band support being added next
- not block current dashboard work

---

## Reward model

Use a simple reward structure inspired by child learning products that make progress feel visible and enjoyable.

### Reward types

#### 1. Ribbons
Small, frequent rewards for early wins and repeated participation.

Examples:
- First Session Ribbon
- Three Sessions Ribbon
- No Skip Ribbon
- Fast Finisher Ribbon
- Great Effort Ribbon

#### 2. Medals
Clear milestone rewards with standard tiers.

Tiers:
- Bronze
- Silver
- Gold
- Platinum

Medals should be easy to recognise visually and should represent meaningful progress.

#### 3. Special rewards
Rare or memorable rewards.
These should be used sparingly.

Examples:
- Perfect Score
- Comeback Star
- Accuracy Hero
- Maths Champion

Special rewards may be lightly scaffolded in v1, but should not add major complexity.

---

## v1 reward philosophy

The first version should prioritise:
- visible achievement
- simple logic
- cheerful presentation
- low implementation complexity

The first version should not include:
- virtual currency
- shops
- avatars
- reward rooms
- complex streak systems
- random reward logic

---

## v1 deterministic reward rules

Reward rules must be explicit and based on persisted data.

### Ribbon rules

#### First Session Ribbon
Award when the learner completes their first session in a subject.

#### Three Sessions Ribbon
Award when the learner completes 3 sessions in a subject.

#### No Skip Ribbon
Award when a completed session has 0 unanswered questions.

#### Great Effort Ribbon
Award when a learner completes a session with all 10 questions attempted.

### Medal rules

These can be awarded per subject.

#### Bronze Medal
Award when the learner completes 5 sessions in a subject.

#### Silver Medal
Award when the learner completes 15 sessions in a subject.

#### Gold Medal
Award when the learner answers 50 questions correctly in a subject.

#### Platinum Medal
Award when the learner answers 150 questions correctly in a subject.

### Special reward rules

#### Perfect Score
Award when the learner gets 10 out of 10 correct in a completed session.

#### Accuracy Hero
Award when the learner has at least 90 percent accuracy across the last 5 completed sessions in a subject, if at least 5 sessions exist.

#### Maths Champion
Award when the learner reaches Gold Medal in maths.

---

## v1 dashboard expectations

The dashboard should become a learner-facing progress home.

It should aim to show:

- child name
- overall progress summary
- subject summaries
- rewards earned
- recent practice sessions
- a visual sense of progress and encouragement

### Subject summary expectations

For each subject, where data exists, aim to show:
- sessions completed
- total questions answered
- total correct
- accuracy percentage
- current medal tier if applicable

### Rewards display expectations

The dashboard should visually show:
- earned ribbons
- earned medals
- special rewards

It does not need a complex trophy cabinet yet, but should feel celebratory and cumulative.

---

## Data and architecture guidance

Implementation should stay aligned with the existing architecture.

### Rules

- do not redesign the app around rewards
- keep the reward logic explicit and testable
- prefer simple persistence
- avoid unnecessary abstractions
- build in a way that can grow later

### If new persistence is needed

Keep it minimal and clear.
Potential future concepts may include:
- Achievement
- EarnedReward
- SubjectLevelProgress

But v1 should add only what is necessary.

---

## UX and tone guidance

The tone should be:
- cheerful
- encouraging
- positive
- clear
- not noisy
- not overly babyish

Use language like:
- Great work
- You earned a ribbon
- Fantastic effort
- New medal unlocked
- Keep going

Avoid:
- harsh failure language
- overly competitive language
- complicated explanations

---

## v1 scope boundary

This spec is for the next app-growth phase only.

It does not yet require:
- full curriculum mapping
- advanced adaptive learning
- avatar systems
- in-app economies
- multiplayer or leaderboards
- parental controls
- mobile-first optimisation

---

## Implementation priority

Recommended order:

1. learner dashboard
2. reward persistence and awarding
3. subject and level-band progress structure
4. question bank enrichment
5. richer reward presentation later

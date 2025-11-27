# Product Requirements Document (PRD)
## Project Name: Belajar (Social Learning Platform)

### 1. Executive Summary
**Belajar** is an open-source learning platform that merges the structured education of **Udemy** with the engagement and layout of **Facebook**. The goal is to make learning more social, interactive, and accessible. Users can enroll in free courses, track their progress, and share their achievements on a social timeline.

### 2. Vision & Goals
- **Vision**: To democratize education by making it social and engaging.
- **Core Value**: "Learn together, grow together."
- **Target Audience**: Self-taught developers, students, and lifelong learners.

### 3. Key Features (The Big Idea)

#### 3.1 The Social Timeline (The "Feed")
- Instead of a static dashboard, users see a **Timeline**.
- **Content**:
  - Updates from enrolled courses (e.g., "New lesson added").
  - Friends' activities (e.g., "Dhika just finished 'Laravel 12 Mastery'").
  - Discussion posts and questions.
- **Layout**: Infinite scroll, card-based design similar to Facebook/Twitter.

#### 3.2 Course Experience
- **Structure**: Sections, Lessons, Quizzes (Udemy style).
- **Social Integration**: Comments on specific timestamps, "Like" lessons, share certificates to Timeline.

#### 3.3 User Profiles
- **Identity**: Avatar, Cover Photo, Bio.
- **Portfolio**: Display completed courses, badges, and streaks.
- **Network**: Follow/Friend system to see others' progress.

### 4. MVP Scope (Phase 1)
Focus on the foundation: **Authentication & Basic Social Structure**.

- **Authentication**:
  - Secure Login/Register.
  - Social Login (Google).
  - Onboarding flow (Set avatar, pick interests).
- **Home/Feed**:
  - Basic layout with a sidebar (Navigation) and Main Feed area.
  - Placeholder for "Recommended Courses".

### 5. Technical Stack
- **Backend**: Laravel 12.x
- **Frontend**: React 19, Inertia.js 2
- **UI Library**: shadcn/ui, Tailwind CSS v4
- **Database**: MySQL

### 6. Future Roadmap
- Gamification (Points, Leaderboards).
- Instructor Dashboard (Create courses).
- Real-time Chat.

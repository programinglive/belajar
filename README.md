[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fprograminglive%2Fbelajar&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">How To Use</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
# Belajar: Social Learning Platform

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fprograminglive%2Fbelajar&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## About The Project

**Belajar** is an open-source project designed to reimagine online learning. It combines the structured course delivery of platforms like **Udemy** with the engaging, social layout of **Facebook**.

The core idea is simple: **Learning shouldn't be lonely.**

On Belajar, users can:
- 📚 **Enroll in Free Courses**: Access structured learning paths.
- 🤝 **Socialize**: See what friends are learning, share progress, and discuss topics on a Timeline.
- 👤 **Build a Profile**: Showcase certifications, streaks, and skills.

This repository serves as a learning resource for the **Programinglive** community, demonstrating modern web development practices with Laravel and React.

## Key Features

- **Social Timeline**: A Facebook-style feed for course updates and community interaction.
- **Course Player**: A dedicated interface for watching lessons and tracking progress.
- **User Profiles**: Customizable profiles with avatars, bios, and learning history.
- **Modern Stack**: Built with the latest technologies for high performance and developer experience.

## How To Use

- composer install
- npm install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate:fresh --seed
- composer run dev

```php
User::factory(5)->create()
```

you're all set 

## Built With

- Laravel v12.x
- Inertia.js v2
- React v19
- Tailwind CSS v4
- shadcn/ui


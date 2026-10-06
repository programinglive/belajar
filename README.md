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
# Belajar: Social Learning Platform (In Development)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fprograminglive%2Fbelajar&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## About The Project

**Belajar** is a ProgramingLive project in early development, intended to make programming education more accessible and collaborative.

## Current Implementation

- A public landing page.
- Login and registration pages.

Course catalog, lessons, enrollment, learning progress, a social timeline, and learner portfolios are **planned, not implemented yet**. The landing page describes these as future capabilities.

## Product Direction

The long-term goal is a social learning platform where self-taught developers and students can follow structured courses, practice through projects, track progress, and learn with others. See [`PRD.md`](./PRD.md) for the product requirements and planned scope.

## Key Features

- **Social Timeline**: A Facebook-style feed for course updates and community interaction.
- **Course Player**: A dedicated interface for watching lessons and tracking progress.
- **User Profiles**: Customizable profiles with avatars, bios, and learning history.
- **Modern Stack**: Built with the latest technologies for high performance and developer experience.

## How To Use

```bash
composer install
npm ci
cp .env.example .env
php artisan key:generate
# Configure the database in .env, then:
php artisan migrate --seed
composer run dev
```

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

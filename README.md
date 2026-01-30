# Laravel Inertia Project Management Application

A modern, full-stack project management system built with **Laravel 12**, **Inertia.js**, **React**, and **Tailwind CSS**. Features role-based access control (RBAC), team management, project tracking, and task management with a beautiful, responsive UI.

## 🚀 Features

### Authentication & Authorization
- **Laravel Breeze** integration with Inertia
- **Three user roles**: Admin, Manager, Employee
- Middleware-based access control
- Policy-based authorization for Teams, Projects, and Tasks

### Dashboard (Role-Based)
- **Admin Dashboard**: View total teams, employees, active projects, and all tasks
- **Manager Dashboard**: Manage assigned teams, view team members, active projects, and in-progress tasks
- **Employee Dashboard**: Track assigned tasks, view task status, and manage personal workload

### Team Management
- Create and manage teams
- Assign team managers
- Add/remove employees from teams
- View team members and associated projects
- Edit team details

### Project Management
- Create projects and assign to teams
- Track project status (Active, Completed, Archived)
- View project descriptions and associated tasks
- Filter and search projects by status
- Edit and delete projects (with authorization)

### Task Management
- Create tasks with title, description, priority, and due date
- Assign tasks to employees
- Track task status (To Do, In Progress, Done)
- Set task priority (Low, Medium, High)
- Filter tasks by status and priority
- View detailed task information with assignee and due dates

## 💻 Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS
- **Server-Side Rendering**: Inertia.js
- **Database**: MySQL
- **Package Manager**: Composer & npm
- **Build Tool**: Vite

## 📋 Prerequisites

- PHP 8.2+
- Node.js 20.19+ or 22.12+
- MySQL 8.0+
- Composer
- npm

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd inertia
```

### 2. Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install --legacy-peer-deps
```

### 3. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

Update `.env` with your database configuration:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inertia
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Database Setup
```bash
# Run migrations
php artisan migrate

# (Optional) Seed sample data
php artisan db:seed
```

### 5. Build Assets
```bash
npm run build
```

## 🚀 Running the Application

### Development Mode
```bash
# Terminal 1: Start Laravel development server
php artisan serve

# Terminal 2: Start Vite development server (for hot module reload)
npm run dev
```

Visit `http://localhost:8000` in your browser.

### Production Mode
```bash
# Build assets
npm run build

# Start server
php artisan serve
```

## 📁 Project Structure

```
app/
├── Http/
│   └── Controllers/
│       ├── DashboardController.php      # Dashboard with role-based logic
│       ├── TeamController.php           # Team CRUD operations
│       ├── ProjectController.php        # Project CRUD operations
│       └── TaskController.php           # Task CRUD operations
├── Models/
│   ├── User.php                         # User model with role support
│   ├── Team.php                         # Team model with relationships
│   ├── Project.php                      # Project model
│   ├── Task.php                         # Task model
│   └── TeamMember.php                   # Pivot model for team members
├── Policies/
│   ├── TeamPolicy.php                   # Team authorization rules
│   ├── ProjectPolicy.php                # Project authorization rules
│   └── TaskPolicy.php                   # Task authorization rules
└── Providers/
    └── AuthServiceProvider.php          # Policy registration

resources/
└── js/
    ├── Pages/
    │   ├── Dashboard.tsx                # Role-based dashboard
    │   ├── Teams/
    │   │   ├── Index.tsx                # Teams listing
    │   │   ├── Create.tsx               # Create team
    │   │   ├── Edit.tsx                 # Edit team
    │   │   └── Show.tsx                 # View team details
    │   ├── Projects/
    │   │   ├── Index.tsx                # Projects listing
    │   │   ├── Create.tsx               # Create project
    │   │   ├── Edit.tsx                 # Edit project
    │   │   └── Show.tsx                 # View project details
    │   └── Tasks/
    │       ├── Index.tsx                # Tasks listing
    │       ├── Create.tsx               # Create task
    │       ├── Edit.tsx                 # Edit task
    │       └── Show.tsx                 # View task details
    └── Layouts/
        └── AuthenticatedLayout.tsx      # Main layout with navigation

database/
├── migrations/                           # Database migrations
│   ├── users_table.php
│   ├── teams_table.php
│   ├── projects_table.php
│   ├── tasks_table.php
│   └── team_members_table.php
└── factories/                            # Model factories for testing

routes/
├── web.php                              # Web routes with middleware
└── auth.php                             # Authentication routes
```

## 🔐 User Roles & Permissions

### Admin
- View all teams, projects, and tasks
- Create, edit, and delete teams
- Create, edit, and delete projects
- Create, edit, and delete tasks
- View comprehensive dashboard with system statistics

### Manager
- Manage assigned teams
- Add/remove team members
- Create and manage projects for assigned teams
- Create and assign tasks to team members
- View manager-specific dashboard

### Employee
- View assigned tasks
- Update task status
- View team information
- Access dashboard showing personal workload

## 🗄️ Database Schema

### Users Table
- id, name, email, password, role (admin/manager/employee), timestamps

### Teams Table
- id, name, description, manager_id, timestamps

### Projects Table
- id, name, description, team_id, status (active/completed/archived), timestamps

### Tasks Table
- id, title, description, project_id, assigned_to, priority (low/medium/high), status (todo/in-progress/done), due_date, timestamps

### Team Members Table
- id, team_id, user_id, timestamps

## 🎨 UI Components

All UI components are built with **Tailwind CSS** and styled with:
- Modern card layouts
- Color-coded status badges
- Responsive grid systems
- Hover effects and transitions
- Accessible form inputs

## 🔄 API Flow

The application uses **Inertia.js** for server-driven page rendering. All data is passed from controllers to React pages as props, eliminating the need for separate API calls.

Example flow:
```
User clicks button → Route to Controller → 
Database Query → Return via Inertia::render() → 
React Component with Props
```

## 📝 Form Handling

Forms use Laravel's validation and Inertia's form helpers:
```tsx
const { data, setData, post, errors } = useForm({
    title: '',
    description: '',
    // ...
});
```

## 🧪 Testing

```bash
php artisan test
```

## 🚨 Error Handling

- Authorization errors return 403 Forbidden
- Validation errors display inline on forms
- Server errors logged to `storage/logs/laravel.log`

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 👥 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🎉**

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

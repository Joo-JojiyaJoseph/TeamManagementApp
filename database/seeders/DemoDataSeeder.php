<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Team;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database with demo data.
     */
    public function run(): void
    {
        // Create roles
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager@test.com',
            'password' => bcrypt('password'),
            'role' => 'manager'
        ]);

        $employee = User::create([
            'name' => 'Employee User',
            'email' => 'employee@test.com',
            'password' => bcrypt('password'),
            'role' => 'employee'
        ]);

        // Create team
        $team = Team::create([
            'name' => 'Engineering',
            'manager_id' => $manager->id
        ]);

        // Add employee to team
        $team->members()->attach($employee->id);

        // Create project
        $project = Project::create([
            'name' => 'Website Redesign',
            'team_id' => $team->id
        ]);

        // Create task
        Task::create([
            'title' => 'Design Homepage',
            'project_id' => $project->id,
            'assigned_to' => $employee->id,
            'priority' => 'high',
            'status' => 'todo'
        ]);
    }
}

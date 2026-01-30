<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            // Admin dashboard
            return Inertia::render('Dashboard', [
                'stats' => [
                    'totalTeams' => Team::count(),
                    'totalEmployees' => User::where('role', 'employee')->count(),
                    'activeProjects' => Project::where('status', 'active')->count(),
                    'totalTasks' => Task::count(),
                ],
                'recentProjects' => Project::with('team')
                    ->latest()
                    ->limit(5)
                    ->get(),
                'recentTasks' => Task::with(['project', 'assignee'])
                    ->latest()
                    ->limit(5)
                    ->get(),
            ]);
        } elseif ($user->isManager()) {
            // Manager dashboard
            $teams = $user->managedTeams()->with('members')->get();
            $teamIds = $teams->pluck('id');

            return Inertia::render('Dashboard', [
                'stats' => [
                    'managedTeams' => $teams->count(),
                    'teamMembers' => User::whereIn('id',
                        $teams->flatMap(fn($t) => $t->members->pluck('id'))
                    )->count(),
                    'activeProjects' => Project::whereIn('team_id', $teamIds)
                        ->where('status', 'active')
                        ->count(),
                    'tasksInProgress' => Task::whereIn('project_id',
                        Project::whereIn('team_id', $teamIds)->pluck('id')
                    )->where('status', 'in-progress')->count(),
                ],
                'teams' => $teams,
                'recentProjects' => Project::whereIn('team_id', $teamIds)
                    ->with('team')
                    ->latest()
                    ->limit(5)
                    ->get(),
                'recentTasks' => Task::whereIn('project_id',
                    Project::whereIn('team_id', $teamIds)->pluck('id')
                )
                    ->with(['project', 'assignee'])
                    ->latest()
                    ->limit(5)
                    ->get(),
            ]);
        } else {
            // Employee dashboard
            return Inertia::render('Dashboard', [
                'stats' => [
                    'assignedTasks' => Task::where('assigned_to', $user->id)->count(),
                    'tasksInProgress' => Task::where('assigned_to', $user->id)
                        ->where('status', 'in-progress')
                        ->count(),
                    'completedTasks' => Task::where('assigned_to', $user->id)
                        ->where('status', 'done')
                        ->count(),
                    'pendingTasks' => Task::where('assigned_to', $user->id)
                        ->where('status', 'todo')
                        ->count(),
                ],
                'myTasks' => Task::where('assigned_to', $user->id)
                    ->with(['project.team', 'assignee'])
                    ->orderByRaw("CASE WHEN status = 'todo' THEN 0 WHEN status = 'in-progress' THEN 1 ELSE 2 END")
                    ->latest()
                    ->get(),
                'myTeams' => $user->teams()->with('manager')->get(),
            ]);
        }
    }
}

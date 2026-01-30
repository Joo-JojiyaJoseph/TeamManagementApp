import { useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

interface StatCard {
    label: string;
    value: string | number;
    color: string;
}

interface RecentProject {
    id: number;
    name: string;
    status: string;
    team: {
        name: string;
    };
}

interface RecentTask {
    id: number;
    title: string;
    status: string;
    priority: string;
    project: {
        name: string;
        team: { name: string };
    };
    assignee: { name: string } | null;
}

interface UserTeam {
    id: number;
    name: string;
    manager: { name: string };
}

interface MyTask extends RecentTask {
    due_date: string | null;
}

export default function Dashboard() {
    const { auth } = usePage<any>().props;
    const { stats, recentProjects, recentTasks, teams, myTasks, myTeams } = usePage<any>().props;

    const statCards: StatCard[] = useMemo(() => {
        const user = auth.user;
        if (user.role === 'admin') {
            return [
                { label: 'Total Teams', value: stats.totalTeams || 0, color: 'bg-blue-500' },
                { label: 'Total Employees', value: stats.totalEmployees || 0, color: 'bg-green-500' },
                { label: 'Active Projects', value: stats.activeProjects || 0, color: 'bg-purple-500' },
                { label: 'Total Tasks', value: stats.totalTasks || 0, color: 'bg-orange-500' },
            ];
        } else if (user.role === 'manager') {
            return [
                { label: 'Managed Teams', value: stats.managedTeams || 0, color: 'bg-blue-500' },
                { label: 'Team Members', value: stats.teamMembers || 0, color: 'bg-green-500' },
                { label: 'Active Projects', value: stats.activeProjects || 0, color: 'bg-purple-500' },
                { label: 'In Progress', value: stats.tasksInProgress || 0, color: 'bg-orange-500' },
            ];
        } else {
            return [
                { label: 'Assigned Tasks', value: stats.assignedTasks || 0, color: 'bg-blue-500' },
                { label: 'In Progress', value: stats.tasksInProgress || 0, color: 'bg-yellow-500' },
                { label: 'Completed', value: stats.completedTasks || 0, color: 'bg-green-500' },
                { label: 'Pending', value: stats.pendingTasks || 0, color: 'bg-red-500' },
            ];
        }
    }, [auth.user, stats]);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'done': return 'bg-green-100 text-green-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat) => (
                            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} w-12 h-12 rounded-lg opacity-20`}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Tasks/Projects */}
                        <div className="lg:col-span-2">
                            {auth.user.role === 'employee' && myTasks ? (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900">My Tasks</h3>
                                        <Link href={route('tasks.index')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View All
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        {myTasks && myTasks.length > 0 ? (
                                            myTasks.map((task: MyTask) => (
                                                <Link
                                                    key={task.id}
                                                    href={route('tasks.show', task.id)}
                                                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                                                            <p className="text-sm text-gray-500 mt-1">{task.project.name}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                                                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                            </span>
                                                            <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                                                                {task.status.replace('-', ' ').charAt(0).toUpperCase() + task.status.replace('-', ' ').slice(1)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-8">No tasks assigned yet</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
                                        <Link href={route('projects.index')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View All
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        {recentProjects && recentProjects.length > 0 ? (
                                            recentProjects.map((project: RecentProject) => (
                                                <Link
                                                    key={project.id}
                                                    href={route('projects.show', project.id)}
                                                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900">{project.name}</h4>
                                                            <p className="text-sm text-gray-500 mt-1">{project.team.name}</p>
                                                        </div>
                                                        <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                                                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-8">No projects yet</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Teams */}
                            {(myTeams || teams) && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        {auth.user.role === 'employee' ? 'My Teams' : 'Teams'}
                                    </h3>
                                    <div className="space-y-3">
                                        {(myTeams || teams)?.slice(0, 5).map((team: UserTeam) => (
                                            <Link
                                                key={team.id}
                                                href={route('teams.show', team.id)}
                                                className="block p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition"
                                            >
                                                <h4 className="font-medium text-gray-900 text-sm">{team.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1">Manager: {team.manager.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                    {(myTeams || teams)?.length > 5 && (
                                        <Link href={route('teams.index')} className="block mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View All Teams
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Recent Activities */}
                            {recentTasks && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {recentTasks.slice(0, 5).map((task: RecentTask) => (
                                            <Link
                                                key={task.id}
                                                href={route('tasks.show', task.id)}
                                                className="block p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition"
                                            >
                                                <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">{task.project.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

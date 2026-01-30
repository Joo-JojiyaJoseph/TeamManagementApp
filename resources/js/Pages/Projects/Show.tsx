import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

interface User {
    id: number;
    name: string;
}

interface Task {
    id: number;
    title: string;
    status: string;
    priority: string;
    assignee: User | null;
}

interface Team {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    description: string | null;
    status: string;
    team: Team;
    tasks: Task[];
}

export default function ShowProject() {
    const { project } = usePage<any>().props;
    const projectData: Project = project;

    const handleDelete = () => {
        if (confirm('Are you sure?')) {
            router.delete(route('projects.destroy', projectData.id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'done': return 'bg-green-100 text-green-800';
            case 'active': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{projectData.name}</h2>
                    <div className="flex gap-2">
                        <Link href={route('projects.edit', projectData.id)} as="button">
                            <PrimaryButton>Edit</PrimaryButton>
                        </Link>
                        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                    </div>
                </div>
            }
        >
            <Head title={projectData.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Team</p>
                                <Link href={route('teams.show', projectData.team.id)} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                                    {projectData.team.name}
                                </Link>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`inline-block mt-1 text-sm font-medium px-3 py-1 rounded ${getStatusColor(projectData.status)}`}>
                                    {projectData.status.charAt(0).toUpperCase() + projectData.status.slice(1)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tasks</p>
                                <p className="text-lg font-semibold text-gray-900">{projectData.tasks.length}</p>
                            </div>
                        </div>
                        {projectData.description && (
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Description</p>
                                <p className="text-gray-900">{projectData.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
                            <Link href={route('tasks.create')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Create Task</Link>
                        </div>
                        <div className="space-y-4">
                            {projectData.tasks.length > 0 ? (
                                projectData.tasks.map((task: Task) => (
                                    <Link key={task.id} href={route('tasks.show', task.id)} className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{task.title}</h4>
                                                {task.assignee && <p className="text-sm text-gray-500 mt-1">Assigned to: {task.assignee.name}</p>}
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
                                <p className="text-gray-500 text-center py-8">No tasks yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

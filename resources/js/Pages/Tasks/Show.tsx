import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

interface User {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    team: { name: string };
}

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    due_date: string | null;
    project: Project;
    assignee: User | null;
}

export default function ShowTask() {
    const { task } = usePage<any>().props;
    const taskData: Task = task;

    const handleDelete = () => {
        if (confirm('Are you sure?')) {
            router.delete(route('tasks.destroy', taskData.id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'done': return 'bg-green-100 text-green-800';
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
                    <h2 className="text-xl font-semibold text-gray-800">{taskData.title}</h2>
                    <div className="flex gap-2">
                        <Link href={route('tasks.edit', taskData.id)} as="button">
                            <PrimaryButton>Edit</PrimaryButton>
                        </Link>
                        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                    </div>
                </div>
            }
        >
            <Head title={taskData.title} />
            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`inline-block mt-1 text-sm font-medium px-3 py-1 rounded ${getStatusColor(taskData.status)}`}>
                                    {taskData.status.replace('-', ' ').charAt(0).toUpperCase() + taskData.status.replace('-', ' ').slice(1)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Priority</p>
                                <span className={`inline-block mt-1 text-sm font-medium px-3 py-1 rounded ${getPriorityColor(taskData.priority)}`}>
                                    {taskData.priority.charAt(0).toUpperCase() + taskData.priority.slice(1)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Project</p>
                                <Link href={route('projects.show', taskData.project.id)} className="text-blue-600 hover:text-blue-800 font-semibold">
                                    {taskData.project.name}
                                </Link>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Team</p>
                                <p className="font-semibold text-gray-900">{taskData.project.team.name}</p>
                            </div>
                        </div>

                        {taskData.assignee && (
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Assigned To</p>
                                <p className="text-lg font-semibold text-gray-900">{taskData.assignee.name}</p>
                            </div>
                        )}

                        {taskData.due_date && (
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Due Date</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(taskData.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        )}

                        {taskData.description && (
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Description</p>
                                <p className="text-gray-900">{taskData.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

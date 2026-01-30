import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

interface Task {
    id: number;
    title: string;
    status: string;
    priority: string;
    project: { name: string; team: { name: string } };
    assignee: { name: string } | null;
}

export default function TasksIndex() {
    const { tasks } = usePage<any>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const handleDelete = (taskId: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('tasks.destroy', taskId));
        }
    };

    const filteredTasks = tasks?.data?.filter((t: Task) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!statusFilter || t.status === statusFilter) &&
        (!priorityFilter || t.priority === priorityFilter)
    ) || [];

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
                    <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
                    <Link href={route('tasks.create')} as="button">
                        <PrimaryButton>Create Task</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task: Task) => (
                                    <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <Link href={route('tasks.show', task.id)}>
                                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{task.title}</h3>
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {task.project.name} ({task.project.team.name})
                                                </p>
                                                {task.assignee && (
                                                    <p className="text-sm text-gray-600 mt-1">Assigned to: {task.assignee.name}</p>
                                                )}
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
                                        <div className="flex gap-2 mt-4">
                                            <Link href={route('tasks.edit', task.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</Link>
                                            <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No tasks found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

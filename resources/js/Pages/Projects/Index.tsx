import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

interface Project {
    id: number;
    name: string;
    description: string | null;
    status: string;
    team: { name: string };
    tasks: Array<{ id: number }>;
}

export default function ProjectsIndex() {
    const { projects } = usePage<any>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleDelete = (projectId: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('projects.destroy', projectId));
        }
    };

    const filteredProjects = projects?.data?.filter((p: Project) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!statusFilter || p.status === statusFilter)
    ) || [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Projects</h2>
                    <Link href={route('projects.create')} as="button">
                        <PrimaryButton>Create Project</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search projects..."
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
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project: Project) => (
                                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <Link href={route('projects.show', project.id)}>
                                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{project.name}</h3>
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">Team: {project.team.name}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className={`text-xs font-medium px-3 py-1 rounded ${getStatusColor(project.status)}`}>
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        {project.description && (
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{project.tasks.length} tasks</span>
                                            <div className="flex gap-2">
                                                <Link href={route('projects.edit', project.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</Link>
                                                <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No projects found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

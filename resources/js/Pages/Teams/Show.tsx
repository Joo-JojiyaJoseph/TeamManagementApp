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
    status: string;
    tasks: Array<{ id: number }>;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    manager: User;
    members: User[];
    projects: Project[];
}

export default function ShowTeam() {
    const { team } = usePage<any>().props;
    const teamData: Team = team;

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this team?')) {
            router.delete(route('teams.destroy', teamData.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {teamData.name}
                    </h2>
                    <div className="flex gap-2">
                        <Link href={route('teams.edit', teamData.id)} as="button">
                            <PrimaryButton>Edit</PrimaryButton>
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={teamData.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Team Info */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Information</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="text-lg font-semibold text-gray-900">{teamData.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Manager</p>
                                <p className="text-lg font-semibold text-gray-900">{teamData.manager.name}</p>
                            </div>
                        </div>
                        {teamData.description && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Description</p>
                                <p className="text-gray-900">{teamData.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Members */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Members ({teamData.members.length})
                            </h3>
                            <div className="space-y-2">
                                {teamData.members.length > 0 ? (
                                    teamData.members.map((member: User) => (
                                        <div key={member.id} className="p-3 border border-gray-200 rounded-lg">
                                            <p className="font-medium text-gray-900">{member.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No members yet</p>
                                )}
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Projects ({teamData.projects.length})
                                </h3>
                                <Link href={route('projects.create')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    Create
                                </Link>
                            </div>
                            <div className="space-y-2">
                                {teamData.projects.length > 0 ? (
                                    teamData.projects.map((project: Project) => (
                                        <Link
                                            key={project.id}
                                            href={route('projects.show', project.id)}
                                            className="block p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-gray-900">{project.name}</p>
                                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                                                    {project.tasks.length} tasks
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No projects yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

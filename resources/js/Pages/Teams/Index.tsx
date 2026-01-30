import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

interface Team {
    id: number;
    name: string;
    description: string | null;
    manager: { name: string };
    members: Array<{ name: string }>;
    projects: Array<{ name: string }>;
}

interface Paginated<T> {
    data: T[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export default function TeamsIndex() {
    const { teams } = usePage<any>().props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (teamId: number) => {
        if (confirm('Are you sure you want to delete this team?')) {
            router.delete(route('teams.destroy', teamId));
        }
    };

    const filteredTeams = teams?.data?.filter((team: Team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Teams
                    </h2>
                    <Link href={route('teams.create')} as="button">
                        <PrimaryButton>Create Team</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Teams" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Search */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search teams..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Teams Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map((team: Team) => (
                                    <div key={team.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <Link href={route('teams.show', team.id)}>
                                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{team.name}</h3>
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">Manager: {team.manager.name}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={route('teams.edit', team.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(team.id)}
                                                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {team.description && (
                                            <p className="text-gray-600 text-sm mb-4">{team.description}</p>
                                        )}

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>Members: {team.members.length}</p>
                                            <p>Projects: {team.projects.length}</p>
                                        </div>

                                        <Link href={route('teams.show', team.id)} className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium">
                                            View Details
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500">No teams found</p>
                                    <Link href={route('teams.create')} className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block">
                                        Create your first team
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {teams?.links && teams.links.length > 0 && (
                            <div className="mt-6 flex gap-2 justify-center">
                                {teams.links.map((link: any, idx: number) => (
                                    link.url ? (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-lg border ${
                                                link.active
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                        </Link>
                                    ) : (
                                        <span key={idx} className="px-4 py-2 text-gray-400">{link.label.replace('&laquo;', '«').replace('&raquo;', '»')}</span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

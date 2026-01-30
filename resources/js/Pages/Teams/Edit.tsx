import { FormEvent, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

interface User {
    id: number;
    name: string;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    manager_id: number;
    members: User[];
}

export default function EditTeam() {
    const { team, managers, employees } = usePage<any>().props;
    const teamData: Team = team;

    const [formData, setFormData] = useState({
        name: teamData.name,
        description: teamData.description || '',
        manager_id: teamData.manager_id,
    });
    const [memberIds, setMemberIds] = useState<number[]>(teamData.members.map(m => m.id));
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleMemberToggle = (memberId: number) => {
        setMemberIds(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.put(route('teams.update', teamData.id), {
            ...formData,
            members: memberIds,
        }, {
            onError: (errors) => setErrors(errors as Record<string, string>),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Team
                </h2>
            }
        >
            <Head title="Edit Team" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Team Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Manager */}
                            <div>
                                <InputLabel htmlFor="manager_id" value="Manager" />
                                <select
                                    id="manager_id"
                                    name="manager_id"
                                    value={formData.manager_id}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {managers?.map((manager: User) => (
                                        <option key={manager.id} value={manager.id}>
                                            {manager.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.manager_id} className="mt-2" />
                            </div>

                            {/* Members */}
                            <div>
                                <InputLabel value="Team Members" />
                                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4">
                                    {employees?.map((employee: User) => (
                                        <label key={employee.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                checked={memberIds.includes(employee.id)}
                                                onChange={() => handleMemberToggle(employee.id)}
                                                className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-900">{employee.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <PrimaryButton type="submit">Update Team</PrimaryButton>
                                <Link
                                    href={route('teams.show', teamData.id)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

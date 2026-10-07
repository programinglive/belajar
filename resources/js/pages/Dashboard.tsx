import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    stats = { tracks_started: 0, lessons_completed: 0, capstones_completed: 0 },
    active_tracks = [],
    available_tracks = [],
}: {
    stats: any;
    active_tracks: any[];
    available_tracks: any[];
}) {
    return (
        <Layout>
            <Head title="Learner Dashboard" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
        </Layout>
    );
}

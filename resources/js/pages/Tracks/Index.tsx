import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';

export default function Index({ tracks = [] }: { tracks: any[] }) {
    return (
        <Layout>
            <Head title="Katalog Kursus & Jalur Belajar" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900">Katalog Kursus</h1>
            </div>
        </Layout>
    );
}

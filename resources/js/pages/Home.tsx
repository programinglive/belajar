import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <Layout>
            <Head title="Welcome" />
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to Laravel 12.x + Inertia + React
                    </h1>
                    <p className="text-gray-600">
                        Migration successful! This is a React component.
                    </p>
                </div>
            </div>
        </Layout>
    );
}

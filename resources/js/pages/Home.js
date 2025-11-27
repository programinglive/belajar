import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
export default function Home() {
    return (_jsxs(Layout, { children: [_jsx(Head, { title: "Welcome" }), _jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "p-8 bg-white rounded-lg shadow-md", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Welcome to Laravel 12.x + Inertia + React" }), _jsx("p", { className: "text-gray-600", children: "Migration successful! This is a React component." })] }) })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (_jsxs(Layout, { children: [_jsx(Head, { title: "Register" }), _jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-50", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-center", children: "Create an account" }), _jsx(CardDescription, { className: "text-center", children: "Enter your details below to create your account" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: submit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", placeholder: "John Doe", value: data.name, onChange: (e) => setData('name', e.target.value), required: true }), errors.name && _jsx("p", { className: "text-sm text-red-500", children: errors.name })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "m@example.com", value: data.email, onChange: (e) => setData('email', e.target.value), required: true }), errors.email && _jsx("p", { className: "text-sm text-red-500", children: errors.email })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: data.password, onChange: (e) => setData('password', e.target.value), required: true }), errors.password && _jsx("p", { className: "text-sm text-red-500", children: errors.password })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password_confirmation", children: "Confirm Password" }), _jsx(Input, { id: "password_confirmation", type: "password", value: data.password_confirmation, onChange: (e) => setData('password_confirmation', e.target.value), required: true }), errors.password_confirmation && _jsx("p", { className: "text-sm text-red-500", children: errors.password_confirmation })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: processing, children: processing ? 'Creating account...' : 'Create account' })] }) }), _jsx(CardFooter, { children: _jsxs("p", { className: "w-full text-center text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { href: "/login", className: "font-medium text-blue-600 hover:underline", children: "Sign in" })] }) })] }) })] }));
}

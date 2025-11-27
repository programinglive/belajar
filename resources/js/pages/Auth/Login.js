import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };
    return (_jsxs(Layout, { children: [_jsx(Head, { title: "Log in" }), _jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-50", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-center", children: "Welcome back" }), _jsx(CardDescription, { className: "text-center", children: "Enter your email to sign in to your account" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: submit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "m@example.com", value: data.email, onChange: (e) => setData('email', e.target.value), required: true }), errors.email && _jsx("p", { className: "text-sm text-red-500", children: errors.email })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), canResetPassword && (_jsx(Link, { href: "/forgot-password", className: "text-sm font-medium text-blue-600 hover:underline", children: "Forgot password?" }))] }), _jsx(Input, { id: "password", type: "password", value: data.password, onChange: (e) => setData('password', e.target.value), required: true }), errors.password && _jsx("p", { className: "text-sm text-red-500", children: errors.password })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: processing, children: processing ? 'Signing in...' : 'Sign in' })] }) }), _jsxs(CardFooter, { className: "flex flex-col space-y-4", children: [_jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("span", { className: "w-full border-t" }) }), _jsx("div", { className: "relative flex justify-center text-xs uppercase", children: _jsx("span", { className: "bg-white px-2 text-gray-500", children: "Or continue with" }) })] }), _jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: _jsxs("a", { href: "/auth/google", children: [_jsx("svg", { className: "mr-2 h-4 w-4", "aria-hidden": "true", focusable: "false", "data-prefix": "fab", "data-icon": "google", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 488 512", children: _jsx("path", { fill: "currentColor", d: "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" }) }), "Google"] }) }), _jsxs("p", { className: "text-center text-sm text-gray-600", children: ["Don't have an account?", ' ', _jsx(Link, { href: "/register", className: "font-medium text-blue-600 hover:underline", children: "Sign up" })] })] })] }) })] }));
}

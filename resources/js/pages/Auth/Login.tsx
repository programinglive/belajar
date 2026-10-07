import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Masuk — ProgramingLive Belajar" />
            <div className="flex items-center justify-center py-16 px-4 sm:px-6">
                <Card className="w-full max-w-md border border-[#E2E8F0] bg-white shadow-xs">
                    <CardHeader className="space-y-2 text-center pb-6">
                        <div className="w-10 h-10 rounded-[8px] bg-[#1E3A8A] text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow-xs">
                            PL
                        </div>
                        <CardTitle className="text-2xl font-bold text-[#0F172A]">
                            Selamat Datang Kembali
                        </CardTitle>
                        <CardDescription className="text-sm text-[#64748B]">
                            Masuk untuk melanjutkan riwayat dan progres belajar Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {status && (
                            <div className="p-3 rounded-[8px] bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1E3A8A]">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold text-[#334E68]">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-xs text-[#DC2626] font-medium">{errors.email}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold text-[#334E68]">
                                        Kata Sandi
                                    </Label>
                                    {canResetPassword && (
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-semibold text-[#2563EB] hover:underline"
                                        >
                                            Lupa kata sandi?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="text-xs text-[#DC2626] font-medium">{errors.password}</p>}
                            </div>
                            <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]" disabled={processing}>
                                {processing ? 'Memproses Masuk...' : 'Masuk ke Akun'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-[#F1F5F9]">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-[#E2E8F0]" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2.5 text-[#94A3B8] font-medium">Atau lanjutkan dengan</span>
                            </div>
                        </div>
                        <Button variant="secondary" className="w-full" asChild>
                            <a href="/auth/google">
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Google Account
                            </a>
                        </Button>
                        <p className="text-center text-xs text-[#64748B]">
                            Belum memiliki akun?{' '}
                            <Link href="/register" className="font-semibold text-[#2563EB] hover:underline">
                                Daftar Sekarang
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}

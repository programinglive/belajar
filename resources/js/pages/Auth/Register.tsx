import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Layout>
            <Head title="Daftar Akun — ProgramingLive Belajar" />
            <div className="flex items-center justify-center py-16 px-4 sm:px-6">
                <Card className="w-full max-w-md border border-[#E2E8F0] bg-white shadow-xs">
                    <CardHeader className="space-y-2 text-center pb-6">
                        <div className="w-10 h-10 rounded-[8px] bg-[#1E3A8A] text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow-xs">
                            PL
                        </div>
                        <CardTitle className="text-2xl font-bold text-[#0F172A]">
                            Buat Akun Belajar
                        </CardTitle>
                        <CardDescription className="text-sm text-[#64748B]">
                            Bergabunglah untuk mencatat kemajuan dan membangun portofolio pemrograman Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-xs font-semibold text-[#334E68]">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Mahatma Mahardhika"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-xs text-[#DC2626] font-medium">{errors.name}</p>}
                            </div>
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
                                <Label htmlFor="password" className="text-xs font-semibold text-[#334E68]">
                                    Kata Sandi
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="text-xs text-[#DC2626] font-medium">{errors.password}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs font-semibold text-[#334E68]">
                                    Konfirmasi Kata Sandi
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-xs text-[#DC2626] font-medium">{errors.password_confirmation}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]" disabled={processing}>
                                {processing ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-[#F1F5F9]">
                        <p className="w-full text-center text-xs text-[#64748B]">
                            Sudah memiliki akun?{' '}
                            <Link href="/login" className="font-semibold text-[#2563EB] hover:underline">
                                Masuk ke akun Anda
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}

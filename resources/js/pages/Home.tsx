import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Belajar - Social Learning Platform" />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <img src="/images/logo.png" alt="Belajar Logo" className="h-8 w-auto" />
                                <span className="text-2xl font-bold text-gray-900">Belajar</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost" className="bg-white hover:bg-gray-100">Sign In</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-8">
                            <span className="mr-2">✨</span>
                            100% Free & Open Source
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Learn Together,
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Grow Together
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            The first social learning platform that combines structured courses with the engagement of social media.
                            Make learning interactive, fun, and never lonely.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                                    Start Learning Free
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="ghost" className="text-lg px-8 bg-gray-900 text-white hover:bg-gray-800">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Belajar?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're reimagining online education by making it social, engaging, and accessible to everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Social Timeline</h3>
                            <p className="text-gray-600">
                                See what your friends are learning, share progress, and celebrate achievements together on a Facebook-style feed.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Free Courses</h3>
                            <p className="text-gray-600">
                                Access structured learning paths with video lessons, quizzes, and projects. All completely free, forever.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Build Your Portfolio</h3>
                            <p className="text-gray-600">
                                Showcase completed courses, earn badges, and build a learning portfolio that demonstrates your skills.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-gray-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                How It Works
                            </h2>
                            <p className="text-lg text-gray-600">
                                Get started in 3 simple steps
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                                <p className="text-gray-600">
                                    Sign up for free and set up your learning profile in seconds.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Choose Your Path</h3>
                                <p className="text-gray-600">
                                    Browse courses, follow friends, and start your learning journey.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Learn & Share</h3>
                                <p className="text-gray-600">
                                    Complete lessons, share progress, and grow with the community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of learners who are growing together on Belajar.
                        </p>
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="text-lg px-8">
                                Get Started for Free
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <img src="/images/logo.png" alt="Belajar Logo" className="h-6 w-auto" />
                                    <span className="text-xl font-bold">Belajar</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Social learning platform for the modern learner.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Product</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-blue-600">Features</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Courses</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Company</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-blue-600">About</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Legal</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Terms</a></li>
                                    <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 text-center text-sm text-gray-600">
                            <p>&copy; 2025 Belajar. Built with ❤️ by Programinglive Community.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

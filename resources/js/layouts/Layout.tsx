import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    );
}

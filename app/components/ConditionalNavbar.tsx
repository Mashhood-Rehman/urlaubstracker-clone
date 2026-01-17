'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../(header)/Navbar';

export default function ConditionalNavbar() {
    const pathname = usePathname();

    // Hide navbar for admin and auth routes
    const shouldHideNavbar = pathname?.startsWith('/admin') || pathname?.startsWith('/auth');

    if (shouldHideNavbar) {
        return null;
    }

    return <Navbar />;
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Crumb {
    label: string;
    href?: string;
    type?: 'Category' | 'Cuisine' | 'Tag';
}

interface BreadcrumbsProps {
    crumbs?: Crumb[];
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
    const pathname = usePathname() ?? '';

    const defaultCrumbs: Crumb[] =
        crumbs ||
        pathname
            .split('/')
            .filter((seg) => seg && !['explore', 'recipes'].includes(seg.toLowerCase()))
            .map((seg, idx, arr) => ({
                label: decodeURIComponent(seg.replace(/-/g, ' '))
                    .replace(/\b\w/g, (char) => char.toUpperCase()),
                href: '/' + arr.slice(0, idx + 1).join('/'),
            }));

    const fullCrumbs = crumbs ?? [{ label: 'Home', href: '/' }, ...defaultCrumbs];

    return (
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex space-x-1">
                {fullCrumbs.map((crumb, idx) => {
                    const displayLabel = crumb.type
                        ? `${crumb.type}: ${crumb.label}`
                        : crumb.label;

                    return (
                        <li key={crumb.href || idx} className="flex items-center space-x-1">
                            {idx > 0 && <span>{'>'}</span>}
                            {crumb.href && idx !== fullCrumbs.length - 1 ? (
                                <Link href={crumb.href} className="hover:underline text-gray-500">
                                    {displayLabel}
                                </Link>
                            ) : (
                                <span className="text-gray-700">{displayLabel}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

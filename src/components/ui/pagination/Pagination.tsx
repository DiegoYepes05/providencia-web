'use client';

import { generatePaginationNumbers } from '@/utils';
import Link from 'next/link';
import clsx from 'clsx';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN( +pageString ) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString) ) {
    redirect( pathname );
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = ( pageNumber: number | string ) => {
    const params = new URLSearchParams( searchParams );

    if ( pageNumber === '...' ) {
      return `${ pathname }?${ params.toString() }`
    }

    if ( +pageNumber <= 0 ) {
      return `${ pathname }`;
    }

    if ( +pageNumber > totalPages ) {
      return `${pathname}?${ params.toString() }`;
    }

    params.set('page', pageNumber.toString());
    return `${  pathname }?${ params.toString() }`;
  }

  return (
    <div className="mt-10 mb-16 flex justify-center text-center">
      <nav aria-label="Paginación">
        <ul className="flex">
          <li>
            <Link
              className="relative block rounded-full px-3 py-1.5 text-white/70 outline-none transition-colors hover:text-white"
              href={ createPageUrl( currentPage - 1 ) }
            >
              <IoChevronBackOutline size={24} />
            </Link>
          </li>

          {allPages.map( (page) => (
              <li key={ page }>
                <Link
                  className={
                    clsx(
                      "relative block rounded-full px-3.5 py-1.5 text-sm font-medium text-white/70 outline-none transition-colors hover:text-white",
                      {
                        "bg-brand-400 text-void hover:text-void":
                          page === currentPage,
                      }
                    )
                  }
                  href={ createPageUrl( page ) }
                >
                  { page }
                </Link>
              </li>
            ))}

          <li>
            <Link
              className="relative block rounded-full px-3 py-1.5 text-white/70 outline-none transition-colors hover:text-white"
              href={ createPageUrl( currentPage + 1 ) }
            >
              <IoChevronForwardOutline size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

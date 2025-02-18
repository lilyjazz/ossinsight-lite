import { getLibraryItem } from '@/app/(client)/api/layout/operations';
import { Unauthorized } from '@/components/Errors';
import WidgetPreviewWithDetails from '@/components/pages/widget/WidgetPreviewWithDetails';
import { isReadonly } from '@/utils/server/auth';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const findItem = cache(getLibraryItem);

export default async function ({ params }: any) {
  const id = decodeURIComponent(params.id);

  const item = await findItem(id);

  if (!item) {
    notFound();
  }

  console.log('readonly', isReadonly());

  if (isReadonly() && item.visibility !== 'public') {
    return (
      <Unauthorized />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-2 bg-white rounded">
        <WidgetPreviewWithDetails item={item} />
      </div>
    </div>
  );
}

export async function generateMetadata ({ params }: any): Promise<Metadata> {
  const id = decodeURIComponent(params.id);

  const item = await findItem(id);

  if (!item) {
    return {};
  }

  const title = item.props?.title ?? 'Untitled widget';
  const image = `/widgets/${params.id}/thumbnail.png`;

  return {
    title,
    openGraph: {
      title,
      images: image,
    },
    twitter: {
      title,
      card: 'summary_large_image',
      images: image,
    },
  };
}

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readProductTable } from '@/lib/excel';
import { getProductBySlug } from '@/lib/products';

export const dynamic = 'force-static';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  const product = getProductBySlug(decoded);
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  const table = readProductTable(decoded);
  if (!table) {
    return NextResponse.json(
      { slug: decoded, name: product.name, table: null },
      { status: 200 },
    );
  }

  return NextResponse.json({ slug: decoded, name: product.name, table });
}

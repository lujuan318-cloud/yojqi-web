import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import { PRODUCTS, getProductBySlug } from '@/lib/products-data';
import { ProductDetailView } from '@/components/ProductDetailView';

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const prod of PRODUCTS) {
      params.push({ lang, slug: prod.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found | YOJQI' };
  }

  const title = lang === 'zh' ? `${product.nameZh} | YOJQI 官方选品` : `${product.nameEn} | YOJQI Shop`;
  const description = lang === 'zh' ? product.summaryZh : product.summaryEn;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.heroImage }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductDetailView product={product} lang={lang as Language} />
    </div>
  );
}

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

  const isZh = lang === 'zh';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isZh ? product.nameZh : product.nameEn,
    image: `https://www.yojqi.com${product.heroImage}`,
    description: isZh ? product.summaryZh : product.summaryEn,
    brand: {
      '@type': 'Brand',
      name: 'YOJQI',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://www.yojqi.com/${lang}/product/${product.slug}`,
    },
    category: product.category,
    material: isZh ? product.materialsZh : product.materialsEn,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} lang={lang as Language} />
    </div>
  );
}

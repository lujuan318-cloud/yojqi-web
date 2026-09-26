import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '../lib/products-data';

test('Products Catalog Integrity', async (t) => {
  await t.test('All products must have unique id and slug', () => {
    const ids = new Set<string>();
    const slugs = new Set<string>();

    for (const prod of PRODUCTS) {
      assert.ok(!ids.has(prod.id), `Duplicate product ID found: ${prod.id}`);
      assert.ok(!slugs.has(prod.slug), `Duplicate product slug found: ${prod.slug}`);
      ids.add(prod.id);
      slugs.add(prod.slug);
    }
  });

  await t.test('All products must have required bilingual fields and positive prices', () => {
    for (const prod of PRODUCTS) {
      assert.ok(prod.nameEn.length > 0, `Missing nameEn for ${prod.slug}`);
      assert.ok(prod.nameZh.length > 0, `Missing nameZh for ${prod.slug}`);
      assert.ok(prod.summaryEn.length > 0, `Missing summaryEn for ${prod.slug}`);
      assert.ok(prod.summaryZh.length > 0, `Missing summaryZh for ${prod.slug}`);
      assert.ok(prod.price > 0, `Price must be positive for ${prod.slug}`);
      assert.ok(prod.originalPrice >= prod.price, `Original price must be >= price for ${prod.slug}`);
      assert.ok(prod.heroImage.startsWith('/images/'), `Hero image must start with /images/ for ${prod.slug}`);
      assert.ok(prod.gallery.length > 0, `Gallery must not be empty for ${prod.slug}`);
      assert.ok(prod.somaticBenefitsEn.length > 0, `Somatic benefits EN missing for ${prod.slug}`);
      assert.ok(prod.somaticBenefitsZh.length > 0, `Somatic benefits ZH missing for ${prod.slug}`);
    }
  });

  await t.test('getProductBySlug lookup works correctly', () => {
    const ambergris = getProductBySlug('wrist-anchor-ambergris-ease-bracelet');
    assert.ok(ambergris !== undefined);
    assert.equal(ambergris?.category, 'balance');

    const nonExistent = getProductBySlug('non-existent-product-slug');
    assert.equal(nonExistent, undefined);
  });

  await t.test('getProductsByCategory filter works accurately', () => {
    const all = getProductsByCategory('all');
    assert.equal(all.length, PRODUCTS.length);

    const sleep = getProductsByCategory('sleep');
    assert.ok(sleep.length > 0);
    assert.ok(sleep.every(p => p.category === 'sleep'));

    const protection = getProductsByCategory('protection');
    assert.equal(protection.length, 10, 'Must have exactly 10 authentic Taoist talismans');
    assert.ok(protection.every(p => p.category === 'protection'));
  });
});

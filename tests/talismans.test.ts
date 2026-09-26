import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../lib/products-data';

test('Taoist Talismans Collection Audit', async (t) => {
  const talismans = PRODUCTS.filter(p => p.category === 'protection');

  await t.test('All 10 authentic Taoist talismans are present', () => {
    assert.equal(talismans.length, 10, 'Expected 10 consecrated Daoist talismans');
  });

  await t.test('Every talisman has authentic local vermilion image asset', () => {
    for (const talisman of talismans) {
      assert.ok(
        talisman.heroImage.startsWith('/images/talismans/'),
        `Talisman ${talisman.slug} image path must be in /images/talismans/`
      );
      assert.equal(talisman.type, 'talisman');
      assert.equal(talisman.system, 'talisman');
    }
  });

  await t.test('Key canonical talismans exist with expected slugs', () => {
    const requiredSlugs = [
      'the-tai-sui-protection-talisman-grand-duke-jupiter',
      'the-marshal-zhao-military-wealth-talisman',
      'the-severing-petty-people-anti-gossip-talisman',
      'the-celestial-health-guard-talisman',
      'the-north-dipper-fortune-talisman-hand-inscribed-vermilion-on-rice-paper',
      'the-supreme-home-peace-harmony-talisman',
      'the-peach-blossom-romance-talisman',
      'the-scholastic-achievement-talisman-exam-success',
      'the-hundred-solutions-karmic-cleansing-talisman',
      'the-universal-luck-transfer-talisman',
    ];

    for (const slug of requiredSlugs) {
      const found = talismans.find(p => p.slug === slug);
      assert.ok(found !== undefined, `Missing required canonical talisman: ${slug}`);
    }
  });
});

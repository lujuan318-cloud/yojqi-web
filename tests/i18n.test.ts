import test from 'node:test';
import assert from 'node:assert/strict';
import { DICTIONARY, getDictionary } from '../lib/i18n';

test('i18n Dictionary Completeness', async (t) => {
  await t.test('Both EN and ZH dictionaries have all essential sections', () => {
    const requiredSections = ['nav', 'hero', 'intentions', 'shop', 'talismans', 'retreats', 'wisdom', 'footer'];

    for (const section of requiredSections) {
      assert.ok(section in DICTIONARY.en, `Missing EN section: ${section}`);
      assert.ok(section in DICTIONARY.zh, `Missing ZH section: ${section}`);
    }
  });

  await t.test('getDictionary returns fallback to EN on invalid lang', () => {
    const fallback = getDictionary('fr' as any);
    assert.equal(fallback.nav.brand, 'YOJQI');
  });

  await t.test('Talismans navigation and header copy exist in both languages', () => {
    assert.ok(DICTIONARY.en.nav.talismans.length > 0);
    assert.ok(DICTIONARY.zh.nav.talismans.length > 0);
    assert.ok(DICTIONARY.en.talismans.title.length > 0);
    assert.ok(DICTIONARY.zh.talismans.title.length > 0);
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRENCIES, Currency } from '../context/CurrencyContext';

test('Multi-Currency Engine', async (t) => {
  await t.test('All supported currencies are configured with symbols and rates', () => {
    const expectedCurrencies: Currency[] = ['USD', 'EUR', 'GBP', 'CNY', 'HKD'];

    for (const code of expectedCurrencies) {
      const config = CURRENCIES[code];
      assert.ok(config !== undefined, `Currency ${code} is missing from config`);
      assert.equal(config.code, code);
      assert.ok(config.rate > 0, `Rate for ${code} must be greater than 0`);
      assert.ok(config.symbol.length > 0, `Symbol for ${code} must not be empty`);
    }
  });

  await t.test('USD baseline rate is exactly 1.0', () => {
    assert.equal(CURRENCIES.USD.rate, 1.0);
  });

  await t.test('CNY to foreign currency conversion functions accurately for homestay rates', () => {
    const cnyAmount = 725;
    const usdAmount = cnyAmount / CURRENCIES.CNY.rate;
    assert.equal(usdAmount, 100);

    const eurAmount = usdAmount * CURRENCIES.EUR.rate;
    assert.equal(Math.round(eurAmount), 92);

    const hkdAmount = usdAmount * CURRENCIES.HKD.rate;
    assert.equal(Math.round(hkdAmount), 782);
  });
});


import test from 'node:test';
import assert from 'node:assert';
import {
  getUserProfile,
  setUserState,
  saveOnboardingAnswers,
  getAllRituals,
  getRitualsByNeed,
  toggleRitualCompletion,
  getCommunityPosts,
  toggleFeelYou,
  addPostNote,
  sendCareToPost,
  createCommunityPost
} from '../lib/journey-store';
import { askCompanion } from '../lib/companion-service';

test('Journey: User profile initialization & state progression', () => {
  const profile = getUserProfile();
  assert.ok(profile.userId);
  assert.ok(profile.todayBalance.sleep > 0);

  const updated = setUserState('returning_user');
  assert.strictEqual(updated.userState, 'returning_user');
});

test('Journey: Conversational Onboarding answers & tailored journey generation', () => {
  const profile = saveOnboardingAnswers({
    need: 'I want better sleep',
    feeling: 'Mentally hurried and overstimulated',
    desiredState: 'Better sleep'
  });

  assert.strictEqual(profile.userState, 'new_user');
  assert.ok(profile.onboarding);
  assert.ok(profile.currentJourneyEn.toLowerCase().includes('sleep') || profile.currentJourneyEn.toLowerCase().includes('serenity'));
});

test('Journey: Authentic Rituals catalog & completion tracking', () => {
  const rituals = getAllRituals();
  assert.ok(rituals.length >= 4, 'Must have at least 4 signature rituals');

  const sleepRituals = getRitualsByNeed('sleep');
  assert.ok(sleepRituals.length >= 1, 'Should find sleep rituals');

  const target = rituals[0];
  const updatedProfile = toggleRitualCompletion(target.id);
  assert.ok(updatedProfile.completedRitualIds !== undefined);
});

test('Friends: Community "I Feel You" & Note interaction', () => {
  const posts = getCommunityPosts();
  assert.ok(posts.length >= 3, 'Must have seed community posts');

  const targetPost = posts[0];
  const initialFeelCount = targetPost.feelYouCount;

  // Toggle Feel You
  const felt = toggleFeelYou(targetPost.id);
  assert.ok(felt);
  assert.strictEqual(felt?.feelYouCount, initialFeelCount + 1);

  // Add a gentle note
  const noted = addPostNote(targetPost.id, 'You are heard tonight.', 'Fellow Pilgrim');
  assert.ok(noted);
  assert.strictEqual(noted?.notes[0].content, 'You are heard tonight.');
});

test('Care Loop: Send a Little Care to a fellow traveler', () => {
  const posts = getCommunityPosts();
  const targetPost = posts[0];

  const cared = sendCareToPost(
    targetPost.id,
    'tea',
    'May this warm cup accompany your quiet evening.',
    'A friend in Kyoto'
  );

  assert.ok(cared);
  assert.strictEqual(cared?.careItems[0].type, 'tea');
  assert.strictEqual(cared?.careItems[0].message, 'May this warm cup accompany your quiet evening.');
});

test('Companion Service: Quiet, warm, non-judgmental Eastern responses', async () => {
  // Test reset mode
  const resetReply = await askCompanion([], 'I feel so stressed from work today', {
    lang: 'en',
    mode: 'reset'
  });

  assert.ok(resetReply.message.length > 20);
  assert.ok(resetReply.suggestedActions.length > 0);
  assert.strictEqual(resetReply.mode, 'reset');

  // Test Chinese response
  const zhReply = await askCompanion([], '今晚很难入睡，脑子停不下来', {
    lang: 'zh',
    mode: 'ritual'
  });

  assert.ok(zhReply.message.includes('思绪') || zhReply.message.includes('夜') || zhReply.message.includes('呼吸'));
});

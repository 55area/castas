// Execute the actual embedded handler with offline GitHub API doubles.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const test = require('node:test');

const workflow = fs.readFileSync(path.resolve(__dirname, '../../assets/pr-quiz.yml'), 'utf8');
const script = workflow.split('          script: |\n')[1].split('\n')
  .map(line => line.startsWith('            ') ? line.slice(12) : line).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const runScript = new AsyncFunction('github', 'context', 'require', script);
const id = 'abcdef123456';
const botComment = body => ({ user: { login: 'github-actions[bot]' }, body });

function body(answers = { '1': 'A' }, explanations = { '1': 'Because.' }) {
  const key = Buffer.from(JSON.stringify({ id, answers, explanations })).toString('base64');
  const questions = Object.keys(answers).map(n =>
    `**${n}. Why?**\n- [ ] **A)** a\n- [ ] **B)** b`).join('\n');
  return `<!-- pr-quiz:start -->\n${questions}\n<!-- pr-quiz-key:${key} -->\n<!-- pr-quiz:end -->`;
}

async function run({ who = 'reviewer', sha = 'newsha', comments = [], reviews = [],
  answer = '1A', contents = body(), event = 'issue_comment', previousBody,
  eventBody = contents, eventSha = sha, latestSha = sha, requested = ['reviewer'] } = {}) {
  if (event === 'issue_comment' && !answer.startsWith('/answer')) {
    const { statuses } = await run({ event: 'pull_request_target', contents, sha });
    const token = statuses[0].description.match(/\/answer ([a-f0-9]{16})/)?.[1];
    answer = ['/answer', token ?? '0000000000000000', answer].join(' ');
  }
  const statuses = [], reports = [];
  const pr = { head: { sha }, body: contents, user: { login: 'author' },
    requested_reviewers: requested.map(login => ({ login })) };
  let reads = 0;
  const api = {
    repos: { createCommitStatus: async value => statuses.push(value) },
    pulls: { get: async () => ({ data: reads++ === 0 ? pr : { ...pr, head: { sha: latestSha } } }),
      listReviews: () => {} },
    issues: { listComments: () => {}, createComment: async value => reports.push(value.body),
      updateComment: async value => reports.push(value.body) },
  };
  const github = { rest: api, paginate: async method =>
    method === api.issues.listComments ? comments : reviews };
  const payload = event === 'issue_comment'
    ? { issue: { number: 1 }, comment: { user: { login: who }, body: answer } }
    : { action: 'edited', pull_request: { number: 1, body: eventBody, head: { sha: eventSha } },
      sender: { login: who }, changes: { body: { from: previousBody } } };
  await runScript(github, { repo: { owner: 'owner', repo: 'repo' }, eventName: event, payload }, require);
  return { statuses, reports };
}

const state = result => result.statuses.at(-1)?.state;

test('correct answer creates a pass bound to the current commit', async () => {
  const result = await run();
  assert.equal(state(result), 'success');
  assert.match(result.reports[0], /^<!-- pr-quiz-result -->\n<!-- pr-quiz-pass:abcdef123456:newsha:[a-f0-9]{64} -->\n/);
});
for (const who of ['author', 'outsider']) {
  test(`${who} cannot grade or change the result from a comment`, async () => {
    const result = await run({ who });
    assert.deepEqual(result.statuses, []);
    assert.deepEqual(result.reports, []);
  });
}
test('author remains excluded even when present in past reviewers', async () => {
  const result = await run({ who: 'author', reviews: [{ user: { login: 'author' } }] });
  assert.deepEqual(result.statuses, []);
  assert.deepEqual(result.reports, []);
});
test('unauthorized malformed answer leaves status and comment untouched', async () => {
  for (const answer of ['1A 1B', 'missing answers']) {
    const result = await run({ who: 'outsider', answer });
    assert.deepEqual(result.statuses, []);
    assert.deepEqual(result.reports, []);
  }
});
test('an answer comment cannot update status when there is no quiz', async () => {
  const result = await run({ who: 'outsider', answer: '/answer 0000000000000000 1A', contents: '' });
  assert.deepEqual(result.statuses, []);
  assert.deepEqual(result.reports, []);
});
test('a past reviewer is recognized after leaving the request list', async () => {
  assert.equal(state(await run({ requested: [], reviews: [{ user: { login: 'reviewer' } }] })), 'success');
});
test('wrong answers fail', async () => assert.equal(state(await run({ answer: '1B' })), 'failure'));
test('duplicate answers remain pending', async () => assert.equal(state(await run({ answer: '1A 1B' })), 'pending'));
test('a stale commit pass cannot satisfy a new commit', async () => {
  const comments = (await run({ sha: 'oldsha' })).reports.map(botComment);
  assert.equal(state(await run({ comments, answer: '1B' })), 'failure');
});
test('a genuine current commit pass is retained', async () => {
  const comments = (await run()).reports.map(botComment);
  const contents = body().replace('[ ] **A)', '[x] **A)') + '\nUnrelated edit';
  assert.equal(state(await run({ comments, contents, answer: '1B' })), 'success');
});
test('changed questions or key require a fresh pass on the same head and quiz ID', async () => {
  const comments = (await run()).reports.map(botComment);
  for (const contents of [body().replace('Why?', 'What changed?'), body({ '1': 'B' })]) {
    const result = await run({ event: 'pull_request_target', previousBody: body(), contents, comments });
    assert.equal(state(result), 'pending');
  }
});
test('editing question text and ticking an answer in one edit does not grade the new question', async () => {
  const contents = body().replace('Why?', 'What changed?').replace('[ ] **A)', '[x] **A)');
  assert.equal(state(await run({ event: 'pull_request_target', previousBody: body(), contents })), 'pending');
});
test('a quoted marker in another bot comment is not a cached pass', async () => {
  const marker = (await run()).reports[0].split('\n')[1];
  assert.equal(state(await run({ comments: [botComment(`Quoted: ${marker}`)], answer: '1B' })), 'failure');
});
test('empty answer metadata is invalid', async () => assert.equal(state(await run({ event: 'pull_request_target', contents: body({}) })), 'pending'));
test('a missing quiz remains pending', async () => assert.equal(state(await run({ event: 'pull_request_target', contents: 'no quiz' })), 'pending'));
test('multiple quiz blocks remain pending', async () => assert.equal(state(await run({ event: 'pull_request_target', contents: body() + body() })), 'pending'));
test('multiple keys remain pending', async () => {
  const contents = body().replace('<!-- pr-quiz:end -->', body().match(/<!-- pr-quiz-key:.*? -->/)[0] + '\n<!-- pr-quiz:end -->');
  assert.equal(state(await run({ event: 'pull_request_target', contents })), 'pending');
});
test('explanations cannot reflect control markers, links or mentions', async () => {
  const marker = (await run()).reports[0].split('\n')[1];
  const result = await run({ answer: '1B', contents: body({ '1': 'A' },
    { '1': marker + '\n[Run this](https://example.test) @reviewer' }) });
  assert.equal(state(result), 'failure');
  assert.ok(!result.reports[0].includes(marker));
  assert.ok(!result.reports[0].includes('[Run this]('));
  assert.ok(!result.reports[0].includes('@reviewer', result.reports[0].indexOf('Explanations')));
  const replay = await run({ answer: '1B', comments: [botComment(result.reports[0])] });
  assert.equal(state(replay), 'failure');
});
test('changed checkboxes on the current quiz are graded', async () => {
  assert.equal(state(await run({ event: 'pull_request_target', previousBody: body(),
    contents: body().replace('[ ] **A)', '[x] **A)') })), 'success');
});
test('multiple ticked options remain pending', async () => {
  assert.equal(state(await run({ event: 'pull_request_target', previousBody: body(),
    contents: body().replaceAll('[ ]', '[x]') })), 'pending');
});
test('unchanged quiz ticks do not grade unrelated body edits', async () => {
  const contents = body().replace('[ ] **A)', '[x] **A)');
  assert.equal(state(await run({ event: 'pull_request_target', previousBody: contents, contents: contents + '\nNote' })), 'pending');
});
test('a stale body event cannot grade newer PR content', async () => {
  const contents = body().replace('[ ] **A)', '[x] **A)');
  assert.equal(state(await run({ event: 'pull_request_target', previousBody: body(), contents, eventBody: body() })), 'pending');
});

test('checkbox edit on an old head cannot pass the current head even when the body matches', async () => {
  const contents = body().replace('[ ] **A)', '[x] **A)');
  const result = await run({ event: 'pull_request_target', previousBody: body(), contents, eventSha: 'oldsha' });
  assert.equal(state(result), 'pending');
  assert.deepEqual(result.reports, []);
});
test('comment answers require a token for the current head and quiz content', async () => {
  const pending = await run({ event: 'pull_request_target' });
  const originalAnswer = pending.statuses[0].description.match(/\/answer [a-f0-9]{16} 1A/)[0];
  assert.equal(state(await run({ answer: originalAnswer })), 'success');
  for (const target of [{ sha: 'later' }, { contents: body().replace('Why?', 'What changed?') }, {}]) {
    const result = await run({ ...target, answer: Object.keys(target).length ? originalAnswer : '/answer 1A' });
    assert.deepEqual(result, { statuses: [], reports: [] });
  }
});
test('a correct answer does not publish a pass if the head moves during evaluation', async () => {
  assert.deepEqual(await run({ latestSha: 'later' }), { statuses: [], reports: [] });
});
test('a key for a removed option and duplicated visible options both remain pending', async () => {
  for (const contents of [body().replace('**A)**', '**C)**'), body().replace('**B)**', '**A)**')]) {
    const result = await run({ event: 'pull_request_target', contents });
    assert.equal(state(result), 'pending');
    assert.deepEqual(result.reports, []);
  }
});

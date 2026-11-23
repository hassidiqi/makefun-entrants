// Entry for make.fun's bounty-entrants-02.
// Reads BOUNTY.json and prints the pages of the bounties this entry counts,
// where a person can enter and pay the bounty's entry fee.
// Node 22, standard library only, no network.
import { readFileSync } from 'node:fs';

type BountyFile = { bounties?: string[] };

function loadBounties(): string[] {
  const raw = readFileSync(new URL('./BOUNTY.json', import.meta.url), 'utf8');
  const parsed = JSON.parse(raw) as BountyFile;
  return Array.isArray(parsed.bounties)
    ? parsed.bounties.filter((s) => typeof s === 'string' && s.length > 0)
    : [];
}

function pageUrl(slug: string): string {
  return `https://make.fun/bounty/${slug}`;
}

const bounties = loadBounties();
for (const slug of bounties) {
  process.stdout.write(`Enter ${pageUrl(slug)} and pay its entry fee to be counted.\n`);
}
if (bounties.length === 0) {
  process.stdout.write('No bounties are listed in BOUNTY.json yet.\n');
} else {
  process.stdout.write(`${bounties.length} bounty page(s) listed.\n`);
}

/* eslint-disable react/no-unescaped-entities */

/**
 * Top freeform section of /about.
 *
 * Drafts render verbatim per CLAUDE.md ("Never rewrite, paraphrase, or improve
 * case-study or page copy"). Inline `TODO: Bran polish` comments mark typos
 * and minor grammar issues for the author to fix in a follow-up commit.
 */
export default function AboutEssay() {
  return (
    <section className="flex flex-col max-w-column">
      <h1 className="sr-only">About</h1>

      {/* Section A — Utilitarian thesis */}
      {/* TODO: Bran polish — typos: it's→its, defintiion→definition, quantified→quantify, sets priorities→set priorities */}
      <p className="type-lede text-text-primary mb-16">
        I&apos;m utilitarian by it&apos;s commonsense defintiion, which basically
        puts function over form, but also by its philosophical definition which
        is concerned with thinking that is trying to quantified all the possible
        things. I pick restaurant by the reviews, sets priorities by putting the
        numbers, make lifeplans based on estimating probabilities. Nothing is
        given, nothing is certain, everything is a tradeoff. My{" "}
        <a
          href="https://reprio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-citation-link hover:text-citation-link-hover"
        >
          Reprio
        </a>{" "}
        app demonstrates this thinking well.
      </p>

      {/* Section B — Philosophy */}
      <div className="flex flex-col gap-6">
        <h2 className="type-body font-medium text-text-primary">My philosophy.</h2>
        <p className="type-label text-text-secondary">
          I will try to be little controversial here.
        </p>

        {/* TODO: Bran polish — typos: clariry→clarity, "at the first place"→"in the first place", "making you the problems" grammar */}
        <p className="type-body text-text-primary">
          I think working hard is overestimated. Working harder than you should
          will result in loss of your clariry, making you the problems you
          wouldn&apos;t have at the first place, that would again give you more
          work. I favor laziness over working hard. Work smart. Optimize to have
          more time. Optimize so you could be lazy and have free time to think
          your next step through with clarity.
        </p>

        <p className="type-body text-text-primary">
          Reality is never boring. Our interpretation is.
        </p>

        <p className="type-body text-text-primary">
          Single most important psychology fact relevant to ux is that
          there&apos;s no strong correlation between what people say and what
          they do so I will just stop here to save you some time.
        </p>
      </div>
    </section>
  );
}

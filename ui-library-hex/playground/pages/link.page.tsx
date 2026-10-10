import { Link } from "../../ui/link";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "link", title: "Link", group: "Foundations", step: 2, description: "Internal and external links with a tokenised underline style." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants">
        <Row>
          <Link href="#/link">Default</Link>
          <Link href="#/link" variant="muted">
            Muted
          </Link>
          <Link href="#/link" variant="plain">
            Plain
          </Link>
        </Row>
      </Section>
      <Section title="Underline style">
        <Row>
          <Link href="#/link" underline="always">
            Always
          </Link>
          <Link href="#/link" underline="hover">
            On hover
          </Link>
          <Link href="#/link" underline="none">
            None
          </Link>
        </Row>
      </Section>
      <Section title="External" hint="Absolute http(s) links open in a new tab with a safe rel and an announced hint.">
        <Row>
          <Link href="https://example.com">example.com</Link>
          <Link href="#/link" external externalLabel="(new tab)">
            Forced external
          </Link>
        </Row>
      </Section>
      <Section title="Inline in text">
        <p className="max-w-prose">
          Read the <Link href="#/link">spec section</Link> before changing a <Link href="https://example.com">recipe</Link>; it explains why.
        </p>
      </Section>
    </ThemeMatrix>
  );
}

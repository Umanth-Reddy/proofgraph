import { Avatar, AvatarGroup } from "../../ui/avatar";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "avatar", title: "Avatar / AvatarGroup", group: "Foundations", step: 2, description: "Image with initials fallback, presence status and overlapping groups." };

const people = ["Asha Rao", "Ben Okafor", "Chen Wei", "Dana Kim", "Eli Park", "Fay Lopez"].map((name) => ({ name }));

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Sizes and shapes">
        <Row>
          <Avatar name="Asha Rao" size="sm" />
          <Avatar name="Asha Rao" size="md" />
          <Avatar name="Asha Rao" size="lg" />
          <Avatar name="Asha Rao" shape="square" />
          <Avatar name="Single" />
          <Avatar />
        </Row>
      </Section>
      <Section title="Tones">
        <Row>
          {TONES.map((t) => (
            <Avatar key={t} name={`${t} user`} tone={t} />
          ))}
        </Row>
      </Section>
      <Section title="Status">
        <Row>
          <Avatar name="Online User" status="success" statusLabel="Online" />
          <Avatar name="Away User" status="warning" statusLabel="Away" />
          <Avatar name="Busy User" status="danger" statusLabel="Busy" size="lg" />
        </Row>
      </Section>
      <Section title="Image with broken URL falls back to initials">
        <Row>
          <Avatar name="Broken Image" src="/nope.png" />
        </Row>
      </Section>
      <Section title="AvatarGroup" hint="max = 4 by default; the rest collapse into +N.">
        <Row>
          <AvatarGroup items={people} />
          <AvatarGroup items={people.slice(0, 3)} size="sm" />
          <AvatarGroup items={people} max={2} size="lg" />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}

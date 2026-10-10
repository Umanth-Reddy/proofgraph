import { ArrowRight, Download, Plus, Settings, Trash2 } from "lucide-react";
import { Button, ButtonGroup, IconButton } from "../../ui/button";
import { TONES } from "../../lib/tone";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "button", title: "Button", group: "Foundations", step: 2, description: "Button, IconButton and ButtonGroup. Variants, sizes, tones, loading and disabled states." };

const VARIANTS = ["solid", "soft", "outline", "ghost", "link"] as const;

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants × tones" hint="Tone omitted = accent.">
        {VARIANTS.map((v) => (
          <Row key={v} label={v}>
            <Button variant={v}>Accent</Button>
            {TONES.map((t) => (
              <Button key={t} variant={v} tone={t}>
                {t}
              </Button>
            ))}
          </Row>
        ))}
      </Section>
      <Section title="Sizes">
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
      </Section>
      <Section title="States">
        <Row>
          <Button loading>Saving</Button>
          <Button variant="outline" loading>
            Loading
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </Row>
      </Section>
      <Section title="Slots">
        <Row>
          <Button leading={<Plus className="size-4" />}>New item</Button>
          <Button variant="outline" trailing={<ArrowRight className="size-4" />}>
            Continue
          </Button>
          <Button tone="danger" variant="soft" leading={<Trash2 className="size-4" />}>
            Delete
          </Button>
          <Button fullWidth variant="soft">
            Full width
          </Button>
        </Row>
      </Section>
      <Section title="IconButton" hint="`label` is required: it is the accessible name.">
        <Row>
          <IconButton label="Settings" size="sm">
            <Settings className="size-4" />
          </IconButton>
          <IconButton label="Settings">
            <Settings className="size-4" />
          </IconButton>
          <IconButton label="Settings" size="lg" variant="outline">
            <Settings className="size-5" />
          </IconButton>
          <IconButton label="Download" variant="solid" tone="neutral">
            <Download className="size-4" />
          </IconButton>
        </Row>
      </Section>
      <Section title="ButtonGroup">
        <Row>
          <ButtonGroup aria-label="View">
            <Button variant="outline">Day</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
          </ButtonGroup>
          <ButtonGroup attached={false}>
            <Button variant="soft">One</Button>
            <Button variant="soft">Two</Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button variant="outline" size="sm">
              Top
            </Button>
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </ButtonGroup>
        </Row>
      </Section>
      <Section title="asChild">
        <Row>
          <Button asChild variant="outline">
            <a href="#/button">Rendered as a link</a>
          </Button>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}

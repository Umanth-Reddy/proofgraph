import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Container, Grid, Section, Stack } from "../../layout/stack";
import { Section as DemoSection, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "stack", title: "Stack / Grid / Section / Container", group: "Layout", step: 7, description: "Gap-based spacing helpers. `md` gap follows the density token, so compact mode tightens every Stack." };

const Box = ({ children }: { children: React.ReactNode }) => <div className="rounded-control border border-border-strong bg-bg-raised px-3 py-2 text-sm">{children}</div>;

export default function Page() {
  return (
    <ThemeMatrix>
      <DemoSection title="Stack: column and row, gaps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Stack gap="sm">
            <Box>One</Box>
            <Box>Two (gap sm)</Box>
          </Stack>
          <Stack>
            <Box>One</Box>
            <Box>Two (gap md = density token)</Box>
          </Stack>
        </div>
        <Stack direction="row" gap="sm" wrap align="center" justify="between" className="mt-4">
          <Badge>wrap</Badge>
          <Badge tone="info">row</Badge>
          <Button size="sm" variant="outline">align + justify</Button>
        </Stack>
      </DemoSection>
      <DemoSection title="Grid: responsive columns, and auto-fit by min width">
        <Grid columns={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i}>Cell {i + 1}</Box>
          ))}
        </Grid>
        <div className="mt-4" />
        <Grid minItemWidth="9rem" gap="sm">
          {Array.from({ length: 7 }, (_, i) => (
            <Box key={i}>Auto {i + 1}</Box>
          ))}
        </Grid>
      </DemoSection>
      <DemoSection title="Section and Container">
        <Container size="md" padded={false}>
          <Section title="Section title" description="Heading, description and actions in one header." actions={<Button size="sm" variant="outline">Action</Button>}>
            <Box>Section body</Box>
          </Section>
        </Container>
      </DemoSection>
    </ThemeMatrix>
  );
}

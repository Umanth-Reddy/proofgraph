import { MoreHorizontal } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button, IconButton } from "../../ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "../../ui/card";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "card", title: "Card", group: "Foundations", step: 2, description: "Outline, raised and sunken surfaces with header, body and footer parts." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Variants">
        <div className="grid gap-3 sm:grid-cols-3">
          {(["outline", "raised", "sunken"] as const).map((v) => (
            <Card key={v} variant={v}>
              <CardHeader title={v} description="Card description" />
              <CardBody>Body content sits here.</CardBody>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Full anatomy">
        <Card className="max-w-md">
          <CardHeader
            title="Repository scan"
            description="Last run 2 hours ago"
            actions={
              <>
                <Badge tone="success" dot>
                  Verified
                </Badge>
                <IconButton label="More actions" size="sm">
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </>
            }
          />
          <CardBody>Evidence was found for 14 of 16 claims.</CardBody>
          <CardFooter>
            <Button variant="ghost" size="sm">
              Dismiss
            </Button>
            <Button size="sm">Review</Button>
          </CardFooter>
        </Card>
      </Section>
      <Section title="Interactive (asChild)">
        <Row>
          <Card asChild interactive className="max-w-xs">
            <a href="#/card">
              <CardHeader title="Clickable card" description="Whole surface is a link" />
              <CardBody>Hover and focus me.</CardBody>
            </a>
          </Card>
        </Row>
      </Section>
    </ThemeMatrix>
  );
}

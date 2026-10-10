import { Settings, User } from "lucide-react";
import { UserMenu } from "../../blocks/user-menu";
import { Row, Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "user-menu", title: "UserMenu", group: "Layout", step: 7, description: "Avatar dropdown with identity, your items, a theme choice and sign out." };

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Default">
        <Row>
          <UserMenu
            user={{ name: "Asha Rao", email: "asha.rao@example.com" }}
            items={[{ label: "Profile", icon: <User className="size-4" /> }, { label: "Settings", icon: <Settings className="size-4" /> }]}
            onSignOut={() => {}}
          />
        </Row>
      </Section>
      <Section title="Sizes, without theme section">
        <Row>
          <UserMenu size="sm" hideTheme user={{ name: "Ben Okafor" }} onSignOut={() => {}} />
          <UserMenu size="lg" hideTheme user={{ name: "Chen Wei", email: "a-very-long-email-address-that-truncates@example.com" }} />
        </Row>
      </Section>
    </ThemeMatrix>
  );
}

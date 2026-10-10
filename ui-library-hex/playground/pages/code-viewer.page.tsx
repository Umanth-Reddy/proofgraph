import { useState } from "react";
import { CodeHeader, CodeViewer } from "../../ui/code-viewer";
import { Section, ThemeMatrix } from "../kit";
import type { PageMeta } from "../types";

export const meta: PageMeta = { id: "code-viewer", title: "CodeViewer", group: "Live and code", step: 5, description: "Line numbers, tone-highlighted ranges, context folding, header slot, wrap toggle and lazy syntax highlighting (colors come from --shiki-* tokens). Long lines scroll inside the viewer." };

const python = `from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Product

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/{product_id}")
def read_product(product_id: int, db: Session = Depends(get_db)):
    """Return one product or 404."""
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/")
def list_products(limit: int = 20, db: Session = Depends(get_db)):
    return db.query(Product).limit(limit).all()


# A deliberately very long comment line to demonstrate horizontal scrolling and the wrap toggle in the viewer component.
`;

const ts = `export function useCountdown(totalMs: number) {
  const [left, setLeft] = useState(totalMs);
  useEffect(() => {
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}`;

function Controlled() {
  const [wrap, setWrap] = useState(true);
  return (
    <>
      <p className="mb-2 text-xs text-fg-muted">wrap = {String(wrap)} (controlled)</p>
      <CodeViewer code={ts} language="typescript" wrap={wrap} onWrapChange={setWrap} />
    </>
  );
}

export default function Page() {
  return (
    <ThemeMatrix>
      <Section title="Evidence view: highlights, folding, header" hint="Lines 40–54 of the file; context folding keeps 3 lines around each highlight.">
        <CodeViewer
          code={python}
          language="python"
          startLine={1}
          contextCollapse={2}
          highlights={[
            { from: 10, to: 15, tone: "success", label: "Accepted evidence" },
            { from: 19, to: 20, tone: "warning", label: "Weak evidence" },
          ]}
          header={<CodeHeader path="app/routers/products.py" meta="15fedba" copy />}
        />
      </Section>
      <Section title="No folding, no highlights, max-height scroll">
        <CodeViewer code={python} language="python" maxHeight="12rem" header={<CodeHeader path="app/routers/products.py" copy />} />
      </Section>
      <Section title="Other tones">
        <CodeViewer code={ts} language="typescript" highlights={[{ from: 1, to: 2, tone: "info" }, { from: 5, to: 5, tone: "danger", label: "Rejected" }]} lineNumbers wrapToggle={false} />
      </Section>
      <Section title="Controlled wrap, plain text (no syntax)">
        <div className="grid gap-3">
          <Controlled />
          <CodeViewer lines={["plain line 1", "", "plain line 3"]} syntax={false} startLine={41} />
        </div>
      </Section>
      <Section title="States">
        <div className="grid gap-3">
          <CodeViewer loading />
          <CodeViewer lines={[]} />
          <CodeViewer error="Could not load this file (404)." />
        </div>
      </Section>
    </ThemeMatrix>
  );
}

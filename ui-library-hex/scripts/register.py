#!/usr/bin/env python3
"""Usage: register.py <dir>/<folder>:<key> ...   e.g. register.py ui/empty-state:emptyState blocks/foo:foo
Adds recipe imports + keys to skins/default/index.ts (idempotent, sorted)."""
import re,sys
p="skins/default/index.ts"; s=open(p).read()
lines=s.split("\n")
imp_idx=[i for i,l in enumerate(lines) if l.startswith("import ")]
imps=[lines[i] for i in imp_idx]
m=re.search(r"export const defaultSkin = \{\n(.*?)\n\};",s,re.S)
entries=m.group(1).split("\n")
for arg in sys.argv[1:]:
    path,key=arg.split(":"); folder=path.split("/")[-1]
    imp=f'import {{ {key}Recipe }} from "../../{path}/{folder}.recipe";'
    if imp not in imps: imps.append(imp)
    e=f"  {key}: {key}Recipe,"
    if e not in entries: entries.append(e)
imps=sorted(imps,key=lambda l:l.split("from ")[1])
entries=sorted(set(entries),key=lambda l:l.strip())
head=lines[:imp_idx[0]]
out="\n".join(head+imps)+"\n\nexport const defaultSkin = {\n"+"\n".join(entries)+"\n};\n"
open(p,"w").write(out)

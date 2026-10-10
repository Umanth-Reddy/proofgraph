#!/usr/bin/env python3
"""Usage: mark.py <x|~|' '> "<item substring>" ["note"]   |   mark.py step <n> <x|~> | mark.py log "text" """
import sys,re
p="PROGRESS.md"; lines=open(p).read().split("\n")
if sys.argv[1]=="log":
    lines.append("- "+sys.argv[2]); open(p,"w").write("\n".join(lines)); sys.exit()
if sys.argv[1]=="step":
    n,m=sys.argv[2],sys.argv[3]
    for i,l in enumerate(lines):
        if l.startswith(f"## Step {n} "): lines[i]=re.sub(r"`\[.\]`",f"`[{m}]`",l)
    open(p,"w").write("\n".join(lines)); sys.exit()
mark,sub=sys.argv[1],sys.argv[2]; note=sys.argv[3] if len(sys.argv)>3 else ""
hit=False
for mode in ("prefix","contains"):
    for i,l in enumerate(lines):
        if hit or not l.startswith("- ["): continue
        ok = l[6:].startswith(sub) if mode=="prefix" else sub.lower() in l.lower()
        if ok:
            base=re.sub(r" — .*$","",l[6:]); lines[i]=f"- [{mark}] {base}"+(f" — {note}" if note else ""); hit=True
if not hit: print("NO MATCH",sub); sys.exit(1)
open(p,"w").write("\n".join(lines))

import { cpSync, mkdirSync, existsSync, readFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ error: "Only available in development" }, { status: 403 });
  }

  const { repoName } = await req.json();
  if (!repoName || !/^[a-z0-9-]+$/.test(repoName)) {
    return Response.json({ error: "Invalid repo name. Use lowercase letters, numbers, and hyphens only." }, { status: 400 });
  }

  const src = process.cwd();
  const dest = path.join(process.env.HOME!, "Documents/Github", repoName);

  if (existsSync(dest)) {
    return Response.json({ error: `Directory already exists: ${dest}` }, { status: 409 });
  }

  try {
    mkdirSync(dest, { recursive: true });

    const skip = new Set(["node_modules", ".next", ".git", ".DS_Store"]);

    cpSync(src, dest, {
      recursive: true,
      filter: (source) => {
        const rel = path.relative(src, source);
        if (!rel) return true;
        const top = rel.split(path.sep)[0];
        return !skip.has(top);
      },
    });

    // The copied client.json is already the right config — nothing extra needed.
    // Run git init + first commit
    execSync(`git init && git add . && git commit -m "init: ${repoName}"`, {
      cwd: dest,
      stdio: "pipe",
    });

    return Response.json({ ok: true, path: dest, repoName });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const clientDir = new URL("dist/client/", root);
const workerUrl = new URL("dist/server/index.js", root);
workerUrl.searchParams.set("pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const assets = {
  fetch: async (request) => {
    const pathname = new URL(request.url).pathname.replace(/^\/xiaosuanlife-official/, "");
    try {
      return new Response(await readFile(new URL(`dist/client${pathname}`, root)));
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};

async function render(pathname, output) {
  let response = await worker.fetch(
    new Request(`https://yiluochenghuo.github.io${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: assets },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
    response = await worker.fetch(
      new Request(new URL(response.headers.get("location"), `https://yiluochenghuo.github.io${pathname}`), { headers: { accept: "text/html" } }),
      { ASSETS: assets },
      { waitUntil() {}, passThroughOnException() {} },
    );
  }
  if (!response.ok) throw new Error(`Render failed for ${pathname}: ${response.status}`);
  const target = new URL(output, clientDir);
  await mkdir(new URL("./", target), { recursive: true });
  await writeFile(target, await response.text());
}

await render("/xiaosuanlife-official/", "index.html");
await render("/xiaosuanlife-official/download", "download/index.html");
await render("/xiaosuanlife-official/evaluation", "evaluation/index.html");
await cp(
  new URL("dist/client/xiaosuanlife-official/_next/", root),
  new URL("dist/client/_next/", root),
  { recursive: true },
);
await writeFile(new URL(".nojekyll", clientDir), "");

const prefix = "/xiaosuanlife-official";
const absoluteAssets = ["/screens/", "/download/XiaoSuanLife", "/xiaosuan-app-icon.png", "/og.png", "/version.json"];

async function patchAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await patchAssets(file);
    else if ([".html", ".js", ".css"].includes(extname(file))) {
      let text = await readFile(file, "utf8");
      for (const asset of absoluteAssets) text = text.split(asset).join(prefix + asset);
      text = text
        .split("http://localhost:3000/xiaosuanlife-official/")
        .join("https://yiluochenghuo.github.io/xiaosuanlife-official/");
      await writeFile(file, text);
    }
  }
}

await patchAssets(fileURLToPath(new URL("dist/client/", root)));

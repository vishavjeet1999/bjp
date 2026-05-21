// Simplified production server for serving the Vite app
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const serve = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  let pathname = url.pathname;

  // Try to serve files from dist (production build)
  let filePath = path.join(ROOT, "dist", pathname === "/" ? "index.html" : pathname);

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      const contentType = getContentType(ext);
      return new Response(content, {
        headers: { "Content-Type": contentType },
      });
    }
  } catch {
    // Fall through
  }

  // Fallback to index.html for SPA routing
  try {
    const indexPath = path.join(ROOT, "dist", "index.html");
    const content = fs.readFileSync(indexPath);
    return new Response(content, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "application/javascript",
    ".jsx": "application/javascript",
    ".ts": "application/javascript",
    ".tsx": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  return types[ext] || "application/octet-stream";
}

export default {
  fetch: serve,
};

export const dynamic = "force-static";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!" + JSON.stringify(request), {
    status: 200,
    headers: { "Set-Cookie": `token=13` },
  });
}

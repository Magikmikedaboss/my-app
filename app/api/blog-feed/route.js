// app/api/blog-feed/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOGGER = "https://fixitwithmikelasvegas.blogspot.com";
const FEED = `${BLOGGER}/feeds/posts/default?alt=rss&max-results=12`;

// tiny helpers
const strip = (s="") => s.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
const decode = (s="") => s.replace(/&amp;/g,"&").replace(/&lt;/g,"<")
  .replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const pick = (str,re)=>{const m=str.match(re);return m?m[1]:"";};

function parseFeed(xml){
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.map(b=>{
    let title = pick(b,/<title[^>]*>([\s\S]*?)<\/title>/i);
    let link  = pick(b,/<link>([\s\S]*?)<\/link>/i) ||
                (b.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"][^>]*\/?>/i)?.[1]||"");
    let date = pick(b,/<pubDate>([\s\S]*?)<\/pubDate>/i) || pick(b,/<updated>([\s\S]*?)<\/updated>/i);
    let summary = pick(b,/<description>([\s\S]*?)<\/description>/i)
      || pick(b,/<summary[^>]*>([\s\S]*?)<\/summary>/i)
      || pick(b,/<content[^>]*>([\s\S]*?)<\/content>/i) || "";
    title = decode(strip(title));
    summary = decode(strip(summary)).slice(0,180);

    // derive slug from /YYYY/MM/slug.html
    let slug="post";
    try {
      const u=new URL(link);
      const last=u.pathname.split("/").filter(Boolean).pop()||"";
      slug=decodeURIComponent(last.replace(/\.html?$/i,""))||slug;
    } catch {}
    return { title, summary, date: date ? new Date(date).toISOString() : null, slug };
  });
}

export async function GET(){
  try{
    const r = await fetch(FEED, { cache: "no-store" });
    if(!r.ok) throw new Error(`Feed HTTP ${r.status}`);
    const xml = await r.text();
    const posts = parseFeed(xml).slice(0,3);
    return new Response(JSON.stringify({ ok:true, posts }), {
      headers: { "Content-Type":"application/json", "Cache-Control":"no-store" }
    });
  } catch(err){
    return new Response(JSON.stringify({ ok:false, error:String(err) }), {
      status: 502, headers: { "Content-Type":"application/json" }
    });
  }
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const ip = request.headers.get('cf-connecting-ip') || ""
  const hostname = url.hostname
  const time = (new Date()).toISOString()
  if (hostname.match(/(youtube|ytb)\.pop\.lol/)) {
    await LOG.put(time, `[YOUTUBE] @${ip} ${url}`)
    return Response.redirect("https://www.youtube.com/channel/UC0ecof5ekL_cNzdmncJL3uA/live")
  }
  else if (hostname.match(/bili(bili)?\.pop\.lol/
  )) {
    await LOG.put(time, `[BILIBILI] @${ip} ${url}`)
    return Response.redirect("https://live.bilibili.com/2305276")
  }
  else {
    await LOG.put(time, `[404] @${ip} ${url}`)
    return new Response(`Connot find ${url}`, {
      status: 404
    })
  }
}

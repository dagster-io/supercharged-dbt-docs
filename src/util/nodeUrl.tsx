export function getShortID(id: string) {
  // allow 200 characters for the file name
  // if (id.length <= 230) {
  //   return id;
  // }
  const safe = id.slice(0, 200);
  const end = id.slice(200);
  return safe + (id.length > 200 ? "." + cyrb53(end) : "");
}

export function getNodeUrl(node: any) {
  return "/" + node.resource_type + "/" + node.unique_id;
}

function cyrb53(str: string, seed: number = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

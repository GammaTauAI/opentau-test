const isSubsequence = function (s, t) {
  const sl = s.length;
  const tl = t.length;
  if (sl > tl) return false;
  if (sl === 0) return true;
  let si = 0;
  for (let i = 0; i < tl && si < sl; i++) {
    if (s[si] === t[i]) si++;
  }
  return si === sl;
};

const reverseBetween = function(head, left, right) {
  if(head == null) return head
  if(left === right) return head
  let cur = head, prev = null
  let step = 1
  while(step !== left) {
    prev = cur
    cur = cur.next
    step++
  }
  let l = cur
  while(step !== right) {
    cur = cur.next
    step++
  }
  let r = cur, next = cur.next
  // reverse
  
  let start = l, p = null
  while(start !== r) {
    let n = start.next
    start.next = p
    p = start
    start = n
  }

  r.next = p
  l.next = next
  if(prev) prev.next = r

  return prev ? head : r
};

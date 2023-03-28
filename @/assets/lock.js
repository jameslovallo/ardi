import { lock, unlock } from '//cdn.skypack.dev/tua-body-scroll-lock'
const frame = document.querySelector('iframe')
frame.addEventListener('mouseover', () => {
  lock(document.body)
})
frame.addEventListener('mouseleave', () => {
  unlock(document.body)
})

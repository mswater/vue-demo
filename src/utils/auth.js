export function getCurrentAuthority() {
  return ["admin"];
}

export function check(auth) {
  const current = getCurrentAuthority();
  return current.some(item => auth.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] != "guest";
}

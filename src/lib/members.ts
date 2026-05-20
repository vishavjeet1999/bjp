export type Member = {
  id: string;
  name: string;
  username: string;
  age: number;
  city: string;
  snack: string;
  reason: string;
  joinedAt: number;
};

const KEY = "bjp:members";
const BASE = 10247; // base count for the animated counter

export function getMembers(): Member[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Member[];
  } catch {
    return [];
  }
}

export function getMemberCount(): number {
  return BASE + getMembers().length;
}

export function addMember(input: Omit<Member, "id" | "joinedAt">): Member {
  const all = getMembers();
  const id = `BJP-${(BASE + all.length + 1).toString().padStart(6, "0")}`;
  const member: Member = { ...input, id, joinedAt: Date.now() };
  all.push(member);
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent("bjp:members-updated"));
  return member;
}

import type { SpaceItem } from "./types";

export const SPACE_DATA: SpaceItem[] = [
  {
    spaceId: "space-001",
    spaceName: "美容室",
    spaceCode: "GROOMING_ROOM",
    status: "Y",
    itemCount: 5,
    remark: "主要美容施作區域",
    cTime: "2026-01-15 09:30:00",
    cUserName: "admin",
    mTime: "2026-04-01 14:20:00",
    mUserName: "admin"
  },
  {
    spaceId: "space-002",
    spaceName: "會客區",
    spaceCode: "LOBBY",
    status: "Y",
    itemCount: 2,
    remark: "客戶洽談與等候區",
    cTime: "2026-02-10 10:00:00",
    cUserName: "admin",
    mTime: "2026-04-05 11:15:00",
    mUserName: "admin"
  },
  {
    spaceId: "space-003",
    spaceName: "休息區",
    spaceCode: "BREAKROOM",
    status: "N",
    itemCount: 1,
    remark: "目前閒置，暫不開放報價",
    cTime: "2026-03-01 08:45:00",
    cUserName: "admin",
    mTime: "2026-04-10 09:00:00",
    mUserName: "admin"
  }
];

export function getSpaceDetail(spaceId: string) {
  const space = SPACE_DATA.find(s => s.spaceId === spaceId);
  if (!space) return null;
  return {
    spaceId: space.spaceId,
    spaceName: space.spaceName,
    spaceCode: space.spaceCode,
    status: space.status,
    remark: space.remark
  };
}

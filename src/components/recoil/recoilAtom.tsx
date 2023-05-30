import { atom, selector } from "recoil";
import { Line } from "../signalR/chatSignalR";

export const textState = atom({
  key: "textState",
  default: "",
});

export const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

export const tableState = atom<Line[]>({
  key: "tableState",
  default: [],
});

export const counttableState = selector<string[]>({
  key: "counttableState",
  get: ({ get }) => {
    const tableItems = get(tableState);
    const userCounts: { [user: string]: number } = {};

    tableItems.forEach((item: Line) => {
      const user = item.user;
      if (userCounts[user]) {
        userCounts[user]++;
      } else {
        userCounts[user] = 1;
      }
    });

    const countStrings = Object.entries(userCounts).map(
      ([user, count]) => `${user} send: ${count} Message`
    );

    return countStrings;
  },
});

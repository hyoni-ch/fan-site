export interface AwardGroup {
  year: string;
  awards: string[];
}

export const awardsData: AwardGroup[] = [
  {
    year: "2025",
    awards: ["제1회 디 어워즈 (D Awards) - 임팩트상 수상"],
  },
  {
    year: "2024",
    awards: [
      "2024 아시아 아티스트 어워즈 (AAA 2024) - AAA 베스트 초이스상 수상",
      "2024 아시아 아티스트 어워즈 (AAA 2024) - AAA 이모티브상 수상",
    ],
  },
  {
    year: "2023",
    awards: ["2023 대한민국 퍼스트브랜드 - 대상 수상"],
  },
  {
    year: "2022",
    awards: [
      "MNET JAPAN FAN’S CHOICE - AWARDS 수상",
      "SBS MTV 더쇼 - 1위 수상",
    ],
  },
];

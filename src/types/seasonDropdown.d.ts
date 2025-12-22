export interface season {
  value: string;
  label: string;
}

export interface SeasonDropdownProps {
  onSelectSeason: (seasonValue: string) => void;
}

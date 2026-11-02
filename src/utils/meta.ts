/**
 * The data files describe a role or a qualification as a list of strings,
 * most of them "Label: value" ("Dates: June 2019 to July 2021"). This splits
 * each one so the page can set the label quietly and the value plainly; a
 * string with no label comes back as a value on its own.
 */
export interface MetaItem {
  label?: string;
  value: string;
}

export const parseMeta = (lines: string[] = []): MetaItem[] =>
  lines.map((line) => {
    const match = line.match(/^(Dates?|Position|Qualification):\s*(.+)$/);
    return match ? { label: match[1], value: match[2] } : { value: line };
  });

/** The value of the first line with this label, if any. */
export const metaValue = (items: MetaItem[], ...labels: string[]) =>
  items.find((item) => item.label && labels.includes(item.label))?.value;

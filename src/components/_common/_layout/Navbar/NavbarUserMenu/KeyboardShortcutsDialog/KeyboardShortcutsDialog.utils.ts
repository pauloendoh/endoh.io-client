interface Section {
  title: string
  shortcuts: Shortcut[]
}

interface Shortcut {
  name: string
  shortcut: string
}

const shortcutSections: Section[] = [
  {
    title: "Relearn",
    shortcuts: [
      { name: "New resource", shortcut: "q" },
      { name: "Edit resource", shortcut: "Alt + Click" },
      { name: "Select one resource", shortcut: "Ctrl + Click" },
      { name: "Select range of resources", shortcut: "Shift + Click" },
    ],
  },
  {
    title: "Questions",
    shortcuts: [
      { name: "New question", shortcut: "q" },

      {
        name: "Edit question (dialog)",
        shortcut: "Alt + Click",
      },
    ],
  },
]

export default shortcutSections

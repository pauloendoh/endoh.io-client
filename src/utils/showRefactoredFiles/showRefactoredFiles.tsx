import { readdirSync } from "fs"

const reader = new FileReader()
readdirSync(`${__dirname}/../`).forEach(async (fileOrFolderPath) => {
  if (fileOrFolderPath.endsWith(".ts")) {
    console.log(fileOrFolderPath)
  }
})

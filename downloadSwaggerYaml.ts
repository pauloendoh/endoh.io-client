import axios from "axios"
import { config } from "dotenv"
import fs from "fs"
config()

export async function downloadSwaggerYaml() {
  const apiUrl = process.env.REACT_APP_API_URL
  if (!apiUrl) {
    throw new Error("VITE_API_URL is not defined in .env file")
  }

  const data = await axios
    .get<string>(`${apiUrl}swagger.yaml`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error downloading swagger.yaml:", error.message)
      throw error
    })

  const outputPath = "./swagger.yaml"

  fs.writeFileSync(outputPath, data)

  console.log(`swagger.yaml file downloaded successfully to ${outputPath}`)
}

downloadSwaggerYaml()

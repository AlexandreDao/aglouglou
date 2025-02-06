const fs = require('fs')
const path = require('path')

const gradlePath = path.join(__dirname, '../android/gradle.properties')

const gradleSettings = `
org.gradle.daemon=true
org.gradle.caching=true
org.gradle.parallel=true
`

if (fs.existsSync(gradlePath)) {
  fs.appendFileSync(gradlePath, gradleSettings)
  console.log('\x1b[32m✔\x1b[0m Gradle properties updated!')
} else {
  console.log('\x1b[31m✖\x1b[0m Gradle properties file not found. Run `expo prebuild` first.')
}

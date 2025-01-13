import app from './app'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    app.listen(5000, () => {
      console.log(`My app is listening on port ${5000}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
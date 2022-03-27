const fs = require('fs')

let script = 'INSERT INTO caracteristicas (date, value, paciente_cpf, tipo_caracteristica_id) VALUES\n'

const filesPaths = ['./data/ind_card', './data/ind_pulm']

Promise.all(filesPaths.map(filesPath => {
  return new Promise((resolve, reject) => {
    fs.readdir(filesPath, (err, files) => {
      if (err) return reject(err)
      resolve(files)
    })
  }).then(files => {
    return Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        fs.readFile(`${filesPath}/${file}`, 'utf-8', (err, data) => {
          if (err) reject(err)

          const characteristics = []

          const rows = data.split('\n')

          rows.pop()
          const firstLine = rows.shift()
          const charType = firstLine.replace(/ +/g, ' ').split(' ')[2]

          const charTypeId = charType.includes('ind_card') ? 1 : 2

          rows.forEach(row => {
            const [cpf, epoc, ind] = row.split(' ')

            const characteristic = {
              cpf,
              epoc,
              ind
            }

            characteristics.push(characteristic)
          })

          characteristics.forEach(characteristic => {
            script += `(to_timestamp(${characteristic.epoc}), ${+characteristic.ind}, '${characteristic.cpf.match(/\d/g).join('')}', ${charTypeId}),\n`
          })

          resolve()
        })
      })
    }))
  })
})).then(() => {
  fs.writeFile('./output/characteristic_insert.sql', script, (err) => {
    if (err) console.error(err)
    console.log('Characteristics sql created')
  })
})

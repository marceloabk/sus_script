const fs = require('fs')
const path = require('path')
const expat = require('node-expat')
const json2csv = require('json2csv').parse;
const fields = ['ID', 'UF', 'Hipertensao', 'Diabetes', 'Asma', 'Total'];
const opts = { fields };


const xml_dir_path = path.join(__dirname, 'xml')

const NUMBER_OF_FILES = 1

let data = [
  {
    'ID': '11',
    'UF': 'RO',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '12',
    'UF': 'AC',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '13',
    'UF': 'AM',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '14',
    'UF': 'RR',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '15',
    'UF': 'PA',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '16',
    'UF': 'AP',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '17',
    'UF': 'TO',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '21',
    'UF': 'MA',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '22',
    'UF': 'PI',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '23',
    'UF': 'CE',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '24',
    'UF': 'RN',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '25',
    'UF': 'PB',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '26',
    'UF': 'PE',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '27',
    'UF': 'AL',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '28',
    'UF': 'SE',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '29',
    'UF': 'BA',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '31',
    'UF': 'MG',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '32',
    'UF': 'ES',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '33',
    'UF': 'RJ',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '35',
    'UF': 'SP',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '41',
    'UF': 'PR',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '42',
    'UF': 'SC',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '43',
    'UF': 'RS',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '50',
    'UF': 'MS',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '51',
    'UF': 'MT',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '52',
    'UF': 'GO',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  },
  {
    'ID': '53',
    'UF': 'DF',
    'Hipertensao': 0,
    'Diabetes': 0,
    'Asma': 0,
    'Total': 0
  }
]

function readDir(path, options, callback) {
  fs.readdir(path, options, (err_dir, result) => {
    if (err_dir)
      console.log(err_dir)

    let checker = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i].includes('.xml')) {
        const parser = new expat.Parser('UTF-8')
        const xml_file_path = xml_dir_path + '/' + result[i]

        let diag_flag = false
        let state_flag = false
        let current_state = undefined
        parser.on('startElement', function (name, attrs) {
          if (name === 'DIAG_PRINC' || name === 'DIAG_SECUN') {
              diag_flag = true
          } else if (name === 'UF_ZI') {
              state_flag = true
          }
        })

        parser.on('text', function (text) {
          if (diag_flag) {
            diag_flag = false
            // 1 - hipertensão, 2 - diabetes, 3 - asma
            let disease = undefined
            if (text.includes('I10') || text.includes('I11') || text.includes('I12') || text.includes('I13') || text.includes('I15')) {
              // hipertensão
              // https://iclinic.com.br/cid/capitulo/9/grupo/95/

              disease = 1
            } else if (text.includes('E10') || text.includes('E11') || text.includes('E12') || text.includes('E13') || text.includes('E14')) {
              // diabetes
              // https://iclinic.com.br/cid/capitulo/4/grupo/49/

              disease = 2
            } else if (text.includes('J45') || text.includes('J46')) {
              // asma
              // https://iclinic.com.br/cid/capitulo/10/grupo/107/categoria/743/
              // https://iclinic.com.br/cid/capitulo/10/grupo/107/

              disease = 3
            }

            if (disease !== undefined) {
              for (let i = 0; i < data.length; i++) {
                if (current_state === data[i].ID) {
                  if (disease === 1) {
                    data[i]['Hipertensao']++
                  } else if (disease === 2) {
                    data[i]['Diabetes']++
                  } else if (disease === 3) {
                    data[i]['Asma']++
                  }
                  data[i]['Total']++
                  break
                }
              }
            }
          } else if (state_flag) {
            state_flag = false
            current_state = text[0] + text[1]
          }
        })

        parser.on('error', function (error) {
          console.error(error)
        })

        parser.on('endElement', function (name) {
          if (name === 'Tabela') {
            checker++
            console.log(checker)
            if (checker === NUMBER_OF_FILES) {
              console.log('Finished')
              const csv = json2csv(data, opts);

              fs.writeFile(__dirname + '/parsed_data.csv', csv, 'utf8', function (err_csv) {
                if (err_csv)
                  console.log(err_csv)
              })
            }
          }
        })

        fs.createReadStream(xml_file_path).pipe(parser)
      }
    }
  })
}


readDir(xml_dir_path, 'utf8')

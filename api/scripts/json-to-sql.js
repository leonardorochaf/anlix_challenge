const fs = require('fs')

const patients = require('./data/pacientes/pacientes.json')

let sqlCcript = 'INSERT INTO pacientes (nome,idade,cpf,rg,data_nasc,sexo,signo,mae,pai,email,senha,cep,endereco,numero,bairro,cidade,estado,telefone_fixo,celular,altura,peso,tipo_sanguineo,cor) VALUES\n'

patients.forEach(patient => {
  sqlCcript += `('${patient.nome}', ${patient.idade}, '${patient.cpf.match(/\d/g).join('')}', '${patient.rg.match(/\d/g).join('')}', '${patient.data_nasc.replace(/\//g, '-')}', '${patient.sexo}', '${patient.signo}', '${patient.mae}', '${patient.pai}', '${patient.email}', '${patient.senha}', '${patient.cep.match(/\d/g).join('')}', '${patient.endereco}', ${patient.numero}, '${patient.bairro}', '${patient.cidade}','${patient.estado}', '${patient.telefone_fixo.match(/\d/g).join('')}', '${patient.celular.match(/\d/g).join('')}', '${patient.altura}', '${patient.peso}', '${patient.tipo_sanguineo}', '${patient.cor}'),\n`
})

fs.writeFile('./output/patients_insert.sql', sqlCcript, (err) => {
  if (err) console.error(err)
  console.log('Patients sql created')
})

const fs = require('fs');
const sharp = require('sharp');
require('dotenv').config();

exports.compressImage = (file, size) => {
  const newPath = `${file.path.split('.')[0]}.webp`;

  return sharp(file.path)
    .resize(size)
    .toFormat('webp')
    .webp({
      quality: 80,
    })
    .toBuffer()
    .then((data) => {
      if (process.env.STORAGE_TYPE === 'local') {
        // Deletando o arquivo antigo
        // O fs.acess serve para testar se o arquivo realmente existe, evitando bugs
        fs.access(file.path, (err) => {
          // Um erro significa que a o arquivo não existe, então não tentamos apagar
          if (!err) {
            // Se não houve erros, tentamos apagar
            fs.unlink(file.path, (_err) => {
              console.log(_err);
              // Não quero que erros aqui parem todo o sistema,
              // então só vou imprimir o erro, sem throw.
              if (err) console.log(err);
            });
          }
        });

        // Agora vamos armazenar esse buffer no novo caminho
        fs.writeFile(newPath, data, (err) => {
          if (err) {
            // Já aqui um erro significa que o upload falhou,
            // então é importante que o usuário saiba.
            throw err;
          }
        });
      } else if (process.env.STORAGE_TYPE === 's3') {
        return 's3';
      }

      // Se o código chegou até aqui, deu tudo certo, então vamos retornar o novo caminho
      return newPath;
    });
};

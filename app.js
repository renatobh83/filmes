$(document).ready(function() {
  $('#fileInput').change(handleFileSelect);
});

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const content = e.target.result;
      displayM3UContent(content);
    };

    reader.readAsText(file);
  }
}
function displayM3UContent(content) {
  const lines = content.split('\n');
  const outputContainer = $('#output');
  outputContainer.empty();

  let inTVLogoSection = false;
  let currentLogoURL = '';
  let currentVideoURL = '';
  let currentTitle = '';

  lines.forEach(function(line, index) {
    if (line.startsWith('#EXTM3U')) {
      inTVLogoSection = false;
      currentLogoURL = '';
      currentVideoURL = '';
      currentTitle = '';
    }

    if (line.startsWith('#EXTINF')) {
      inTVLogoSection = true;
      currentLogoURL = extractLogoURL(line);
      currentTitle = extractTitle(line);
      // O URL do vídeo não está diretamente abaixo da #EXTINF, vamos procurar nas linhas seguintes.
      for (let i = index + 1; i < lines.length; i++) {
        if (lines[i].trim() !== '') {
          currentVideoURL = lines[i].trim();
          break;
        }
      }
    }

    if (inTVLogoSection && currentLogoURL && currentVideoURL) {
      const anchor = $('<a>').attr('href', currentVideoURL).addClass('video-link').attr('target', '_blank');;
      const image = $('<img>').attr('src', currentLogoURL).addClass('logo-image');
      const title = $('<p>').text(currentTitle).addClass('video-title');
      anchor.append(image);
      anchor.append(title);
      outputContainer.append(anchor);
      inTVLogoSection = false; // Resetar para próxima entrada
    }
  });
}

function extractLogoURL(line) {
  const match = line.match(/tvg-logo="(.*?)"/);
  return match ? match[1] : null;
}

function extractTitle(line) {
  const match = line.match(/tvg-name="(.*?)"/);
  return match ? match[1] : null;
}
// function displayM3UContent(content) {
//   const lines = content.split('\n');
//   const outputContainer = $('#output');
//   outputContainer.empty();

//   let inTVLogoSection = false;
//   let currentVideoURL = '';

//   lines.forEach(function(line) {
//     if (line.startsWith('#EXTM3U')) {
//       inTVLogoSection = false;
//       currentVideoURL = ''; // Limpa o URL do vídeo ao encontrar uma nova playlist
//     }

//     if (line.startsWith('#EXTINF')) {
//       inTVLogoSection = true;
//       const logoURL = extractLogoURL(line);
//       currentVideoURL = extractVideoURL(line);
//       console.log(line)
//       if (logoURL && currentVideoURL) {
//         const anchor = $('<a>').attr('href', '#').addClass('video-link').click(function(event) {
//           event.preventDefault(); // Evita a ação padrão do clique
//           // Adicione aqui a lógica para iniciar o vídeo com o URL correspondente
//           console.log('Iniciar vídeo: ' + currentVideoURL);
//         });

//         const image = $('<img>').attr('src', logoURL).addClass('logo-image');
//         anchor.append(image);
//         outputContainer.append(anchor);
//       }
//     }

//     if (inTVLogoSection) {
//       // Processa a seção de logotipo de TV, se necessário
//     }
//   });
// }

// function extractLogoURL(line) {
//   const match = line.match(/tvg-logo="(.*?)"/);
//   return match ? match[1] : null;
// }

// function extractVideoURL(line) {
//   const match = line.match(/,(.*?)$/);
//   return match ? match[1] : null;
// }
// function displayM3UContent(content) {
//   const lines = content.split('\n');
//   const outputContainer = $('#output');
//   outputContainer.empty();

//   let inTVLogoSection = false;
//   let currentVideoURL = '';

//   lines.forEach(function(line) {
//     if (line.startsWith('#EXTM3U')) {
//       inTVLogoSection = false;
//       currentVideoURL = ''; // Limpa o URL do vídeo ao encontrar uma nova playlist
//     }

//     if (line.startsWith('#EXTINF')) {
//       inTVLogoSection = true;
//       print(line)
//       const logoURL = extractLogoURL(line);
//       const videoURL = extractVideoURL(line);

//       if (logoURL) {
//         const anchor = $('<a>').attr('href', '#').addClass('video-link').click(function(event) {
//           event.preventDefault(); // Evita a ação padrão do clique
//           // Adicione aqui a lógica para iniciar o vídeo com o URL correspondente
//           console.log('Iniciar vídeo: ' + videoURL);
//         });

//         const image = $('<img>').attr('src', logoURL).addClass('logo-image');
//         anchor.append(image);
//         outputContainer.append(anchor);
//       }
//     }

//     if (inTVLogoSection) {
//       // Processa a seção de logotipo de TV, se necessário
//     }
//   });
// }

// function extractLogoURL(line) {
//   const match = line.match(/tvg-logo="(.*?)"/);
//   return match ? match[1] : null;
// }

// function extractVideoURL(line) {
//   // Implemente a lógica para extrair o URL do vídeo, dependendo do formato real no arquivo M3U
//   // Por exemplo, você pode usar uma expressão regular ou outra abordagem dependendo do formato específico.
//   // A função atual é apenas um exemplo e pode não se aplicar ao seu caso real.
//   const match = line.match(/,(.*?)$/);
//   return match ? match[1] : null;
// }

// $(document).ready(function() {
//   $('#fileInput').change(handleFileSelect);
// });

// function handleFileSelect(event) {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = function(e) {
//       const content = e.target.result;
//       displayM3UContent(content);
//     };

//     reader.readAsText(file);
//   }
// }

// function displayM3UContent(content) {
//   const lines = content.split('\n');
//   const outputContainer = $('#output');
//   outputContainer.empty();

//   lines.forEach(function(line) {
//     outputContainer.append($('<p>').text(line));
//   });
// }
// $(document).ready(function() {
//     $('#fileInput').change(handleFileSelect);
//   });
  
//   function handleFileSelect(event) {
//     const file = event.target.files[0];
  
//     if (file) {
//       const reader = new FileReader();
  
//       reader.onload = function(e) {
//         const content = e.target.result;
//         displayM3UContent(content);
//       };
  
//       reader.readAsText(file);
//     }
//   }
  
  // function displayM3UContent(content) {
  //   const lines = content.split('\n');
  //   const outputContainer = $('#output');
  //   outputContainer.empty();
  
  //   let inTVLogoSection = false;
  
  //   lines.forEach(function(line) {
  //     if (line.startsWith('#EXTM3U')) {
  //       inTVLogoSection = false; // Reset when encountering a new playlist
  //     }
  
  //     if (line.startsWith('#EXTINF')) {
  //       inTVLogoSection = true;
  //       const logoURL = extractLogoURL(line);
  //       if (logoURL) {
  //         outputContainer.append($('<img>').attr('src', logoURL).addClass('logo-image'));
  //       }
  //     }
  //     if (inTVLogoSection) {
  //       // Process the TV Logo section
  //     } else {
  //       // outputContainer.append($('<p>').text(line));
  //     }
  //   });
  // }
  
  // function extractLogoURL(line) {
  //   // Implement your logic to extract the logo URL from the line
  //   // This will depend on the actual structure of your M3U file
  //   // For example, if the logo URL is within parentheses, you can use regex to extract it.
  //   // const match = line.match(/\((.*?)\)/);
  //   const match = line.match(/tvg-logo="(.*?)"/);
  //   return match ? match[1] : null;
  // }
  

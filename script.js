function formatarData(data) {
    const partes = data.split('-'); // Supondo que a data esteja no formato yyyy-mm-dd
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna no formato dd/mm/aaaa
}

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4'); // Formato A4, orientação retrato
    const autoTable = window.jspdf.autoTable;

    // Dados coletados do formulário
    const cliente = document.getElementById('cliente').value;
    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;
    const chassi = document.getElementById('chassi').value;

    const numInstalacao = document.getElementById('num_instalacao').value;
    const marcaInstalacao = document.getElementById('marca_instalacao').value;
    const dataInstalacao = formatarData(document.getElementById('data_instalacao').value); // Formata a data
    const osPecasInstalacao = document.getElementById('os_pecas_instalacao').value;
    const osServicosInstalacao = document.getElementById('os_servicos_instalacao').value;
    const kmInstalacao = document.getElementById('km_instalacao').value;

    const numSubstituicao = document.getElementById('num_substituicao').value;
    const marcaSubstituicao = document.getElementById('marca_substituicao').value;
    const dataSubstituicao = formatarData(document.getElementById('data_substituicao').value); // Formata a data
    const osPecasSubstituicao = document.getElementById('os_pecas_substituicao').value;
    const osServicosSubstituicao = document.getElementById('os_servicos_substituicao').value;
    const kmSubstituicao = document.getElementById('km_substituicao').value;

    const problema = document.getElementById('problema').value;

    // Cabeçalho do PDF
    doc.setFontSize(18);
    doc.text('RELATÓRIO PARA GARANTIA', 20, 20);

    // Tabela - Dados do Cliente
    doc.setFontSize(12);
    doc.text('Dados do Cliente', 20, 30);
    doc.autoTable({
        startY: 35,
        margin: { left: 20, right: 20 },
        head: [['Campo', 'Informação']],
        body: [
            ['Cliente', cliente],
            ['Placa', placa],
            ['Modelo do Caminhão', modelo],
            ['Chassi', chassi]
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 1 } // Reduzir a altura dos campos
    });

    // Problema da Peça
    doc.text('Problema da Peça', 20, doc.lastAutoTable.finalY + 10); // Subir a seção Problema da Peça
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 15,
        margin: { left: 20, right: 20 },
        head: [['Descrição']],
        body: [[problema]],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 1 } // Reduzir a altura dos campos
    });

    // Tabelas de Instalação e Substituição lado a lado (metade da página)
    const marginLeftCol1 = 20;  // Margem esquerda para Instalação
    const marginLeftCol2 = 110; // Margem esquerda para Substituição

    // Instalação
    doc.setFontSize(12);
    doc.text('Instalação', marginLeftCol1, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        margin: { left: marginLeftCol1 },
        head: [['Campo', 'Informação']],
        body: [
            ['Número (Interno)', numInstalacao],
            ['Marca', marcaInstalacao],
            ['Data', dataInstalacao], // Data formatada
            ['OS Peças', osPecasInstalacao],
            ['OS Serviços', osServicosInstalacao],
            ['KM', kmInstalacao]
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 1 }, // Reduzir a altura dos campos
        tableWidth: 80 // Metade da largura da página
    });

    // Substituição
    doc.setFontSize(12);
    doc.text('Substituição', marginLeftCol2, doc.lastAutoTable.finalY - 46.5); // Ajustado para alinhar
    doc.autoTable({
        startY: doc.lastAutoTable.finalY - 42.5, // Ajuste para alinhar com a tabela de Instalação
        margin: { left: marginLeftCol2 },
        head: [['Campo', 'Informação']],
        body: [
            ['Número (Interno)', numSubstituicao],
            ['Marca', marcaSubstituicao],
            ['Data', dataSubstituicao], // Data formatada
            ['OS Peças', osPecasSubstituicao],
            ['OS Serviços', osServicosSubstituicao],
            ['KM', kmSubstituicao]
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 1 }, // Reduzir a altura dos campos
        tableWidth: 80
    });

    // Gera o PDF
    doc.save('garantia_otimizada.pdf');
}

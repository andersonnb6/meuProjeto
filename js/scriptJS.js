
function validarDNA(seq) {
	for (i = 0; i <= seq.length-1; i++){
		if (seq[i] == 'A' | seq[i] == 'T' | seq[i] == 'C' | seq[i] == 'G' | seq[i] == '-') {
			return true
		} else {
			return false
			break
		}
	}
}

function capturarTexto() {
 var texto = document.getElementById("input_textarea").value
 return texto
}

function retornarResultado(resultado) {
	document.getElementById("output_textarea").value = resultado
}

function formatarTexto() {

}


/* Ações dos botões na página */

function limparInputTextArea() {
    document.getElementById("input_textarea").value = ''
}

function limparOutputTextArea() {
    document.getElementById("output_textarea").value = ''
}

function exemploFastaDNA() {
    limparInputTextArea()
    document.getElementById("input_textarea").value = ">sequencia modelo 1\nATCGATCGATCGATCGATCGATCG\n\n>sequencia modelo 2\natcgatcgatcgatcgatcgatcg"
}

function exemploFastaRNA() {
    limparInputTextArea()
    document.getElementById("input_textarea").value = ">seq_rna\nAUGGCUAACCGUCGUAUAUUAUUAUAG"
}

function exemploFastaDNA_RNA_Proteina() {
    limparInputTextArea()
    document.getElementById("input_textarea").value = ">seq_dna\nATCGATCGATCGATCGATCGATCG\n\n>seq_rna\nACUGCGAUGCUAUAUACGUC\n\n>seq_proteina\nMTLEALAIWS"
}




/* Funções que recebem apenas uma sequencia como input */

function totalAdenina(seq) {
	var total_A = 0
	
	for (var i = 0; i <= seq.length - 1; i++){
		if (seq[i] == 'A'){
			total_A++
		} else {
			/*Nada*/
		}
	}
	return total_A
}

function totalTimina(seq) {
	var total_T = 0
	
	for (var i = 0; i <= seq.length - 1; i++){
		if (seq[i] == 'T'){
			total_T++
		} else {
			/*Nada*/
		}
	}
	return total_T
}

function totalCitosina(seq) {
	var total_C = 0
	
	for (var i = 0; i <= seq.length - 1; i++){
		if (seq[i] == 'C'){
			total_C++
		} else {
			/*Nada*/
		}
	}
	return total_C
}

function totalGuanina(seq) {
	var total_G = 0
	
	for (var i = 0; i <= seq.length - 1; i++){
		if (seq[i] == 'G'){
			total_G++
		} else {
			/*Nada*/
		}
	}
	return total_G
}

function porcentagemAT(seq) {
	calc = ((totalTimina(seq) + totalAdenina(seq))/seq.length)*100
	return calc
}

function porcentagemGC(seq) {
	calc = ((totalGuanina(seq) + totalCitosina(seq))/seq.length)*100
	return calc
}

function complementarDNA(seq) {
	seq_comp = []
	for (var i = 0; i <= seq.length; i++){
		if (seq[i] == 'A'){
			seq_comp.push('T')
		} else if (seq[i] == 'T'){
			seq_comp.push('A')
		} else if (seq[i] == 'C'){
			seq_comp.push('G')
		} else if (seq[i] == 'G'){
			seq_comp.push('C')
		} else {
			/* Nada */
		}
	}
	return seq_comp.join('')
}

function transcreverDNA(seq) {
    seq = seq.replace(/T/g, 'U')
    seq = seq.replace(/t/g, 'u')
    return seq
}

function reverterSequencia(seq) {
	seq_reverse = seq.split('').reverse().join('')
	return seq_reverse
}

function reversoComplementoDNA(seq) {
	rev_comp = reverterSequencia(complementarDNA(seq))
	return rev_comp
}

function traduzirRNA(seq) {
	var dicionario_codons = {
	'UUU':'F',	'UCU':'S',	'UAU':'Y',	'UGU':'C',
	'UUC':'F',	'UCC':'S',	'UAC':'Y',	'UGC':'C',
	'UUA':'L',	'UCA':'S',	'UAA':'*',	'UGA':'*',
	'UUG':'L',	'UCG':'S',	'UAG':'*',	'UGG':'W',
	'CUU':'L',	'CCU':'P',	'CAU':'H',	'CGU':'R',
	'CUC':'L',	'CCC':'P',	'CAC':'H',	'CGC':'R',
	'CUA':'L',	'CCA':'P',	'CAA':'Q',	'CGA':'R',
	'CUG':'L',	'CCG':'P',	'CAG':'Q',	'CGG':'R',
	'AUU':'I',	'ACU':'T',	'AAU':'N',	'AGU':'S',
	'AUC':'I',	'ACC':'T',	'AAC':'N',	'AGC':'S',
	'AUA':'I',	'ACA':'T',	'AAA':'K',	'AGA':'R',
	'AUG':'M',	'ACG':'T',	'AAG':'K',	'AGG':'R',
	'GUU':'V',	'GCU':'A',	'GAU':'D',	'GGU':'G',
	'GUC':'V',	'GCC':'A',	'GAC':'D',	'GGC':'G',
	'GUA':'V',	'GCA':'A',	'GAA':'E',	'GGA':'G',
	'GUG':'V',	'GCG':'A',	'GAG':'E',	'GGG':'G'
	}

	seq = seq.match(/.{1,3}/g)
	protein = []
	for (var i = 0; i <= seq.length - 1; i++) {
		aminoacido = dicionario_codons[seq[i]]
		protein.push(aminoacido)
	}
	protein = protein.join('')
	return protein
}


/* Validação de Sequencias e captura de sequencias e rótulos*/

function identificarFasta() {
	texto = capturarTexto()
	pt = false
	for (var i = 0; i <= texto.length - 1; i++){
		if (texto[i] == '>'){
			pt = true
			break
		} else {
			pt = false
		}
	}
	return pt
}

function validarInput(){
	pt = false

	/* Verifica se texto tem o símbolo '>' para sinalizas um fasta*/
	if (identificarFasta() == true) {

		/* Verifica se o número de rótulos e sequencias são iguais */
		if (rotulosFasta().length == sequenciasFasta().length) {
			
			/* Valida se: apresenta '>'; se o número de rótulos e sequências são iguais;
				     e se não existem símbolos diferentes de DNA */
			if (validarSequenciasDNA() == true) {
				pt = true
			} else {
				pt = false
				window.alert("Sequencia Inválida: caracteres diferentes de ATCG-")
			}
		} else {
			/* Se for um fasta mas o numero de rotulos e sequencias são diferentes*/
			pt = false
			window.alert("Números de rótulos e sequencias não são iguais!")
		}
	} else {

		/* Caso não tenha '>' no texto */
		if (validarSequenciasDNA() == true) {
			/* Sequencias que apresentam caracteres de acordo com DNA*/
			pt = true
		} else {
			/* Sequencias que NÃO apresentam caracteres de acordo com DNA*/
			pt = false
			window.alert("Sequencia Inválida: caracteres diferentes de ATCG-")
		}
	}
	return pt
}

function validarSequenciasDNA() {
	// pt será verdadeiro enquanto os caracteres das sequencias não forem diferentes de ATCG-
	pt = true

	// array com sequencias
	sequencias = sequenciasFasta()

	// loop para trocar as sequencias
	for (var e = 0; e <= sequencias.length-1; e++) {
		
		// variavel contendo a sequencia da vez
		seq  = sequencias[e]

		if (pt == true) {
			// loop para testar cada caractere da sequencia
			for (var i = 0; i <= seq.length-2; i++){
				if (seq[i] == 'A' | seq[i] == 'T' | seq[i] == 'C' | seq[i] == 'G' | seq[i] == '-'){
					pt = true
				} else {
					pt = false
					break
				}
			}
		} else {
			pt = false
			break
		}
	}
	// Retorna true/false sobre a presença de caracteres diferentes de ATCG-
	return pt
}

function rotulosFasta(){
	// capturando todo o texto Input
	texto = capturarTexto()
	texto = texto.split('\n')

	// Loop para criar array com rotulos iniciando com '>'
	identificador = []
	for (var i =0; i <= texto.length - 1; i++) {
		if (texto[i][0] == '>'){
			identificador.push(texto[i])
		}
	}
	// Retorna um array contendo os rótulos de todas as sequencias
	return identificador
}

function sequenciasFasta(){
	// Capturando todo o texto Input e convertendo em maiúsculo
	texto = capturarTexto().toUpperCase()
	texto = texto.split('\n')

	// Loop para criar array com todas as sequencias
	sequencias = []
	for (var i =0; i <= texto.length - 1; i++) {
		if (texto[i][0] == '>'){
			// Ignora linha com identificador
		} else if (texto[i].length <= 0) {
			// Ignora linha vazias */
		} else {
			sequencias.push(texto[i])
		}
	}

	// Retorna um array com todas as sequencias
	return sequencias
}

/* Funções que usam as funções acima sobre muitas sequencias */

function executar_reverso(){
	rotulos = rotulosFasta()
	sequencias = sequenciasFasta()
	result = []
	for (var i = 0; i <= sequencias.length - 1; i++){
		result.push(rotulos[i])
		result.push(reverterSequencia(sequencias[i]))
	}
	result = result.join('\n').replace(/\n\n/g,'\n')
	retornarResultado(result)
}

function executar_transcricao(){
	if (validarInput() == true) {
		rotulos = rotulosFasta()
		sequencias = sequenciasFasta()
		result = []
		for (var i = 0; i <= sequencias.length - 1; i++){
			result.push(rotulos[i])
			result.push(transcreverDNA(sequencias[i]))
		}
		result = result.join('\n').replace(/\n\n/g,'\n')
		retornarResultado(result)
	} else {
		/* Alerta será dado pelo método de validação */
	}
}

function executar_TranscricaoReversa(){
	if (validarInput() == true) {
		rotulos = rotulosFasta()
		sequencias = sequenciasFasta()
		result = []
		for (var i = 0; i <= sequencias.length - 1; i++){
			result.push(rotulos[i])
			result.push(reverterSequencia(transcreverDNA(sequencias[i])))
		}
		result = result.join('\n').replace(/\n\n/g,'\n')
		retornarResultado(result)
	} else {
		/* Alerta será dado pelo método de validação */
	}
}

function executar_complemento(){
	if (validarInput() == true) {
		rotulos = rotulosFasta()
		sequencias = sequenciasFasta()
		result = []
		for (var i = 0; i <= sequencias.length - 1; i++){
			result.push(rotulos[i])
			result.push(complementarDNA(sequencias[i]))
		}
		result = result.join('\n').replace(/\n\n/g,'\n')
		retornarResultado(result)
	}
}

function executar_ReversoComplemento(){
	if (validarInput() == true) {
		rotulos = rotulosFasta()
		sequencias = sequenciasFasta()
		result = []
		for (var i = 0; i <= sequencias.length - 1; i++){
			result.push(rotulos[i])
			result.push(reversoComplementoDNA(sequencias[i]))
		}
		result = result.join('\n').replace(/\n\n/g,'\n')
		retornarResultado(result)
	}
}

function executar_traducao(){
	rotulos = rotulosFasta()
	sequencias = sequenciasFasta()
	result = []
	for (var i = 0; i <= sequencias.length - 1; i++){
		result.push(rotulos[i])
		result.push(traduzirRNA(sequencias[i]))
	}
	result = result.join('\n').replace(/\n\n/g,'\n')
	retornarResultado(result)
}
































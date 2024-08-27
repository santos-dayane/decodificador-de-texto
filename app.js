const textInput = document.querySelector(".input__area");
const textOutput = document.querySelector(".output__area");


async function copiarTexto() {    
    await navigator.clipboard.writeText(textOutput.value);
    textInput.value = textOutput.value;
    textOutput.value = "";
    alert("Texto copiado com sucesso! 😊");
    ajustarGap()
    elementosLayout();
}


function acentosCaracteres(str){
   const textModificado = str.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
   textInput.value = textModificado;
}


function buttonCriptografar() {
    const textoCriptografado = criptografar(textInput.value.trim());
    if (textInput.value.trim() ==""){
        alert("Por favor, informe o texto desejado!");
    }  

    Object.assign(textOutput, { value: textoCriptografado });
    Object.assign(textInput, { value: "" });
    
    ajustarGap()
    elementosLayout(); 
}


function criptografar(textoCriptografado) {
    const matrizCriptografia = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
    ];

    textoCriptografado = textoCriptografado.toLowerCase();   

    for (let i = 0; i < matrizCriptografia.length; i++){
        if (textoCriptografado.includes(matrizCriptografia[i][0])) {
            textoCriptografado = textoCriptografado.replaceAll(matrizCriptografia[i][0], matrizCriptografia[i][1]);
        }
    }
    return textoCriptografado;
}


function buttonDescriptografar() {
    if (textOutput.value.trim() !== "" && textInput.value.trim() === "") {
        alert("Copie primeiro a mensagem a ser descriptografada.");
        return;
    }
    
    const textoOriginal = textInput.value.trim();
    const textoDescriptografado = descriptografar(textoOriginal);

    if (textoOriginal === "" && textOutput.value.trim() === "") {
        alert("Por favor, informe o texto desejado!");
        return;
    }
    
    if (textoOriginal !== textoDescriptografado) {
        Object.assign(textOutput, {value: textoDescriptografado});
    } else {
        alert("O texto se encontra em seu formato original.");
    }

    Object.assign(textInput, {value: ""});

    ajustarGap();
    elementosLayout();
}

function descriptografar(textoDescriptografado) {
    const matrizCriptografia = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];

    textoDescriptografado = textoDescriptografado.toLowerCase();

    for (let i = 0; i < matrizCriptografia.length; i++){
        if (textoDescriptografado.includes(matrizCriptografia[i][1])) {
            textoDescriptografado = textoDescriptografado.replaceAll(matrizCriptografia[i][1], matrizCriptografia[i][0]);
        }
    }

    return textoDescriptografado;
}


function ajustarGap(){
    const larguraTela = window.innerWidth;
    const sectionOutput = document.querySelector(".section__output");

    if (larguraTela <= 1340 && textOutput.value != ""){
        sectionOutput.style.gap = "120px";
    } else{
        sectionOutput.style.gap = "";
    }
}


function elementosLayout() {
    if (textOutput.value != "") {
        document.getElementById("button-copy").style.visibility = "visible";
        document.querySelectorAll(".output__mensagem, .output__texto, .output__imagem").forEach(element => {
            element.style.visibility = "hidden"; });   
    } else {
        document.querySelectorAll('.output__mensagem, .output__texto, .output__imagem').forEach(element => {
            element.style.visibility = "visible"; });
            document.getElementById("button-copy").style.visibility = "hidden";
    }  
}  

window.addEventListener('resize', ajustarGap);




































/*
copiarButton.addEventListener('click', async function () {
    textOutput.select();
    await navigator.clipboard.writeText();
    textInput.value = textOutput.value;
    textOutput.value = "";

    if(textOutput === "") {
        document.querySelectorAll('.output__mensagem, .output__texto').forEach(element => {
            element.style.visibility = "visible";
        });
  
        document.querySelectorAll('.output__imagem').forEach(element => {
            element.style.visibility = "visible";
        });

        document.querySelectorAll(".output__buttonCopiar").forEach(element => {
            element.style.visibility = "hidden";
        });
    }
    
});

*/

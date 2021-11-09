(function () {
  "use strict";

  //atalho para obter elementos
  var el = function (element) {
    if (element.charAt(0) === "#") { //Se passado um ID...
      return document.querySelector(element); // ...Retorna um único elemento
    }

    return document.querySelectorAll(element); // Caso contrário, retorna uma lista de nós
  };

  //Variáveis
  var viewer = el("#viewer"), //Tela da calculadora onde o resultado é exibido
    equals = el("#equals"), //Botão igual
    nums = el(".num"), //lista de números
    ops = el(".ops"), //lista de operadores
    theNum = "", //Número atual
    oldNum = "", //Primeiro número
    resultNum, //Resultado
    operator;  //Batman

  // Quando: Número é clicado. Obtenha o número atual selecionado
  var setNum = function () {
    if (resultNum) { //Se um resultado foi exibido, redefina o número
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { //Caso contrário, adicione o dígito ao número anterior (esta é uma string!)
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; //Exibit o número atual
  };

  var moveNum = function () {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "") //Redefinir o resultado em atr
  };

  // Quando: igual a é clicado. Calcular o resultado
  var displayNum = function () {

    // Converte a entrada da string em números
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Executar operação
    switch (operator) {
      case "Adição":
        resultNum = oldNum + theNum;
        break;

      case "Subtração":
        resultNum = oldNum - theNum;
        break;

      case "Multiplicação":
        resultNum = oldNum * theNum;
        break;

      case "Divisão":
        resultNum = oldNum / theNum;
        break;

      // Se igual for pressionado sem um operador, mantenha o número e continue
      default:
        resultNum = theNum;
    }


    // Se NaN ou Infinity retornou
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { //Se o resultado não for um número; acionado por, por exemplo, operadores de duplo clique
        resultNum = "Você o quebrou!";
      } else { // Se o resultado for infinito, comece dividindo por zero
        resultNum = "Olha o que você fez!";
        el('#calculator').classList.add("broken"); //Calculadora de quebra
        el('#reset').classList.add("show"); // E mostra o botão de reset
      }
    }

    // Exibir o resultado, finalmente!
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Agora redefina oldNum e mantém o resultado
    oldNum = 0;
    theNum = resultNum;

  };

  // Quando: o botão Limpar é pressionado. Limpar tudo
  var clearAll = function () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* Os eventos de clique */

  //Adiciona o evento de Click nos números
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Adicionar evento de clique ao sinal de igual
  equals.onclick = displayNum;


  // Adicionar evento de clique ao botão limpar
  el("#clear").onclick = clearAll;

  // Adicionar evento de clique ao botão de reset
  el("#reset").onclick = function () {
    window.location = window.location;
  };

}());
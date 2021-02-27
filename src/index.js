import api from './../api/api.js'
import css from "./style.css"

 api.getCep("99700252").then((result) => {
  console.log(result)
 })

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.nome = ko.observable().extend({ 
        required:{
            params:true,
            message: 'Campo Obrigatório!'
    },
    minLength:{
        params:2,
        message: 'Caracteres insuficientes'
    },
    pattern:{
        params:"^[A-Za-zÀ-ú ']+$",
        message: 'Apenas letras'
    }}),

    this.Sobrenome  = ko.observable().extend({ 
        required:{
            params:true,
            message: 'Campo Obrigatório!'
    },
    minLength:{
        params:1,
        message: 'Caracteres insuficientes'
    },
    pattern:{
        params:"^[A-Za-zÀ-ú ']+$",
        message: 'Apenas letras'
    }}),
    
    this.Ddd  = ko.observable().extend({ 
        required:{
            params:true,
            message: 'Campo Obrigatório!'
    },
    minLength:{
        params:2,
        message: 'Caracteres insuficientes'
    },
    pattern:{
        params:"^[0-9]+$",
        message: 'Apenas Números'
    }}),

    this.Telefone = ko.observable().extend({  
    required:{
        params:true,
        message: 'Campo Obrigatório!'
    },
    minLength:{
        params:9,
        message: 'Caracteres insuficientes'
    },
    maxLength:{
        params:9,
        message: 'Caracteres Sobrando'
    },
    pattern:{
        params:"^[0-9]+$",
        message: 'Apenas Números'
    }}),

    this.cep = ko.observable().extend({ 
    required:{
        params:true,
        message: 'Campo Obrigatório!'
    },
    minLength:{
        params:8,
        message: 'Caracteres insuficientes'
    },
    maxLength:{
        params:8,
        message: 'Caracteres Sobrando'
    },
    pattern:{
        params:"^[0-9]+$",
        message: 'Apenas Números'
    }}),  
   


    this.Endereco  = ko.observable().extend({ 
    required:{
        params:true,
        message: 'Campo Obrigatório!'
    },
    pattern:{
        params:"^[A-Za-zÀ-ú 0-9 ']+$",
    }}),

    this.num  = ko.observable().extend({ 
    required:{
        params:true,
        message: 'Campo Obrigatório!'
    },
    pattern:{
        params:"^[0-9]+$",
        message: 'Apenas Números'
    }}),

    this.complemento = ko.observable()
    

    this.bairro  = ko.observable().extend({ 
    required:{
        params:true,
        message: 'Campo Obrigatório!'
    },
    pattern:{
        params:"^[A-Za-zÀ-ú 0-9 ']+$",
    }}),
        
    this.cidade  = ko.observable().extend({ 
        required:{
            params:true,
            message: 'Campo Obrigatório!'
        },
        pattern:{
            params:"^[A-Za-zÀ-ú 0-9 ']+$",
        }}),

    this.estado  = ko.observable().extend({ 
        required:{
            params:true,
            message: 'Campo Obrigatório!'
        }})


        this.fecha = ko.observable(true)
        this.fecha2 = ko.observable(true)
        this.fecha3 = ko.observable(false)
        this.fecha4 = ko.observable(false)

    this.buttonCep = function(){
        var cepAtual = appViewModel.cep();
        api.getCep(cepAtual).then((result) => {
            
            console.log(result);
            this.cidade(result.localidade);
            this.estado(result.uf);
            this.bairro(result.bairro);
            this.Endereco(result.logradouro);
            

           if(this.estado()!= ""){
                this.fecha4(false)
            }else{
                this.fecha4(true)
            }

            if(this.cidade()!= ""){
                this.fecha3(false)
            }else{
                this.fecha3(true)
            }

            if(this.bairro()!= ""){
                this.fecha2(false)
            }else{
                this.fecha2(true)
            }

            if(this.Endereco()!= ""){
                this.fecha(false)
            }else{
                this.fecha(true)
            } 


        })
    }

    this.botao = function(){
        this.Erros = ko.validation.group([this.nome, this.Sobrenome, this.Ddd, this.Telefone, this.cep, this.Endereco, 
            this.num, this.bairro, this.cidade, this.estado])
            if(this.Erros().length == 0){
                document.getElementById("botao-enviar").disabled = false;
                var engloba = { 
                    'bairro': this.bairro(),
                    'cidade': this.cidade(),
                    'estado': this.estado(),
                    'endereco': this.Endereco(),
                    'nome': this.nome(),
                    'sobrenome': this.Sobrenome(),
                    'ddd': this.Ddd(),
                    'telefone': this.Telefone(),
                    'cep': this.cep(),
                    'num': this.num(),
                    'complemento': this.complemento()
                }
                console.log(engloba)
            }else{
                document.getElementById("botao-enviar").setAttribute("disabled", "disabled");    
                
            }        
    }

 }  
    
    

    


 

const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel


appViewModel.isValid = ko.computed(function(){
        return ko.validatedObservable(appViewModel).isValid();
    })


// Activates knockout.js
ko.applyBindings(appViewModel)

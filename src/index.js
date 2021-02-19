import api from './../api/api.js'
import css from "./style.css"

// api.getCep("99700252").then((result) => {
//  console.log(result)
// })

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = ko.observable("Example")
    this.lastName = ko.observable("Example")
    this.firstName.extend({ required: true})
}

const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel

// Activates knockout.js
ko.applyBindings(appViewModel)

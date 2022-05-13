const usernameEl=document.querySelector('#username')
const emailEl=document.querySelector('#email')
const passwordEl=document.querySelector('#password')
const confirmPasswordEl=document.querySelector('#confirm-password')
const signUPEl=document.querySelector('#sign-up')
const confirmEL=document.querySelector('.confirm')
let usersDataArray=[]
let storedUsers=JSON.parse(localStorage.getItem('storedUsers'))
console.log(storedUsers)

// SIGBUP
signUPEl.addEventListener('click', function () {
  confirmEL.classList.remove('saved')
  if (storedUsers === null) {
    usernameElValue=usernameEl.value 
    emailElValue=emailEl.value
    passwordElValue=passwordEl.value
    confirmPasswordElValue=confirmPasswordEl.value
    let checkNullity= signupChecknullity(usernameElValue, emailElValue, passwordElValue, confirmPasswordElValue)

    if(checkNullity === false){
     if (confirmPassword(passwordElValue, confirmPasswordElValue)){
       storeData(usernameElValue, emailElValue, passwordElValue)
       emptyInput(usernameEl, emailEl, passwordEl, confirmPasswordEl,  confirmEL)

     }
    }
  }else{
    usersDataArray=storedUsers
    usernameElValue=usernameEl.value 
    emailElValue=emailEl.value
    passwordElValue=passwordEl.value
    confirmPasswordElValue=confirmPasswordEl.value
    let checkNullity= signupChecknullity(usernameElValue, emailElValue, passwordElValue, confirmPasswordElValue)

    if(checkNullity === false){
      let unique= emailCheck(usersDataArray, emailElValue)

      if (unique) {
        addWarning(emailEl)
        emailEl.value=""
        emailEl.placeholder="Email has been used"
        removeClass(emailEl)
      }else{
        if (confirmPassword(passwordElValue, confirmPasswordElValue)){
          storeData(usernameElValue, emailElValue, passwordElValue)
          emptyInput(usernameEl, emailEl, passwordEl, confirmPasswordEl, confirmEL)
   
        }
      }
    }
  }
  
})


//CALLED FUNCTIONS
function signupChecknullity(username, email, password, confirmPassword){
  if (username === "" || username === null) {
    addWarning(usernameEl)
    usernameEl.placeholder="Username must be entered"
    removeClass(usernameEl)
  }
  if (email === "" || email === null) {
    addWarning(emailEl)
    emailEl.placeholder="Email must be entered"
    removeClass(emailEl)
  }
  if (password === "" || password === null) {
    addWarning(passwordEl)
    passwordEl.placeholder="Password must be entered"
    removeClass(passwordEl)
  }
  if (confirmPassword === "" || confirmPassword === null) {
    addWarning(confirmPasswordEl)
    confirmPasswordEl.placeholder="Password must be entered"
    removeClass(confirmPasswordEl)
  }
 if (username !== "" && username !== null  && email !== "" && email !== null && password !== "" && password !== null && confirmPassword !== "" && confirmPassword !== null) {
   return false
 }
}

function confirmPassword(password, confirmPassword) {
 if(password === confirmPassword){
   return true
 }else{
  addError(confirmPasswordEl)
  confirmPasswordEl.value =""
  confirmPasswordEl.placeholder="Passwords must be the same"
  removeClass(confirmPasswordEl)
 } 
}

function storeData(username, email, password,) {
  let usersData= {
    username:username,
    email:email,
    password:password
  }
  usersDataArray.push(usersData)
  localStorage.setItem('storedUsers', JSON.stringify(usersDataArray))
  console.log(usersData)
  confirmEL.classList.add('saved')
}

function emailCheck(dataArr, email){
  for (let i = 0; i < dataArr.length; i++) {
    if(dataArr[i].email === email){
      return true
    }
    
  }

}

function removeClass(el) {
  el.addEventListener('click', function() {
    el.classList.remove('warning')
    el.classList.remove('error')
    el.placeholder=" "
  })
}

function emptyInput(username, email, password, confirmPassword, confirm){
  username.value=""
  email.value=""
  password.value=""
  confirmPassword.value=""
  setTimeout(function() {
    confirm.classList.remove('saved')
  }, 10000)
}

function addWarning(el) {
  el.classList.add('warning')  
}

function addError(el) {
  el.classList.add('error')
}
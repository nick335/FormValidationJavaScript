const emailEl=document.querySelector('#email')
const passwordEl=document.querySelector('#password')
const loginEl=document.querySelector('#Login')
let usersDataArray=[]
let storedUsers=JSON.parse(localStorage.getItem('storedUsers'))
console.log(storedUsers)


//LOGIN
loginEl.addEventListener('click', function() {
  if(storedUsers){
    emailElValue=emailEl.value
    passwordElValue=passwordEl.value
    usersDataArray= storedUsers
    let checkNullity= loginChecknullity(emailElValue, passwordElValue)

    if (checkNullity === false){
      let InvalidEmail= emailCheck(usersDataArray, emailElValue )

      if (InvalidEmail === false){
        let match= matchCheck(usersDataArray, emailElValue, passwordElValue);

        if(match){
          alert('success')
        }else{
          addError(passwordEl)
          passwordEl.value=""
          passwordEl.placeholder="Incorrect Password"
          removeClass(passwordEl)
        }
      }else{
        addError(emailEl)
        emailEl.value=""
        emailEl.placeholder="Email is not registered"
        removeClass(emailEl)
      }
    }
  }else{
    addWarning(passwordEl)
    addWarning(emailEl)
    emailEl.value=""
    emailEl.placeholder="Invalid Email"
    passwordEl.value=""
    passwordEl.placeholder="Invalid Password"    
    removeClass(passwordEl)
    removeClass(emailEl)

  }
})


function loginChecknullity(email, password){
  if (email === "" || email === null) {
    addWarning(emailEl)
    emailEl.value=""
    emailEl.placeholder="Email must be entered"
    removeClass(emailEl)
  }
  if (password === "" || password === null) {
    addWarning(passwordEl)
    passwordEl.value=""
    passwordEl.placeholder="Password must be entered"
    removeClass(passwordEl)
  }
  if(email !== "" && email !== null && password !== "" && password !== null){
    return false
  }
}

function emailCheck(users, email){
  for (let i = 0; i < users.length; i++) {
    if(users[i].email === email){
      return false
    }
  }
}

function matchCheck(users, email, password){
  for (let i = 0; i < users.length; i++) {
    if(users[i].email === email && users[i].password === password)
    return true
  }
}

function addWarning(el) {
  el.classList.add('warning')  
}

function addError(el) {
  el.classList.add('error')
}

function removeClass(el) {
  el.addEventListener('click', function() {
    el.classList.remove('warning')
    el.classList.remove('error')
    el.placeholder=" "
  })
}
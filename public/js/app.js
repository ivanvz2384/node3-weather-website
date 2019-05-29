const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('#message-location')
const messageForecast = document.querySelector('#message-forecast')
const messageError = document.querySelector('#message-error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageLocation.textContent = 'Loading...'
    messageForecast.textContent = ''
    messageError.textContent = ''

    const myLocation = search.value

    const url = `/weather?address=${myLocation}`
    
    fetch(url).then((response) => {
        response.json().then((data) => {
        if (data.error) {
            messageLocation.textContent = ''
            messageForecast.textContent = ''
            messageError.textContent = data.error
        } else {
            messageLocation.textContent = data.location
            messageForecast.textContent = data.forecast
            messageError.textContent = ''
        }    
    })
})
    
    
})




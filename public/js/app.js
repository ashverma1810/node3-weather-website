
const formWeather = document.querySelector('form')
const inputSearch = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

formWeather.addEventListener ('submit', (e) => {
    e.preventDefault()

    const loc = inputSearch.value
    // console.log (loc)

    message1.textContent = 'Loading...'
    message2.textContent = ''
    
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            console.log (data)
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})


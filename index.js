import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightChecked)

getImageBtn.addEventListener('click', renderCat)

memeModalCloseBtn.addEventListener('click', closeModal)

function highlightChecked(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function renderCat () {
    const catsObject = getSingleCatObject()

    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catsObject.image}"
        alt="${catsObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

// close modal using X button
function closeModal () {
    memeModal.style.display = 'none'
}

// close modal if click outside the modal
window.addEventListener("mouseup", (e)=>{
    if (!memeModal.contains(e.target)) {
        closeModal()
    }
})


function getSingleCatObject () {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomIndex]
    }
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter(function (cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

function getEmotionCatsArray(cats) {
    const catsEmotionArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!catsEmotionArray.includes(emotion)) {
                catsEmotionArray.push(emotion)
            }
        }
    }
    return catsEmotionArray
}

function renderCatsRadio(cats) {
    let catsRadio = ``
    const emotions = getEmotionCatsArray(cats)
    for (let emotion of emotions) {
        catsRadio += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                />
            </div>
        `
    }
    emotionRadios.innerHTML = catsRadio
}

renderCatsRadio(catsData)
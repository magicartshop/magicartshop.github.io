function getPath() {
    return location.hash.slice(1)
}

const album = document.querySelector('#album ul')

function renderImageView(path = getPath()) {
    if (path) {
        const li = document.getElementById(path)
        if (li) {
            li.classList.add('active')
            album.parentNode.classList.add('view')
            return
        }
    }
    _.each(document.querySelectorAll('#album ul li'), li => li.classList.remove('active'))
    album.parentNode.classList.remove('view')
}

album.addEventListener('click', function(e) {
    if (getPath()) {
        location.hash = '#'
        e.preventDefault()
    }
})

function renderMagicArt() {
    try {
        const content = document.getElementById('content')
        const figureTemplate = document.getElementById('figure-template')
        const images = content.querySelectorAll('img')
        if (!(content && images.length > 0 && album && figureTemplate)) {
            throw new Error('не знайдено всіх елементів')
        }
        const render = _.template(figureTemplate.innerHTML)
        const items = _.map(images, function (img, i) {
            const n = i + 1
            const params = {
                id: img.dataset.id || `image-${n}`,
                image: img.outerHTML,
                caption: img.alt || `Картина №${n}`
            }
            return render(params)
        })
        album.innerHTML = items.join('')
        content.remove()
        // _.each(document.querySelectorAll('li a'), a.addEventListener('click', function() {
        //     if (getPath()) {
        //         location.hash = '#'
        //     }
        // }))
        renderImageView()
        document.body.classList.remove('cloak')
    } catch (err) {
        console.error(err)
        alert(`От халепа ${err.message}`)
    }
}

window.addEventListener('keyup', function(e) {
    if ('Escape' === e.key) {
        location.hash = '#'
    }
})

window.addEventListener('hashchange', function () {
    renderImageView()
})

renderMagicArt()

const Mask = {

    apply(input, func) {

        setTimeout(function() {
            input.value = Mask[func](input.value)
        }, 1)

    },

    formatBRL(value) {

        value = value.replace(/\D/g,"")

        return value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            }).format(value/100)

    },
    cpfCnpj(value) {
        value = value.replace(/\D/g,"")

        if (value.length > 14) {
            value = value.slice(0, -1)
        }
        
        if (value.length > 11) {

            value = value.replace(/(\d{2})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1/$2")

            value = value.replace(/(\d{4})(\d)/, "$1-$2")

        } else {

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1-$2")

        }

        return value

    },
    cep(value) {
        value = value.replace(/\D/g,"")

        if (value.length > 8) {
            value = value.slice(0, -1)
        }

        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value

    }

}

// Function related to photos upload

const PhotosUpload = {

    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {

        const { files: fileList } = event.target

        PhotosUpload.input = event.target
        
        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach( file => {
            
            PhotosUpload.files.push(file)
            
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })


        PhotosUpload.input.files = PhotosUpload.getAllFiles()

    },

    hasLimit(event) {

        // Extract uploadLimit, input and preview from PhotosUpload
        const { uploadLimit, input, preview } = PhotosUpload

        // Take all the files input(this input is storing files who the user have selected in
        // the select button on create recipes page);  
        const { files: fileList } = input

        // Select until 5 files, if you don't the recipe can't be created;
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        // Take all the children from preview(div container who's storing the files that user already 
        // selected), iterate and push all the files into photosDiv. 
        const photosDiv = []
        preview.childNodes.forEach(item => {
            if ( item.classList && item.classList.value == "photo" )
                photosDiv.push(item)
        })

        // totalPhotos can't be bigger than uploadLimit, then it'll show on the preview div.
        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()

            return true
        }

        return false

    },

    // Not identified yet
    getAllFiles() {
        
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    
    getContainer(image) {

        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)
        div.appendChild(PhotosUpload.getRemoveButton())

        return div

    },

    getRemoveButton() {

        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    removePhoto(event) {

        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove();

    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"')
            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove();
    } 
}

const ImageGallery = {
    
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),    
    setImage(e) {

        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'));
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src

    }

}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
    },
    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}

const Validate = {

    apply(input, func) {

        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if( results.error ) {
            Validate.displayError(input, results.error)
        }
    },

    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },

    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")
        if(errorDiv)
            errorDiv.remove()
    },

    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error = "Email incorreto!"

        return {
            error,
            value
        }
    },
    
    isCpfCnpj(value) {
        let error = null;

        const cleanValues = value.replace(/\D/g,"");

        if (cleanValues.length > 11 && cleanValues.length !== 14) {
            error = "CNPJ incorreto!"
        }
        else if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "CPF incorreto!"
        }

        return {
            error,
            value
        }
    },
    
    isCep(value) {
        let error = null;

        const cleanValues = value.replace(/\D/g,"");

        if (cleanValues.length !== 8) {
            error = "Cep incorreto!"
        }

        return {
            error,
            value
        }
    },
    allFields(e) {
        
        const items = document.querySelectorAll(' .item input, .item select, .item textarea');

        for ( item of items ) {
            if (item.value == "") {
                const message = document.createElement('div')
                message.classList.add('messages')
                message.classList.add('error')
                message.innerHTML = "Todos os campos devem ser preenchidos"
                message.style.position = 'fixed'
                document.querySelector('body').append(message)

                e.preventDefault();
            } 
        }

    }

}
module.exports = {

    date: function(timestamp) {

        const date = new Date(timestamp);

        // catching years
        const year = date.getFullYear();

        // catching months
        const month = `0${date.getMonth() + 1}`.slice(-2);

        // catching days
        const day = `0${date.getDate()}`.slice(-2);

        // catching hours
        const hour = date.getHours()

        // catching minutes
        let minutes = date.getMinutes()

        if( minutes < 10 ) {
            minutes = "0" + minutes;
        }

        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }

    },
    formatPrice(price) {

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            }).format(price/100)

    },
    formatCpfCnpj(value) {

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
    formatCep(value) {
       
        value = value.replace(/\D/g,"")

        if (value.length > 8) {
            value = value.slice(0, -1)
        }

        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    
    }

}

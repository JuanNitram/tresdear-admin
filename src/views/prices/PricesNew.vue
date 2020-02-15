<template>
    <div>
        <Form :component="'FormPrices'"/>
    </div>
</template>

<script>
    import Form from '../../components/forms/Form'
    export default {
        components: {
            Form,
        },
    }
</script>

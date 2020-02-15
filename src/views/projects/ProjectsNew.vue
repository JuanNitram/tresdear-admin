<template>
    <div>
        <Form :component="'FormProjects'"/>
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
